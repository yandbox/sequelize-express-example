"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
// 不同环境不同的配置
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
// new Sequelize(database, [username=null], [password=null], [options={}])
// http://docs.sequelizejs.com/en/latest/api/sequelize/
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

// sequelize.import() 导入目录下的 model 文件
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    // 忽略隐藏文件与 index.js
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

// 调用各 model 的 associate 方法
Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
