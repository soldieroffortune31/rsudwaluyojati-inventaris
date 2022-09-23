'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    checkPassword = password => bcrypt.compareSync(password, this.password);

    static authenticate = async({username, password}) => {
      try{
        const user = await this.findOne({where : {username}})
        if(!user) return Promise.reject('User not found')
        const isPasswordValid = user.checkPassword(password)
        if(!isPasswordValid) return Promise.reject('Wrong password')
        return Promise.resolve(user)
      }catch(error){
        return Promise.reject(error)
      }
    }
  }
  petugas.init({
    nama_petugas: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'petugas',
  });
  return petugas;
};