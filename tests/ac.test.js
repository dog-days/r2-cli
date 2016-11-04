'use strict';

require('chai').should(); 
var sinon = require('sinon'); 
var path = require("path");
var fs = require("fs");
var uncolor = require("uncolor");
var commander = require("commander");
var acClass = require("../bin/libs/ac");

module.exports = function(){
  return new Promise(function(resolve,reject){
    var ac,info = [];
    describe('不带-m命令参数智能创建路由和reducer', function() {
      before(function(){
        var consoleStub = sinon.stub(console,"info",function(value){
          info.push(value)
        });
        ac = new acClass();
      })

      after(function(){
        console.info.restore();
      })

      it('should equal "{ object (viewPath, layoutPath) }"', function(){
        var viewAndLayoutDirPaths = ac.getViewAndLayoutDirPaths();
        viewAndLayoutDirPaths.should.deep.equal({
          viewPath: [
            "src/page/view"
          ],
          layoutPath: "src/page/view/layout",
        });
      });

      it('should equal "Create routes success!"', function(){
        uncolor(info[0]).should.equal("Create routes success!");
      });

      it('should equal "Create reducers success!"', function(){
        uncolor(info[1]).should.equal("Create reducers success!");
      });
    });
    describe('带-m命令参数智能创建路由和reducer', function() {
      before(function(){
        process.argv = [null,null,'-m'];
        var consoleStub = sinon.stub(console,"info",function(value){
          info.push(value)
        });
        ac = new acClass();
        process.argv = [];
      })

      after(function(){
        console.info.restore();
      })

      it('should equal "{ object (viewPath, layoutPath) }"', function(){
        var viewAndLayoutDirPaths = ac.getViewAndLayoutDirPaths();
        viewAndLayoutDirPaths.should.deep.equal({
          viewPath: [
            "src/page/.viewModel"
          ],
          layoutPath: "src/page/.viewModel/layout",
        });
      });

      it('should equal "Create routes success!"', function(){
        uncolor(info[0]).should.equal("Create routes success!");
      });

      it('should equal "Create reducers success!"', function(){
        resolve();
        uncolor(info[1]).should.equal("Create reducers success!");
      });
    });
  });
}

