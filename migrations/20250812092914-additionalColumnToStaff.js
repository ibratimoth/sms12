'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('staffs', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'dob'
    });

    await queryInterface.addColumn('staffs', 'last_login', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'last_name'
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
