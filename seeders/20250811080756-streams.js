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
    const Streams = [
      'form one A',
      'form two A'
    ];

    const StreamData = Streams.map(name => ({
      name,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('streams', StreamData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('streams', null, {});
  }
};
