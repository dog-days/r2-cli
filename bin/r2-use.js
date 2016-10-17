#!/usr/bin/env node --harmony
'use strict';
var fs = require('fs-extra');
var watch = require('chokidar');
var path = require("path");
var commander = require('commander');
var colors = require('colors');
var Basic = require('./Basic');
var child_process = require('child_process');

class use extends Basic {
  constructor(){
    super();
  }

  commandSetting(){
    return super.commandSetting(()=>{
      commander
        .version(this.packageInfo.version)
        .parse(process.argv);
      if(!commander.args[0]){
        console.log(colors.red("缺少<package>参数"))
        commander.outputHelp(this.make_green);
        process.exit(1);
      }
      return commander;
    }); 
  }

  run(){
    switch(commander.args[0]){
      case "sass":
          child_process.exec('npm install sass-loader --save-dev');
          process.exit();
        return;
        var one = child_process.spawn('npm',["install","sass-loader","--save"]);
        console.log("sass-loader安装中...");
        one.stdout.on('data', (data) => {
          process.stdout.write(`${data}`);
          console.log("sass-loader安装完成！");
        });
        var two = child_process.spawn('npm',["install","node-sass","--save"]);
        console.log("node-sass安装中...");
        two.stdout.on('data', (data) => {
          process.stdout.write(`${data}`);
          console.log("node-sass安装完成！");
        });
        break;
      case "immutable":
        var one = child_process.spawn('npm',["install","immutable","--save"]);
        console.log("immutable安装中...");
        one.stdout.on('data', (data) => {
          process.stdout.write(`${data}`);
        });
        break;
      case "less":
        break;
      default: 
        console.log("暂不支持此安装!");
    }
  }

}
new use();
