'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_barangs', {
      id_detailbarang: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      id_barang: {
        type: Sequelize.STRING
      },
      no_inventaris: {
        type: Sequelize.STRING
      },
      id_ruangan: {
        type: Sequelize.STRING
      },
      kondisi: {
        type: Sequelize.STRING
      },
      mutasi: {
        type: Sequelize.STRING
      },
      createdby: {
        type: Sequelize.STRING
      },
      updatedby: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_barangs');
  }
};