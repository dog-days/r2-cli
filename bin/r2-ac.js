#!/usr/bin/env node
'use strict';
var fs = require('fs-extra');
var watch = require('chokidar');
var path = require("path");
var commander = require('commander');
var colors = require('colors');
var Basic = require('./Basic');

class ac extends Basic {
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
    var flag = super.commandSetting(()=>{
      commander
        .version(this.packageInfo.version)
        .option('-w, --watch', 'watch to create route and reducers')
        .option('-m, --viewModel', 'render src/page/.viewModel')
        .parse(process.argv);
      return commander;
    }); 
    if(flag){
      var r2Path = path.resolve(process.cwd(),"web_modules/r2-js/bin/script");
      if(!fs.existsSync(r2Path)){
        r2Path = path.resolve(process.cwd(),"node_modules/r2-js/bin/script");
      }
      this.createRoute = require(path.resolve(r2Path,"createRouteFile.js"));
      this.createReducer = require(path.resolve(r2Path,"createReducerFile.js"));
      this.r2Path = r2Path;
    }
    return flag;
  }

  run(){
    this.create();
    this.watch();
  }

  watchRun(f){
    if(f.indexOf("reducer.js.") !==  -1 || f.indexOf("_route.js.") != -1){
      return;
    }
    if(f.indexOf("reducer.js") != -1){
      this.create();
    }
    if(f.indexOf("_route.js") != -1){
      this.create();
    }
    // console.log(f)
  }

  watch(){
    if(commander.watch){
      var watcher = watch.watch(path.resolve(process.cwd(),"src/page"), {
        ignored: /[\/\\]\./,
        persistent: true,
        ignoreInitial: true,
      }); 
     watcher
      .on('add', path => {
        this.watchRun(path);
      })
      .on('change', path => {
        this.watchRun(path);
      })
      .on('unlink', path => {
        this.watchRun(path);
      }); 
    }
  }

  create(){
    var viewPath,layoutPath;
    if(process.env.NODE_ENV == "production"){
      viewPath = [
        "src/page/view", 
      ];
      layoutPath = "src/page/view/layout";
    }else if(!commander.viewModel){
      viewPath = [
        "src/page/view", 
      ];
      layoutPath = "src/page/view/layout";
    }else if(commander.viewModel){
      viewPath = [
        "src/page/.viewModel", 
      ];
      layoutPath = "src/page/.viewModel/layout";
    }

    var createRoute = this.createRoute;
    new createRoute({
      path: viewPath,
      tplPath: path.resolve(this.r2Path, "route_tpl"),
      fileName:"_route.js",
      savePath:"temp/routes.js",
      layoutPath,
    });

    var createReducer = this.createReducer;
    new createReducer({
      path: viewPath,
      tplPath: path.resolve(this.r2Path, "reducer_tpl"),
      fileName:"reducer.js",
      savePath:"temp/reducers.js",
    });
  }
}
new ac();







