'use strict';
let view = function(){
  //这里try在浏览器中是多此一举，在智能路由中，node环境就需要,跳过异常
  var re; 
  try{
  	re = `${r2Common.prefixUrl}/about`;
  }catch(e){}
  return re;
} 
let route_config = {
  layout: "main",
  path: view(), 
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require("./index").default)
    },"about")
  },
}
if(module.hot) {
  route_config.component = require("./index").default;
}
export default route_config;
