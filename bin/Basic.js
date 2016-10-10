#!/usr/bin/env node

'use strict';
var fs = require('fs-extra');
var path = require("path");
var colors = require('colors');

class Basic {
  constructor(){
    this.readPackageJSON();
    var flag = this.commandSetting();
    flag && this.run && this.run();
  }

  readPackageJSON(){
    var json = fs.readJsonSync(path.resolve(__dirname,"../package.json"));
    this.packageInfo = json; 
  }

  make_red(txt) {
    return colors.red(txt); 
  }

  make_green(txt) {
    return colors.green(txt); 
  }

  commandSetting(settingCallBack){
    var commander = settingCallBack();
    try {
      var packagePath = path.resolve(process.cwd(),"node_modules/r2-js");
      if(!fs.existsSync(packagePath)){
        console.error(colors.red("请在安装了r2-js的项目中使用该命令！"));
        commander.outputHelp(thiis.make_green);
        return false;
      }
    } catch(e) {
      console.log(e)
      return false;
    }
    return true;
  }
}

module.exports = Basic;
