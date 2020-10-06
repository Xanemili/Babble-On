'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userID: DataTypes.INTEGER,
    postID: DataTypes.INTEGER,
    comment: DataTypes.TEXT(140)
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userID'
    })
    Comment.belongsTo(models.Babble, {
      foreignKey: 'postID'
    })
  };
  return Comment;
};
