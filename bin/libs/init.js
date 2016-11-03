#!/usr/bin/env node --harmony
'use strict';
var fs = require('fs-extra');
var path = require("path");
var commander = require('commander');
var colors = require('colors');
var Basic = require('./Basic');
class init extends Basic {
  constructor(){
    super();
  }

  /**
  * 检查当前目录是否为空 
  * @return { Boolean } true or false
  */
  checkCurrentDirIsEmtpty(){
    try {
      var files = fs.readdirSync(path.resolve(process.cwd()));
      var flag = true;
      files = files.filter(v=>{
        if(v.indexOf("temp.js") !== -1){
          flag = false;
          return false;
        }
        if(v.indexOf("mocha.opts") !== -1){
          return false;
        }
        if(v.indexOf(".istanbul.yml") !== -1){
          return false;
        }
        if(v.indexOf(".DS_Store") !== -1){
          return false;
        }
        if(v.indexOf(".swp") !== -1){
          return false;
        }
        if(v.indexOf(".swo") !== -1){
          return false;
        }
        return true;
      })
      //console.log(files)
      if((!files[0] || (files[0] == ".coverage")) && flag){
        return true;
      }else{
        return false;
      }
    }catch(e){
    }
  }

  commandSetting(){
    var flag = this.checkCurrentDirIsEmtpty();
    var command = ()=>{
      commander
        .version(this.packageInfo.version)
        .parse(process.argv);
    }
    if(flag){
      command();
      this.run();
    }else{
      process.stdin.setEncoding('utf8');
      console.info(colors.yellow('当前文件夹不为空，您确定要在此初始化R2项目吗？（y 或者 n）'));
      process.stdin.on('data', (chunk) => {
        //console.log(chunk)
        if(chunk){
          chunk = chunk.replace('\n','');
          chunk = chunk.replace('\r\n','');
        }
        if(chunk == null){
        }else if(chunk === 'n'){
          process.stdin.pause();
          console.info('您选择了不初始化！');
        }else if(chunk === 'y'){
          command();
          this.run();
          process.stdin.pause();
        }else{
          console.info('请输入 y 或者 n!');
        }
      });
    }
    //是构造器中的run方法不运行
    return false;
  }

  run(){
    fs.copySync(path.resolve(__dirname,"../../package"),path.resolve(process.cwd()));
    console.info("初始化成功！");
    var ac = require("./ac.js");
    new ac();
  }
}
module.exports = init;
