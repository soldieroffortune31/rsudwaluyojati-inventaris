const {detail_barang, barang, ruangan} = require('../models');

module.exports = {

    cetak : (req, res) => {
        const user = req.user.dataValues;
        const {id_ruangan} = req.params;
        detail_barang.findAll({include: [{model: barang, as: "barang"}, {model: ruangan, as: "ruangan"}], where: {id_ruangan : id_ruangan}})
        .then(getDetail => {
            const data = [];
            getDetail.forEach(element => {
                data.push(element.id_barang)
            });
            let uniqueChars = [...new Set(data)];
            let getData  = [];
            const arrBulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            let current = new Date()
            let tanggal = current.getDate()+' '+ arrBulan[current.getMonth()]+' '+current.getFullYear() 
            // let no = 0;
            for(let i=0; i<uniqueChars.length; i++){
                let obj = {
                    id_barang : uniqueChars[i],
                    jumlah : getDetail.filter(element => element.id_barang === uniqueChars[i]).length,
                    baik : 0,
                    kurang_baik : 0,
                    rusak_berat : 0,
                    tanggal : tanggal
                }
                getData.push(obj)
            }

            for(let j=0; j<getDetail.length; j++){
                for(let k=0; k<getData.length; k++){
                    if(getDetail[j].id_barang === getData[k].id_barang){
                        getData[k].kode_barang = getDetail[j].barang.kode_barang;
                        getData[k].nama_barang = getDetail[j].barang.nama_barang;
                        getData[k].merk = getDetail[j].barang.merk;
                        getData[k].tipe = getDetail[j].barang.tipe;
                        getData[k].harga = getDetail[j].barang.harga;
                        getData[k].tahun = getDetail[j].barang.tahun;
                        getData[k].sumber_dana = getDetail[j].barang.sumber_dana;
                        getData[k].keterangan = getDetail[j].barang.keterangan;
                        getData[k].id_ruangan = getDetail[j].ruangan.id_ruangan;
                        getData[k].nama_ruangan = getDetail[j].ruangan.nama_ruangan;
                        if(getDetail[j].kondisi === "Baik"){
                            getData[k].baik = getData[k].baik + 1;
                        }else if(getDetail[j].kondisi === "Kurang Baik"){
                            getData[k].kurang_baik = getData[k].kurang_baik + 1;
                        }else{
                            getData[k].rusak_berat = getData[k].rusak_berat + 1;
                        }
                        getData[k].jumlahBarang = getData.length;
                    }
                }
            }
            const dataSort = getData.sort((a, b) => a.nama_barang.localeCompare(b.nama_barang));
            // res.send(getData);
            res.status(200).render('cetaklaporan', {dataSort, user});
        })
    },

    renderlaporan : (req, res) =>{
        const user = req.user.dataValues;
        ruangan.findAll({where : {deleted : false}, order :[['nama_ruangan','ASC']]})
        .then(dataRuangan => {
            detail_barang.findAll({include: [{model: barang, as: "barang"}]})
            .then(getDetail => {
                res.status(200).render('inventaris', {dataRuangan, getDetail, user});
            })
        })
    },

    getDetail : (req, res) => {
        const user = req.user.dataValues;
        const {id_ruangan} = req.body;
        detail_barang.count({where : {id_ruangan : id_ruangan}})
        .then(result => {
            detail_barang.findAll({include: [{model: barang, as: "barang"}, {model: ruangan, as: "ruangan"}], where: {id_ruangan : id_ruangan}})
            .then(getDetail => {
                console.log(getDetail)
                ruangan.findAll({where : {deleted : false}, order :[['nama_ruangan','ASC']]})
                .then(getRuangan => {
                    const data = [];
                    getDetail.forEach(element => {
                        data.push(element.id_barang)
                    });
                    let uniqueChars = [...new Set(data)];
                    let getData  = []
                    let no = 0;
                    for(let i=0; i<uniqueChars.length; i++){
                        let obj = {
                            id_barang : uniqueChars[i],
                            jumlah : getDetail.filter(element => element.id_barang === uniqueChars[i]).length,
                            baik : 0,
                            kurang_baik : 0,
                            rusak_berat : 0
                        }
                        getData.push(obj)
                    }

                    // let jumlah = 1;
                    for(let j=0; j<getDetail.length; j++){
                        for(let k=0; k<getData.length; k++){
                            if(getDetail[j].id_barang === getData[k].id_barang){
                                getData[k].kode_barang = getDetail[j].barang.kode_barang;
                                getData[k].nama_barang = getDetail[j].barang.nama_barang;
                                getData[k].merk = getDetail[j].barang.merk;
                                getData[k].tipe = getDetail[j].barang.tipe;
                                getData[k].harga = getDetail[j].barang.harga;
                                getData[k].keterangan = getDetail[j].barang.keterangan;
                                getData[k].id_ruangan = getDetail[j].ruangan.id_ruangan;
                                getData[k].nama_ruangan = getDetail[j].ruangan.nama_ruangan;
                                if(getDetail[j].kondisi === "Baik"){
                                    getData[k].baik = getData[k].baik + 1;
                                }else if(getDetail[j].kondisi === "Kurang Baik"){
                                    getData[k].kurang_baik = getData[k].kurang_baik + 1;
                                }else{
                                    getData[k].rusak_berat = getData[k].rusak_berat + 1;
                                }
                                getData[k].jumlahBarang = getData.length;
                            }
                        }
                    }
                    // console.log(getData.length)
                    // res.status(200).send(getData)
                    res.status(200).render('inventarisruangan', {getData, getRuangan, result, user});
                })

            })
                // console.log(getData)
                // res.send(getData)
        })

        // })
    }

}