'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Topics', [{
        name: 'Sports',
        description: 'Related to all aspects of sports'
      },
      {
        name: 'Cooking',
        description: 'Foodies unite under the banner of eating.'
      },
      {
        name: 'Politics',
        description: 'My side is better than your side.'
      },
      {
        name: 'Technology',
        description: 'Robots will take over the world!'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Topics', null, {})
  }
};
