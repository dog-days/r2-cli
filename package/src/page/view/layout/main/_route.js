'use strict';
var view = function(){
  //这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过r2Common未定义异常
  var re; 
  try{
    re = `${r2Common.prefixUrl}`;
  }catch(e){}
  return re;
}
var childRoutes = function(){
  //这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过require文件不存在异常
  var re;
  try{
    re = require('./.child_routes.js').default;
  }catch(e){}  
  return re;
}
var indexRoute = function(){
  var re;
  try{
    re = require("src/page/view/index/_route.js").default;
  }catch(e){}  
  return re;
}
var component = function(){
  var re;
  try{
    re = require("./index").default;
  }catch(e){}  
  return re;
}
export default {
  path: view(), 
  component: component(),
  indexRoute: indexRoute(),
  childRoutes: childRoutes(),
}
