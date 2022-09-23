const { STRING } = require("sequelize");
const {detail_barang, barang, ruangan} = require("../models");
// const barang = require('../models/barang');

module.exports = {
    
    renderdistribusi : (req, res) => {
        // detail_barang.findAll()
        // .then(getDetail => {
        //     barang.findAll()
        //     .then(getBarang => {
        //         console.log(getDetail, getBarang)
        //         res.status(200).render('tabeldistribusi')
        //     })
        // })
        ruangan.findAll()
        .then(getRuangan => {
            // console.log({getRuangan});
            res.status(200).send('berhasil');
        })
    },

    renderinput : async (req, res) => {
        const id = req.params.id;
        const user = req.user.dataValues;
        await barang.findAll({where : {id_barang : id}})
        .then(dataBarang => {
            ruangan.findAll({where : {deleted : false}, order : [['nama_ruangan','ASC']]})
            .then(dataRuangan => {
                // console.log(dataBarang, dataRuangan)
                res.status(200).render('inputdistribusi2', {dataBarang, dataRuangan, user});
            })    
        })
        
    },

    renderpilihbarang : async (req, res) => {
        const user = req.user.dataValues;
        await barang.findAll({where : {deleted : false}})
        .then(getBarang => {
            detail_barang.findAll({where : {deleted : false}})
            .then(getDetail => {
                res.status(200).render('pilihbarang', {getBarang, getDetail, user});    
            })
        });
    },

    create : (req, res) => {
        const {id_barang, jumlah, baik, kurang_baik, rusak_berat, id_ruangan} = req.body;
        let total = Number(baik) + Number(kurang_baik) + Number(rusak_berat)

        detail_barang.count({where : {id_barang : id_barang}})
        .then(jumlahBarang => {
            barang.findOne({where : {id_barang : id_barang}})
            .then(dataBarang => {
                let hitung = Number(jumlah) + jumlahBarang
                if(hitung > dataBarang.jumlah){
                    return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Jumlah Barang Tidak Cukup');history.back();</script>");
                }else if(Number(jumlah) === 0){
                    return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Masukkan Jumlah Barang Yang Akan Didistribusi');history.back();</script>");
                }else if(total !== Number(jumlah)){
                    return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Jumlah Barang dan Jumlah Kondisi Tidak Sama');history.back();</script>");
                }else if(id_ruangan === "Pilih Ruangan"){
                    return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Belum Pilih Ruangan');history.back();</script>");
                }
        
                var current = new Date();
                var no = 1000;
                let generateCode = [];  
                for(let k=1; k<=Number(baik); k++){
                        no = no + 1;    
                        let obj = {
                            id_detailbarang : current.getTime()+no.toString(),
                            id_barang : id_barang,
                            id_ruangan : id_ruangan,
                            kondisi : "Baik",
                            createdby : req.user.nama_petugas,
                            deleted : false
                        }
                        generateCode.push(obj);
                    
                }
                for(let x=1; x<=Number(kurang_baik); x++){ 
                        no = no + 1;
                        let obj = {
                            id_detailbarang : current.getTime()+no.toString(),
                            id_barang : id_barang,
                            id_ruangan : id_ruangan,
                            kondisi : "Kurang Baik",
                            createdby : req.user.nama_petugas,
                            deleted : false
                        }
                        generateCode.push(obj);
                }
                for(let y=1; y<=Number(rusak_berat); y++){
                        no = no + 1;
                        let obj = {
                            id_detailbarang : current.getTime()+no.toString(),
                            id_barang : id_barang,
                            id_ruangan : id_ruangan,
                            kondisi : "Rusak Berat",
                            createdby : req.user.nama_petugas,
                            deleted : false
                        }
                        generateCode.push(obj);
                }
                
                console.log(generateCode);
                detail_barang.bulkCreate(generateCode)
                .then(result => {
                    res.status(200).send("<script language='javascript' type='text/javascript'>alert('Data Berhasil Disimpan');window.location.href='/distribusi/pilih';</script>");
                })    
            })      
        })
    },

    simpan : (req, res) => {
        const {id_barang, kode_inventaris, kondisi, id_ruangan} = req.body;
        if(kode_inventaris.length === 0 || kode_inventaris.length === 19){
            barang.findOne({where : {id_barang : id_barang}})
            .then(result => {
                detail_barang.count({where : {id_barang : id_barang}})
                .then(count => {
                    detail_barang.findAll({where : {id_barang : id_barang}})
                    .then(getDetail => {
                        for(let i=0; i<getDetail.length; i++){
                            if(getDetail[i].no_inventaris+'.'+result.tahun === kode_inventaris+'.'+result.tahun){
                                return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Kode Inventaris Barang Telah Digunakan');history.back();</script>");
                            }
                        }
                        var no = 100;
                        detail_barang.create({
                            id_detailbarang : id_barang + no.toString() + count,
                            id_barang : id_barang,
                            no_inventaris : kode_inventaris,
                            kondisi : kondisi,
                            id_ruangan : id_ruangan,
                            createdby : req.user.nama_petugas,
                            deleted : false
                        })
                        .then(result => {
                            res.status(200).send("<script language='javascript' type='text/javascript'>alert('Data Berhasil Disimpan');window.location.href='/distribusi/pilih';</script>");
                        })
                    })
                })            
            })
        }else if(kode_inventaris.length !== 19){
            res.status(400).send("<script language='javascript' type='text/javascript'>alert('Masukkan Kode Inventaris Dengan Benar');history.back();</script>")
        }
        

        // detail_barang.count({where : {id_barang : id_barang}})
        // .then(count => {
        //     // var current = new Date();
        //     var no = 100;
        //     detail_barang.create({
        //         id_detailbarang : id_barang + no.toString() + count,
        //         id_barang : id_barang,
        //         no_invetaris : kode_inventaris,
        //         kondisi : kondisi,
        //         id_ruangan : id_ruangan,
        //         createdby : req.user.nama_petugas,
        //         deleted : false
        //     })
        //     .then(result => {
        //         res.status(200).send("<script language='javascript' type='text/javascript'>alert('Data Berhasil Disimpan');window.location.href='/distribusi/pilih';</script>");
        //     })
        // })
    }

    // renderpilih : (req, res) => {
    //     detail_barang.findAll()
    //     .then(getDetail => {
    //         data = [];
    //         getDetail.forEach(element => {
    //             data.push(element.id_barang);
    //         })

    //         data.sort();

    //         var current = null; 
    //         var cnt = 0;
    //         for (var i = 0; i < data.length; i++) {
    //             if (data[i] != current) {
    //                 if (cnt > 0) {
    //                     console.log(current + ' :' + cnt);
    //                 }
    //                 current = data[i];
    //                 cnt = 1;
    //             } else {
    //                 cnt++;
    //             }
    //         }
    //         if (cnt > 0) {
    //             console.log(current + ' :' + cnt, typeof(current));
    //             console.log(typeof(cnt));
    //         }
    //         res.status(200).send('berhasil');
       
    //     })
    // }
}