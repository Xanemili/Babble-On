'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    userID: DataTypes.INTEGER,
    babbleID: DataTypes.INTEGER,
    reaction: DataTypes.STRING
  }, {});
  Reaction.associate = function(models) {
    Reaction.belongsTo(models.User, {
      foreignKey: 'UserID'
    });

    Reaction.belongsTo(models.Babble, {
      foreignKey: 'BabbleID'
    });
    }
  return Reaction;
};
