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
    return await queryInterface.bulkInsert(
      "Users",
      [{
        username: "test@mail.com",
        password: "123",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "test1@mail.com",
        password: "321",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "dest@mail.com",
        password: "555",
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
