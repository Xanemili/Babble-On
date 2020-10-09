'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('Babble', 'createdAt', {
        defaultValue: new Date()
      })
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  ​
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
