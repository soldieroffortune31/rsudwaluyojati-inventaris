'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  barang.init({
    id_barang: DataTypes.STRING,
    id_instansi: DataTypes.STRING,
    kode_barang: DataTypes.STRING,
    nama_barang: DataTypes.STRING,
    merk: DataTypes.STRING,
    tipe: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    tahun: DataTypes.INTEGER,
    sumber_dana: DataTypes.INTEGER,
    keterangan: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    tanggal : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'barang',
  });
  barang.removeAttribute('id');
  return barang;
};