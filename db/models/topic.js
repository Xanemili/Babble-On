'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Topic.associate = function (models) {
    Topic.hasMany(models.Babble, {
      foreignKey: 'topicID'
    })
  };
  return Topic;
};
