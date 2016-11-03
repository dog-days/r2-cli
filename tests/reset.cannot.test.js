
'use strict';

require('chai').should(); 
var sinon = require('sinon'); 
var path = require("path");
var fs = require("fs");
var resetClass = require("../bin/libs/reset");
var commander = require('commander');
var uncolor = require("uncolor");

module.exports = function(){
  return new Promise(function(resolve,reject){
    describe('非r2项目根目录重置', function() {
      var reset,
        info = [];
      before(function(){
        sinon.stub(commander,"outputHelp");
        var consoleStub = sinon.stub(console,"info",function(value){
          info.push(value)
        });
        reset = new resetClass();
        commander.outputHelp.restore();
      })

      after(function(){
        console.info.restore();
      })

      it('should equal "请在r2项目根目录中使用该命令！"', function(){
        uncolor(info[0]).should.equal("请在r2项目根目录中使用该命令！"); 
      });
    });
  });
}

