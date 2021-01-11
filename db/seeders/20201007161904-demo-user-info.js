'use strict';
const bcrypt = require('bcryptjs');


module.exports = {
  async up (queryInterface, Sequelize){
    try{
    const hashedPass= await bcrypt.hash('password', 10);
    await queryInterface.bulkInsert('Users', [{
      userName: 'Demo',
      firstName: 'John',
      lastName: 'Smith',
      email: 'demo.user@email.com',
      hashedPassword: hashedPass,
      profilePicture:  "https://randomuser.me/api/portraits/med/men/15.jpg",
    }], {});
  } catch (e){
    throw e;
  }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
