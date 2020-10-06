'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING(30)
    },
    firstName: {
      type: DataTypes.STRING(25)
    },
    lastName: {
      type: DataTypes.STRING(25)
    },
    email: {
      type: DataTypes.STRING(50)
    },
    biography: {
      type: DataTypes.STRING(300)
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY
    }
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Babble, {
      foreignKey: 'userID'
    })
    User.hasMany(models.Comment, {
      foreignKey: 'userID'
    })
  };
  return User;
};
