#!/usr/bin/env node --harmony
'use strict';
var fs = require('fs-extra');
var path = require("path");
var commander = require('commander');
var colors = require('colors');
var Basic = require('./Basic');

class reset extends Basic {
  constructor(){
    super();
  }

  commandSetting(){
    return super.commandSetting(()=>{
      commander
        .version(this.packageInfo.version)
        .parse(process.argv);
      return commander;
    }); 
  }

  run(){
    var rmFiles = [
      "package.json",
      "temp",
      "html_template",
      "src",
      "style",
      "Gruntfile.js",
      "server.js",
      "http-server.js",
      ".gitignore",
      "webpack.config.js",
      ".babelrc",
      ".r2rc",
    ];
    rmFiles.forEach(v=>{
      fs.removeSync(path.resolve(process.cwd(),v));
    })
    console.log("重置成功！");
  }
}
new reset();
