'use strict';
const faker = require('faker')
const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    let people = [];

    for (let i = 0; i < 20; i++) {
      const hashedPassword = await bcrypt.hash('password', 10)
      people.push({
        userName: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        biography: faker.company.catchPhrase(),
        hashedPassword: hashedPassword,
        profilePicture: faker.internet.avatar()

      })
    }

    await queryInterface.bulkInsert('Users', people);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
