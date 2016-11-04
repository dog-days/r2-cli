'use strict';
require('chai').should(); 
var sinon = require('sinon'); 
var path = require("path");
var fs = require("fs-extra");
var uncolor = require("uncolor");
var initClass = require("../bin/libs/init");

try{
  fs.ensureFileSync(path.resolve("temp.js"));
}catch(e){
  console.log(e);
}

module.exports = function(){
  return new Promise(function(resolve,reject){
    var init,
      info = [],
      shouldInit = false;
    describe('当前文件夹不为空初始化', function() {

      before(function(){
        var consoleStub = sinon.stub(console,"info",function(value){
          info.push(value)
        });
        //模拟stub输入"ddy"
        var stdinOnStub = sinon.stub(process.stdin,"on");
        stdinOnStub.callsArgWith(1, "ddy");
        init = new initClass();
        process.stdin.on.restore();
        //模拟stub输入"n"
        var stdinOnStub = sinon.stub(process.stdin,"on");
        stdinOnStub.callsArgWith(1, "n");
        init = new initClass();
        process.stdin.on.restore();
        //模拟stub输入"y"
        var stdinOnStub = sinon.stub(process.stdin,"on");
        stdinOnStub.callsArgWith(1, "y");
        init = new initClass();
        process.stdin.on.restore();
      })

      after(function(){
        console.info.restore();
      })

      it('current dir should not be empty', function(){
        var flag = init.checkCurrentDirIsEmtpty();
        try{
          fs.removeSync(path.resolve("temp.js"));
        }catch(e){
          console.log(e);
        }
        flag.should.to.be.false; 
        shouldInit = true;
      })

      it('should equal "当前文件夹不为空，您确定要在此初始化R2项目吗？（y 或者 n）"', function(){
        uncolor(info[0]).should.equal("当前文件夹不为空，您确定要在此初始化R2项目吗？（y 或者 n）");
      });

      it('should equal "请输入 y 或者 n!"', function(){
        uncolor(info[1]).should.equal("请输入 y 或者 n!");
      });

      it('should equal "当前文件夹不为空，您确定要在此初始化R2项目吗？（y 或者 n）"', function(){
        uncolor(info[2]).should.equal("当前文件夹不为空，您确定要在此初始化R2项目吗？（y 或者 n）");
      });

      it('should equal "您选择了不初始化！"', function(){
        uncolor(info[3]).should.equal("您选择了不初始化！");
      });

      it('should equal "当前文件夹不为空，您确定要在此初始化R2项目吗？（y 或者 n）"', function(){
        uncolor(info[4]).should.equal("当前文件夹不为空，您确定要在此初始化R2项目吗？（y 或者 n）");
      });

      it('should equal "初始化成功！"', function(){
        resolve();
        uncolor(info[5]).should.equal("初始化成功！");
      });

    });
  })
}

