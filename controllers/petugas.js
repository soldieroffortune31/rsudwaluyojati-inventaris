const {petugas} = require("../models/");
const bcrypt = require('bcrypt');

module.exports = {

    createpetugas : async (req, res) => {
        const data = await petugas.findOne({where : {username : req.body.username}});
        if(data){
            return res.status(400).json({message : 'username sudah ada'})
        }
        if(req.body.password !== req.body.repeat_password) return res.status(400).json({message : 'password tidak sama'})

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            
            petugas.create({
                nama_petugas : req.body.nama_petugas,
                username : req.body.username,
                password : hash,
                level : req.body.level
            }).then(result => {
                // res.status(200).json({code : 200, message : "Data Berhasil Disimpan"});
                res.status(200).json({messsage : "Data Berhasil Disimpan", data : result})
            })
        })
    },

    inputPetugas : async (req,res) => {
        const user = req.user.dataValues;
        res.status(200).render('inputdatapetugas', {user});
    },

    renderpetugas : async (req, res) => {
        const id = Number(req.params.id);
        const user = req.user.dataValues;
        await petugas.findOne({where : {id : id}})
        .then(dataPetugas => {
            res.status(200).render('updatedatapetugas', {dataPetugas, user});
        })
      
    },
    
    renderpassword : async (req, res) => {
        const id = req.user.dataValues.id;
        const user = req.user.dataValues;
        console.log(id);
        await petugas.findOne({where : {id : id}})
        .then(dataPetugas => {
            res.status(200).render('updatepassword', {dataPetugas, user});
        })
    },

    updatepetugas : async (req, res) => {
        const id = Number(req.params.id);
        const found = await petugas.findOne({where : {id : id}})
        if(found){
            await petugas.update({
                nama_petugas : req.body.nama_petugas,
                level : req.body.level
            }, {where : {id : id}})
            .then(result => {
                res.status(200).redirect('/petugas')
            })
        }
    },

    index : async (req, res) => {
        const user = req.user.dataValues;
        await petugas.findAll({order : [['id', 'ASC']]})
        .then(dataPetugas => {
            res.status(200).render('datapetugas', {dataPetugas, user});
        })
        
    },

    create : async (req, res) => {
        const data = await petugas.findOne({where : {username : req.body.username}});
        if(data){
            return res.status(400).json({message : 'username sudah ada'})
        }
        if(req.body.password !== req.body.repeat_password) return res.status(400).json({message : 'password tidak sama'})

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            
            petugas.create({
                nama_petugas : req.body.nama_petugas,
                username : req.body.username,
                password : hash,
                level : req.body.level
            }).then(result => {
                // res.status(200).json({code : 200, message : "Data Berhasil Disimpan"});
                res.redirect('/petugas')
            })
        })
    },

    updatepassword : async (req, res) => {
        const id = Number(req.user.dataValues.id);
        console.log("ini id nya", id)
        const data = await petugas.findOne({where : {id : id}});
        if(data){
            if(req.body.password !== req.body.repeat_password) return res.status(400).json({message : 'password tidak sama'})
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                petugas.update({
                    password : hash,
                }, {where : {id : id}})
                .then(result => {
                    res.status(200).redirect('/home')
                })
            })
        }
    },

    deletepetugas : async (req, res) => {
        const id = Number(req.params.id);
        if(id === Number(req.user.dataValues.id)){
            return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Gagal Hapus');window.location.href='/petugas';</script>");        
        }
        const found = await petugas.findOne({where : {id : id}})
        if(found){
            petugas.destroy({where : {id : id}})
            .then(result => {
                return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Data Petugas Berhasil Dihapus');window.location.href='/petugas';</script>");
            })
        }
    }


}