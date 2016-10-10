#!/usr/bin/env node
'use strict';
var fs = require('fs-extra');
var path = require("path");
var commander = require('commander');
var colors = require('colors');
var Basic = require('./Basic');

class cv extends Basic {
  constructor(){
    super();
  }

  commandSetting(settingCallBack){
    var babelrcPath = path.resolve(process.cwd(),".babelrc");
    if(!fs.existsSync(babelrcPath)){
      console.error(colors.red("请先使用`r2 init`初始化!"));
      commander.outputHelp(this.make_green);
      return;
    } 
    this.r2Path = path.resolve(process.cwd(),"web_modules/r2-js/bin"); 
    return super.commandSetting(()=>{
      commander
        .version('0.0.1')
        .option('-l, --layout <layout-name>', '指定使用layout')
        .option('-e, --emptyPage <view-name>', '创建emptyPage视图模板')
        .option('-n, --noactionreducer <view-name>', '创建noactionreducer视图模板')
        .option('-t, --tableNoPagination <view-name>', '创建tableNoPagination视图模板')
        .option('-p, --tableWithPagination <view-name>', '创建tableWithPagination视图模板')
        .parse(process.argv);
      return commander;
    }); 
  }

  run(){
    var src,dest,replaceStr = "",type,layout = "main",saveView = "view";
    if(commander.emptyPage){
      src = path.resolve("src/page/.viewModel/emptyPage")
      dest = path.resolve("src/page",saveView,commander.emptyPage)
      replaceStr = commander.emptyPage;
      type = "emptyPage";
      if(commander.layout){
        layout = commander.layout;
      }
    }
    if(commander.noactionreducer){
      src = path.resolve("src/page/.viewModel/noactionreducer")
      dest = path.resolve("src/page",saveView,commander.noactionreducer)
      replaceStr = commander.noactionreducer;
      type = "noactionreducer";
      if(commander.layout){
        layout = commander.layout;
      }
    }
    if(commander.tableNoPagination){
      src = path.resolve("src/page/.viewModel/tableNoPagination")
      dest = path.resolve("src/page",saveView,commander.tableNoPagination)
      replaceStr = commander.tableNoPagination;
      type = "tableNoPagination";
      if(commander.layout){
        layout = commander.layout;
      }
    }
    if(commander.tableWithPagination){
      src = path.resolve("src/page/.viewModel/tableWithPagination")
      dest = path.resolve("src/page",saveView,commander.tableWithPagination)
      replaceStr = commander.tableWithPagination;
      type = "tableWithPagination";
      if(commander.layout){
        layout = commander.layout;
      }
    }
    var CpDirAndReplaceStrAllFile = require(path.resolve(this.r2Path,"libs/script/CpDirAndReplaceStrAllFile"));
    if(!src || !dest || !replaceStr || !type){
      console.error("error: argument missing,please check for the command!")
      return;
    }
    new CpDirAndReplaceStrAllFile({
      src, 
      dest, 
      replaceStr,
      type,
      layout,
    }) 
    console.log("创建成功！");
    require("./r2-ac.js");
  }
}
new cv();
