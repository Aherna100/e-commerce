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
    return queryInterface.bulkInsert('Products', [{
      title: 'Apple AirPods',
      description: "https://www.apple.com/airpods",
      price: 199,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apple iPhone Pro',
      description: "https://www.apple.com/iphone-11-pro",
      price: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apple Watch',
      description: "https://www.apple.com/watch",
      price: 499,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apple MacBook',
      description: "https://www.apple.com/macbook",
      price: 999,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apple Magic Mouse',
      description: "https://www.apple.com/magic",
      price: 300,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apple Ipad',
      description: "https://www.apple.com/ipad",
      price: 1200,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
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
