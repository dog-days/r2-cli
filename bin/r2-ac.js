#!/usr/bin/env node

'use strict';

var commander = require('commander');
var colors = require('colors');
var path = require("path");
var fs = require("fs");

function make_red(txt) {
  return colors.red(txt); 
}

try {
  var packagePath = path.resolve(process.cwd(),".r2rc");
  var r2Path = path.resolve(process.cwd(),"web_modules/r2-js/bin/script");
  if(!fs.existsSync(packagePath)){
    console.error(colors.red("请在.r2rc同级目录下使用！"));
    commander.outputHelp(make_red);
    return;
  }else{
    var createRoute = require(path.resolve(r2Path,"createRouteFile.js"));
    var createReducer = require(path.resolve(r2Path,"createReducerFile.js"));
  }
} catch(e) {
  console.log(e)
  return;
}

commander
  .version('0.0.1')
  .option('-m, --viewModel', 'render src/page/.viewModel')
  .parse(process.argv);
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

new createRoute({
  path: viewPath,
  tplPath: r2Path + "/route_tpl",
  fileName:"_route.js",
  savePath:".temp/routes.js",
  layoutPath,
});

new createReducer({
  path: viewPath,
  tplPath: r2Path + "/reducer_tpl",
  fileName:"reducer.js",
  savePath:".temp/reducers.js",
});

