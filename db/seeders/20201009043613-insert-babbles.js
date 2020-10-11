'use strict';
const faker = require('faker');
const {
  Topic,
  User
} = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    let babbles = [];

    let users = await User.findAll();
    let topics = await Topic.findAll();

    for (let i = 0; i < 20; i++) {
      let rand = Math.floor(Math.random() * 4)
      babbles.push({
        userID: users[rand].dataValues.id,
        title: faker.lorem.sentence(),
        subHeader: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        readTime: Math.floor(Math.random() * 10),
        topicID: topics[rand].dataValues.id,
        url: faker.image.imageUrl()
      })
    }

    babbles.push({
      userID: 1,
      title: "Is Slip-Bop overrated",
      subHeader: "The term slip-bop has become prevelant throughout this cohort.",
      content: "",
      readTime: 5,
      topicID: 4,
      url: imagesource,
    })

    await queryInterface.bulkInsert('Babbles', babbles);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Babbles', null, {});
  }
};
