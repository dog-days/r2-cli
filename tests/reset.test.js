'use strict';

require('chai').should(); 
var path = require("path");
var fs = require("fs");
var resetClass = require("../bin/libs/reset");

module.exports = function(){
  var reset = new resetClass();
  return new Promise(function(resolve,reject){
    describe('r2项目根目录重置', function() {
      var rmFiles = [
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
      it('rmFiles should to be equal', function(){
        reset.rmFiles().should.to.deep.equal(rmFiles); 
      });
      it('r2 project should not have file of rmFiles', function(){
        var flag = false;
        rmFiles.forEach(v=>{
          if(!flag){
            flag = fs.existsSync(path.resolve(process.cwd(),v))
          }
        })
        resolve();
        flag.should.to.be.false; 
      });
    });
  });
}
