#!/usr/bin/env node --harmony

'use strict';
var fs = require('fs-extra');
var path = require("path");
var colors = require('colors');

/**
 * r2命令基类，
 * commandSetting方法，需要覆盖或继承，并用于命令设置
 * run方法自动执行命令定义后的动作
 * @property `packageInfo` 当前项目的package.json信息json对象
 */
class Basic {
  constructor(){
    this.readPackageJSON();
    var flag = this.commandSetting();
    flag && this.run && this.run();
  }
  /**
  * 读取r2-cli项目package.json
  */
  readPackageJSON(){
    var json = fs.readJsonSync(path.resolve(__dirname,"../../package.json"));
    this.packageInfo = json; 
  }

  make_green(txt) {
    return colors.green(txt); 
  }

  /**
  * 命令设置
  * @function settingCallBack 命令设置，并返回commander对象，函数中最先执行 
  * @return {Boolean} true or false
  */
  commandSetting(settingCallBack){
    var commander = settingCallBack();
    if(!commander){
      console.log(colors.red("无commander返回"));
      return;
    }
    try {
      var packagePath = path.resolve(process.cwd(),".r2rc");
      if(!fs.existsSync(packagePath)){
        console.info(colors.red("请在r2项目根目录中使用该命令！"));
        commander.outputHelp(this.make_green);
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
