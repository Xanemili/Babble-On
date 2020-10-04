'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Babbles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      subHeader: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      readTime: {
        allowNull: false,
        type: Sequelize.NUMERIC
      },
      url: {
        type: Sequelize.STRING
      },
      topicID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Topics'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Babbles');
  }
};
