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
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followers', null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
