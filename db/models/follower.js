'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    userID: DataTypes.INTEGER,
    followerUserID: DataTypes.INTEGER
  }, {});
  Follower.associate = function(models) {
    Follower.belongsTo(models.User, {
      foreignKey: "userID"
    })
  };
  return Follower;
};
