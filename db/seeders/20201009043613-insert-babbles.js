'use strict';
const faker = require('faker');
const {
  Topic,
  User
} = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    let babbles = [];

    let image = [
      'https://cdn.pixabay.com/photo/2020/06/17/18/03/lights-5310589_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/08/23/02/29/lake-5509721_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/10/05/18/43/building-5630441_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/10/05/18/49/leaves-5630468_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/10/04/18/13/mountains-5627143_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/10/05/19/00/hot-air-balloons-5630493_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/04/23/14/45/venice-5082785_960_720.jpg',
      'https://cdn.pixabay.com/photo/2019/10/26/11/01/evening-4579176_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/13/04/13/coffee-5567269_960_720.jpg',
      'https://cdn.pixabay.com/photo/2019/09/24/17/26/metro-4501839_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/10/01/11/41/cat-5618328_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/11/06/17/17/north-america-1803504_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/03/08/09/34/dome-664000_960_720.jpg',
      'https://cdn.pixabay.com/photo/2019/08/15/17/56/production-4408573_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/06/15/14/59/dandelion-5302188_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/26/22/03/trees-5605176_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/09/11/00/11/landscape-5561678_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/08/23/15/34/woman-5511161_960_720.jpg',
      'https://cdn.pixabay.com/photo/2019/02/21/19/00/night-4011992_960_720.jpg',
      'https://cdn.pixabay.com/photo/2020/05/28/18/20/heron-5232128_960_720.jpg'
    ]

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
        url: image[i]
      })
    }

    babbles.push({
      userID: 1,
      title: "Is Slip-Bop overrated",
      subHeader: "The term slip-bop has become prevelant throughout this cohort.",
      content: "",
      readTime: 5,
      topicID: 4,
<<<<<<< HEAD
      url: 'https://cdn.pixabay.com/photo/2020/09/22/18/15/passenger-5593947_960_720.jpg',
=======
      url: imagesource,
>>>>>>> 983cb3233ea5b8f5aa903a190acba7890868f8ef
    })

    await queryInterface.bulkInsert('Babbles', babbles);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Babbles', null, {});
  }
};
