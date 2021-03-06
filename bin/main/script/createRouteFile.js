'use strict';

var fs = require("fs")
var path = require("path")
var colors = require('colors');
var ReadDirTpl = require("../libs/script/ReadDirTpl")
var FindSpecificFileByDir = require("../libs/script/FindSpecificFileByDir")
var getRoutes = require("../libs/script/getRoutes")
var r2Common = "";
class Script {
  constructor(config){
    this.config = config;
    this.run();
  }  

  run(){
    try{
      this.setTpls();
    var findSpecificFileByDir = new FindSpecificFileByDir(this.config)
    this.filesPath = findSpecificFileByDir.filesPath;
    this.getRoutesName();
    if(!this.error){
      this.writeRouteFile();
      // console.log(this.routes)
    }
    // console.log(this.filesPath)
    }catch(e){
      console.log(e);
    }
  }

  setTpls(){
    var tplObj = new ReadDirTpl({
      path : this.config.tplPath,
    });
    var tplInfo = tplObj.getDirFilesInfo();
    this.tpls = tplInfo;
    // console.log(this.tpls)
  }

  /**
   * getRoutesName 获取所有的reducers名 
   */
  getRoutesName(){
    var routesObj = new getRoutes(this.filesPath,this.config.path)
    this.routes = routesObj.routes;
    this.error = routesObj.error;
  }

  writeRouteFile(){
    var _this = this,
      name = "routes" ;
    var tpl = this.tpls[name],  
      content = tpl.contents;  
    var im = "",
      index = "";
    //指定layout是否是第一次
    var state = {};
    //处理一级route，判别方式为每个_route.js中是否有layout变量。
    this.routes.forEach(v=>{
      var routes_file_contents = fs.readFileSync(v.absolutePath,{
        encoding : 'utf-8'
      })
      var routes_match = routes_file_contents.match(/layout.*\:.*("|')(.*)("|')/i);
      var layout;
      if(routes_match && routes_match[2]){
        layout = routes_match[2];
      }
      if(!layout){
        if(v.name != "index"){
          im += tpl.tagsInfo.tagContents['require']
              .replace(/\$\{path\}/g,v.path)
        }else{
          index += tpl.tagsInfo.tagContents['index']
              .replace(/\$\{path\}/g,v.path)
        }
      }else{
        var layout_path = path.resolve(this.config.layoutPath,layout) 
        if(!fs.existsSync(layout_path)){
          console.error(colors.red(`layout：${ layout }，${ layout_path }不存在`));
          this.error = true;
          return;
        }
        var child_routesPath = path.resolve(layout_path,'.child_routes.js');
        //.child_routes.js文件不存在，创建新的
        if(!fs.existsSync(child_routesPath)){
          fs.writeFileSync(child_routesPath,"export default [\n\r  //routes//\n\r]")
        }
        if(fs.existsSync(child_routesPath)){
          if(!state[layout]){
            //首次初始化，文件内容
            fs.writeFileSync(child_routesPath,"export default [\n\r  //routes//\n\r]")
            state[layout] = true;
          }
          var child_routes = fs.readFileSync(child_routesPath,{
            encoding : 'utf-8'
          })
          child_routes = child_routes.replace(/\/\/routes\/\//g,'require("'+v.path+'").default, \n\r  //routes//')
          fs.writeFileSync(child_routesPath,child_routes)
        }else{
          console.error(v.absolutePath + "：不存在layout---"+layout)
        }
        
      }
    })
    if(this.error){
      return;
    }
    content = content.replace(tpl.tagsInfo.tagRegex['require'],im)
    content = content.replace(tpl.tagsInfo.tagRegex['index'],index)
    // console.log(content)
    fs.writeFileSync(path.resolve(this.config.savePath),content)
    console.info("Create routes success!")
  }

}

module.exports = Script;




