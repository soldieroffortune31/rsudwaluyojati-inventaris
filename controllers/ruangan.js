// const { where } = require("sequelize/types");
const {ruangan, detail_barang} = require("../models");

module.exports = {

    index : async (req, res) => {
        const user = req.user.dataValues;
        await ruangan.findAll({where : {deleted : false}, order : [['id_ruangan','ASC']]})
        .then(dataRuangan => {
            res.status(200).render('dataruangan', {dataRuangan, user});;
        })
    },

    inputruangan : async (req, res) => {
        const user = req.user.dataValues;
        res.status(200).render('inputruangan', {user});  
    },

    renderupdate : async (req, res) =>{
        const id = req.params.id;
        const user = req.user.dataValues;
        await ruangan.findOne({where : {id_ruangan : id}})
        .then(dataRuangan => {
            res.status(200).render('updateruangan', {dataRuangan, user});
        })
    },

    create : async (req, res) => {
        const {id_ruangan} = req.body;
        if(id_ruangan === "" || req.body.nama_ruangan === ""){
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Data Tidak Boleh Kosong');window.location.href='/ruangan/inputruangan';</script>");    
        }
        const find = await ruangan.findOne({where : {id_ruangan : id_ruangan}})
        if(find){
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('ID Ruangan Telah Digunakan');window.location.href='/ruangan/inputruangan';</script>");
        }
        ruangan.create({
            id_ruangan : id_ruangan,
            nama_ruangan : req.body.nama_ruangan,
            deleted : false
        }).then(result => {
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Data Ruangan Berhasil Disimpan');window.location.href='/ruangan';</script>");
        })
    },

    updateData : async (req, res) => {
        const id = req.params.id;
        if(req.body.nama_ruangan === ""){
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Nama Ruangan Tidak Boleh Kosong');window.location.href='/ruangan';</script>");    
        }
        const find = await ruangan.findOne({where : {id_ruangan : id}})
        // console.log(find.dataValues.id_ruangan)
        if (find){
            await ruangan.update({
                nama_ruangan : req.body.nama_ruangan,
            }, {where : {id_ruangan : id}})
            .then(result => {
              res.status(200).send("<script language='javascript' type='text/javascript'>alert('Berhasil Update Nama Ruangan');window.location.href='/ruangan';</script>");  
            })
        }
    },

    deleteByUpdate : async (req, res) => {
        const id = req.params.id;
        const find = await ruangan.findOne({where : {id_ruangan: id}});
        if(find){
            await ruangan.update({
                deleted : true
            }, {where : {id_ruangan : id}})
            .then(result => {
                res.status(200).send("<script language='javascript' type='text/javascript'>alert('Berhasil Hapus Ruangan');window.location.href='/ruangan';</script>");  
            })
        }
    },

    delete : (req, res) => {
        const id = req.params.id;

        detail_barang.count({where : {id_ruangan : id}})
        .then(jumlah => {
            if(jumlah !== 0){
              return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Tidak bisa hapus ruangan karena masih memiliki barang');window.location.href='/ruangan';</script>");  
            }
            ruangan.destroy({where : {id_ruangan : id}})
                .then(result => {
                return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Berhasil Hapus Ruangan');window.location.href='/ruangan';</script>");
            })
        })
    }
}