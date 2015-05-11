"use strict";

module.exports = function(sequelize, DataTypes) {
  // .define(modelName, attributes, [options]) -> Model
  // http://docs.sequelizejs.com/en/latest/api/sequelize/#definemodelname-attributes-options-model
  // 自动创建 id 字段
  // options.timestamps=true 默认添加 createdAt and updatedAt
  // options.timezone='+00:00' 默认为 UTC 时间
  // CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
  var User = sequelize.define("User", {
    // 每个属性对应一个 table columnus
    // http://docs.sequelizejs.com/en/latest/docs/models-definition/#data-types
    username: DataTypes.STRING
  }, {
    // http://docs.sequelizejs.com/en/latest/docs/models-definition/#expansion-of-models
    classMethods: {
      associate: function(models) {
        // http://docs.sequelizejs.com/en/latest/docs/associations/
        User.hasMany(models.Task)
      }
    }
  });

  return User;
};
