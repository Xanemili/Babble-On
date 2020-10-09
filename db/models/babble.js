'use strict';
module.exports = (sequelize, DataTypes) => {
  const Babble = sequelize.define('Babble', {
    userID: DataTypes.INTEGER,
    title: DataTypes.STRING,
    subHeader: DataTypes.STRING,
    content: DataTypes.TEXT,
    readTime: DataTypes.NUMERIC,
    url: DataTypes.STRING,
    topicID: DataTypes.INTEGER
  }, {});
  Babble.associate = function (models) {
    Babble.belongsTo(models.User, {
      foreignKey: 'userID'
    })

    Babble.belongsTo(models.Topic, {
      foreignKey: 'topicID'
    })
    Babble.hasMany(models.Comment, {
      foreignKey: 'postID',
        onDelete: 'CASCADE'
    })
  };
  return Babble;
};
