'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    userID: DataTypes.INTEGER,
    babbleID: DataTypes.INTEGER,
    reaction: DataTypes.STRING
  }, {});
  Reaction.associate = function(models) {
    Reaction.belongsTo(models.User, {
      foreignKey: 'userID'
    });

    Reaction.belongsTo(models.Babble, {
      foreignKey: 'babbleID'
    });
    }
  return Reaction;
};
