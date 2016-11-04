'use strict';
require('chai').should(); 
var sinon = require('sinon'); 
var path = require("path");
var fs = require("fs");
var uncolor = require("uncolor");
var initClass = require("../bin/libs/init");

module.exports = function(){
  return new Promise(function(resolve,reject){
    describe('初始化 &&& 智能生成路由和reducer', function() {
      var shouldHaveFiles = [
        "package.json",
        "temp",
        "libs",
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
        ".npmignore",
      ];
      var info = [];
      before(function(){
        var consoleStub = sinon.stub(console,"info",function(value){
          info.push(value)
        });
        var init = new initClass();
      })
      after(function(){
        console.info.restore();
      })
      it('r2 project should have all files of shouldHaveFiles', function(){
        var flag = true;
        shouldHaveFiles.forEach(v=>{
          if(flag){
            flag = fs.existsSync(path.resolve(process.cwd(),v))
          }
        })
        flag.should.to.be.true; 
      });
      it('temp dir should have reducers.js and routes.js files', function(){
          var flag = fs.existsSync(path.resolve(process.cwd(),"temp/reducers.js"));
          if(flag) {
            flag = fs.existsSync(path.resolve(process.cwd(),"temp/routes.js"));
          }
          flag.should.to.be.true; 
      })

      it('should equal "初始化成功！"', function(){
        uncolor(info[0]).should.equal("初始化成功！");
      });

      it('should equal "Create routes success!"', function(){
        uncolor(info[1]).should.equal("Create routes success!");
      });

      it('should equal "Create reducers success!"', function(){
        resolve();
        uncolor(info[2]).should.equal("Create reducers success!");
      });
    });
  })
}

