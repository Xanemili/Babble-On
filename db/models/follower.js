'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    userID: DataTypes.INTEGER,
    followerUserID: DataTypes.INTEGER
  }, {});
  Follower.associate = function(models) {
    // associations can be defined here
  };
  return Follower;
};