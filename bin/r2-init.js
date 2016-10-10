#!/usr/bin/env node
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

  commandSetting(settingCallBack){
    return super.commandSetting(()=>{
      commander
        .version(this.packageInfo.version)
        .parse(process.argv);
      return commander;
    }); 
  }

  run(){
    fs.copySync(path.resolve(__dirname,"../package"),path.resolve(process.cwd()));
    console.log("初始化成功！");
    require("./r2-ac.js");
  }
}
new init();
