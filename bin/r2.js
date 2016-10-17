#!/usr/bin/env node --harmony
'use strict';
var fs = require('fs-extra');
var path = require("path");
var commander = require('commander');
var colors = require('colors');
var Basic = require('./Basic');

class r2 extends Basic {
  constructor(){
    super();
  }

  commandSetting(){
      commander
        .version(this.packageInfo.version)
        .command('init', 'r2项目初始')
        .command('ac', '智能路由和reducer生成')
        .command('cv', '页面模块创建')
        .command('reset',colors.red('重置项目，这个会返回最初状态，慎用（记得备份文件）！'))
        .parse(process.argv);
      return true;
  }
}
new r2();
