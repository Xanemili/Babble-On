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
      },
      {
        name: 'Business',
        description: 'Business advice from the best!'
      },
      {
        name: 'Finances',
        description: 'How others are raising their accounts.'
      },
      {
        name: 'Health',
        description: 'Health tips from self proclaimed professionals.'
      },
      {
        name: 'Fashion',
        description: 'Trends and tips from the fashion world.'
      },
      {
        name: 'Science',
        description: 'Really? ANOTHER planet?.'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Topics', null, {})
  }
};
