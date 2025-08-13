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
    const Subjetcs = [
      'Mathematics',
      'Biology'
    ];

    const subjectData = Subjetcs.map(name => ({
      name,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('subjects', subjectData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
