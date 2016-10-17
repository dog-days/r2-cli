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
      if(!files[0] || (files[0] == ".DS_Store" && files.length == 1)){
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
    }else{
      process.stdin.setEncoding('utf8');
      process.stdin.on('readable', () => {
        var chunk = process.stdin.read();
        if(chunk){
          chunk = chunk.replace('\n','');
          chunk = chunk.replace('\r\n','');
        }
        if(chunk == null){
          process.stdout.write('当前文件夹不为空，您确定要在此初始化R2项目吗？（y 或者 n）\r\n');
        }else if(chunk === 'n'){
          process.exit();
        }else if(chunk === 'y'){
          command();
          this.run();
          process.stdin.pause();
        }else{
          process.stdout.write('请输入 y 或者 n!\r\n');
        }
      });
    }
    //是构造器中的run方法不运行
    return false;
  }

  run(){
    fs.copySync(path.resolve(__dirname,"../package"),path.resolve(process.cwd()));
    console.log("初始化成功！");
    require("./r2-ac.js");
  }
}
new init();
