'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const Genders = [
      'Male',
      'Female'
    ];

    const GenderData = Genders.map(name => ({
      name,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('genders', GenderData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('genders', null, {});
  }
};
