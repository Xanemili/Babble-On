'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Followers', [
      // {
      //   userID: 1,
      //   followerUserID: 2
      // },
      // {
      //   userID: 2,
      //   followerUserID: 3
      // },
      // {
      //   userID: 3,
      //   followerUserID: 1
      // },
  ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Babbles', 'url', {
      type: Sequelize.STRING
    })
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
