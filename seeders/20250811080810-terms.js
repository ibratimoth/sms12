'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
       const Terms = [
      'first Term',
      'Second Term'
    ];

    const TermData = Terms.map(name => ({
      name,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('terms', TermData);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('terms', null, {});
  }
};
