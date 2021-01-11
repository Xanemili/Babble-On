'use strict';
const faker = require('faker')
const bcrypt = require('bcryptjs')

const avatars = [
  "https://randomuser.me/api/portraits/med/men/75.jpg",
  "https://randomuser.me/api/portraits/med/women/75.jpg",
  "https://randomuser.me/api/portraits/med/men/1.jpg",
  "https://randomuser.me/api/portraits/med/women/1.jpg",
  "https://randomuser.me/api/portraits/med/men/3.jpg",
  "https://randomuser.me/api/portraits/med/women/3.jpg",
  "https://randomuser.me/api/portraits/med/men/4.jpg",
  "https://randomuser.me/api/portraits/med/women/5.jpg",
  "https://randomuser.me/api/portraits/med/men/6.jpg",
  "https://randomuser.me/api/portraits/med/women/6.jpg",
  "https://randomuser.me/api/portraits/med/men/7.jpg",
  "https://randomuser.me/api/portraits/med/women/7.jpg",
  "https://randomuser.me/api/portraits/med/men/8.jpg",
  "https://randomuser.me/api/portraits/med/women/8.jpg",
  "https://randomuser.me/api/portraits/med/men/9.jpg",
  "https://randomuser.me/api/portraits/med/women/9.jpg",
  "https://randomuser.me/api/portraits/med/men/10.jpg",
  "https://randomuser.me/api/portraits/med/women/10.jpg",
  "https://randomuser.me/api/portraits/med/men/11.jpg",
  "https://randomuser.me/api/portraits/med/women/11.jpg",
  "https://randomuser.me/api/portraits/med/women/7.jpg",
  ]


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
        profilePicture: avatars[i]

      })
    }

    await queryInterface.bulkInsert('Users', people);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
