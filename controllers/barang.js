const {barang, ruangan, detail_barang} = require("../models");

module.exports = {
    
    renderbarang : async (req, res) => {
        const user = req.user.dataValues;
        await barang.findAll({where : {deleted : false}, order : [['id_barang', 'ASC']]})
        .then(dataBarang => {
            detail_barang.findAll()
            .then(getDetail => {
                res.status(200).render('databarang', {dataBarang, getDetail, user});
            })
        })
    },

    renderinputbarang : async (req, res) => {
        const user = req.user.dataValues;
        res.status(200).render('inputbarang', {user});
    },

    // // sini 
    renderupdate : async (req, res) => {
        const id = req.params.id;
        const user = req.user.dataValues;
        await barang.findOne({where : {id_barang : id}})
        .then(dataBarang => {
            res.status(200).render('updatebarang', {dataBarang, user});
        })
    },

    // renderpreview : async (req, res) =>{
    //     const id = Number(req.params.id);
    //     console.log("ini ID nya", id);
    //     await barang.findOne({where : {id : id}})
    //     .then(dataBarang => {
    //         res.status(200).render('previewbarang', {dataBarang})
    //     })
    // },

    create : async (req, res) => {
        const jumlah = req.body.jumlah;
        // res.send('Tanggal : '+req.body.tanggal+' Tipe Data : '+typeof(req.body.tanggal));

        // res.send('Tahun : '+req.body.tahun.substring(2)+' TIPE : '+typeof(req.body.tahun))
        var current = new Date();
        var newID = current.getTime().toString();
        const id_barang = newID;
        let harga = req.body.harga;
        var convertHarga = Number(harga.replace(/\D/g, ''));
        if(req.body.kode_barang === "" || req.body.nama_barang === "" || req.body.merk === "" || req.body.jumlah === "" || convertHarga === 0 || req.body.tahun === "" || req.body.sumber_dana === "" || req.body.tanggal === ""){
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Silahkan Masukkan Data Dengan Benar');window.location.href='/barang/inputbarang';</script>");    
        }
        const found = await barang.findOne({where : {id_barang : id_barang}});
        if(found){
            return res.status(400).json({message : 'Kode Barang telah digunakan'});
        }else{
            await barang.create({
                id_barang : id_barang,
                id_instansi : "12.13.20.07.03."+req.body.tahun.substring(2)+".01.01",
                kode_barang : req.body.kode_barang,
                nama_barang : req.body.nama_barang,
                merk : req.body.merk,
                tipe : req.body.tipe,
                jumlah : req.body.jumlah,
                harga : convertHarga,
                tahun : req.body.tahun,
                tanggal : req.body.tanggal,
                sumber_dana : req.body.sumber_dana,
                keterangan : req.body.keterangan,
                deleted : false
            }).then(result => {
                return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Barang Berhasil Disimpan');window.location.href='/barang';</script>");     
            })
        }
    },

    detailbarang : (req, res) =>{
        const id = req.params.id;
        const user = req.user.dataValues;
        detail_barang.findAll({include : [{model: barang, as : "barang"}, {model: ruangan, as : "ruangan"}], where : {id_barang : id}})
        .then(result => {
            // res.send(result);
            res.status(200).render('detailbarang', {result, user})
        })
    },

    update : (req, res) => {
        const id = req.params.id;
        let harga = req.body.harga;
        var convertHarga = Number(harga.replace(/\D/g, ''));
        if(req.body.kode_barang === "" || req.body.nama_barang === "" || req.body.merk === "" || req.body.jumlah === "" || convertHarga === 0 || req.body.tahun === "" || req.body.sumber_dana === ""){
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Silahkan Masukkan Data Dengan Benar');window.location.href='/barang';</script>");    
        }
        detail_barang.count({where : {id_barang : id}})
        .then(jumlahBarang => {
            if(Number(req.body.jumlah) < jumlahBarang){
                return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Jumlah Barang Kurang Dari Jumlah Seluruh Barang Yang Ada Di Ruangan');window.location.href='/barang';</script>");
            }
            const found = barang.findOne({where : {id_barang : id}});
            if(found){
                barang.update({
                    kode_barang : req.body.kode_barang,
                    nama_barang : req.body.nama_barang,
                    merk : req.body.merk,
                    tipe : req.body.tipe,
                    jumlah : req.body.jumlah,
                    harga : convertHarga,
                    tahun : req.body.tahun,
                    sumber_dana : req.body.sumber_dana,
                    tanggal : req.body.tanggal,
                    keterangan : req.body.keterangan
                }, {where : {id_barang : id}})
                .then(result => {
                    res.status(200).send("<script language='javascript' type='text/javascript'>alert('Update Berhasil');window.location.href='/barang';</script>");
                })
            }
        })
        
    },

    renderupdateno : (req, res) => {
        const id = req.params.id;
        const user = req.user.dataValues;
        detail_barang.findOne({include : [{model : barang, as : "barang"}, {model : ruangan, as : "ruangan"}],where : {id_detailbarang : id}})
        .then(result => {
            // res.status(200).send(result);
            res.status(200).render('noinventaris', {result, user})    
        })
    },

    tambah : (req, res) => {
        const id = req.params.id;
        const no = req.body.no_inventaris;
        if(no === "" || no.length !== 19){
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Masukkan Kode Inventaris Dengan Benar');history.back();</script>"); 
        }
        barang.findOne({where : {id_barang : req.body.id_barang}})
        .then(result => {
            detail_barang.findAll({where : {id_barang : req.body.id_barang}})
            .then(getDetail => {
                // let count = 1;
                for(let i=0; i<getDetail.length; i++){
                    if(getDetail[i].no_inventaris+'.'+result.tahun === no+'.'+result.tahun){
                        return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Kode Inventaris Telah Digunakan');history.back();</script>");               
                        // count++;
                    }
                }
                detail_barang.update({
                    no_inventaris : no
                }, {where : {id_detailbarang : id}})
                .then((e) =>{
                    return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Berhasil Simpan Data');window.location.href='/barang';</script>");
                })
            })
        })

    }, 

    delete : (req, res) => {
        const id = req.params.id;
        detail_barang.count({where : {id_barang : id}})
        .then(result => {
            if(result !== 0){
                return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Tidak bisa hapus barang karena masih ada data barang di ruangan');history.back();</script>");
            }
            // res.send('berhasil')
            barang.destroy({where : {id_barang : id}})
            .then(e => {
                return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Berhasil Hapus Data');window.location.href='/barang';</script>");
            })
        })
    },

    
    deleteByUpdate : async (req, res) => {
        const id = req.params.id;
        const found = await barang.findOne({where : {id_barang :id}});
        if(found){
            await barang.update({
                deleted : true
            }, {where : {id_barang : id}})
            .then(result => {
                res.status(200).send("<script language='javascript' type='text/javascript'>alert('Data Barang Berhasil Dihapus');window.location.href='/barang';</script>");
            })
        }
    }

}