'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    userID: DataTypes.INTEGER,
    babbleID: DataTypes.INTEGER,
    reaction: DataTypes.STRING
  }, {});
  Reaction.associate = function(models) {
    // associations can be defined here
  };
  return Reaction;
};