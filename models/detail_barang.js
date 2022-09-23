'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      detail_barang.belongsTo(models.barang, {foreignKey : 'id_barang', targetKey : 'id_barang'})
      detail_barang.belongsTo(models.ruangan, {foreignKey : 'id_ruangan', targetKey : 'id_ruangan'})
      detail_barang.belongsTo(models.ruangan, {foreignKey : 'mutasi', targetKey : 'id_ruangan', as:'asal'})
    }
  }
  detail_barang.init({
    id_detailbarang: DataTypes.STRING,
    id_barang: DataTypes.STRING,
    no_inventaris: DataTypes.STRING,
    id_ruangan: DataTypes.STRING,
    kondisi: DataTypes.STRING,
    mutasi: DataTypes.STRING,
    createdby: DataTypes.STRING,
    updatedby: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'detail_barang',
  });
  detail_barang.removeAttribute('id');
  return detail_barang;
};