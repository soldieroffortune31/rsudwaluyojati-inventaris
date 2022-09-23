const {ruangan, detail_barang, barang} = require('../models');

module.exports = {

	renderkondisi : (req, res) => {
		const user = req.user.dataValues;
		ruangan.findAll({where : {deleted : false}, order :[['nama_ruangan','ASC']]})
		.then(dataRuangan => {
			res.status(200).render('kondisi', {dataRuangan, user});
		});
	},

	renderupdate : (req, res) => {
		const id = req.params.id;
		const user = req.user.dataValues;
		// console.log(id)
		// res.send('berhasil')
        detail_barang.findAll({include: [{model: barang, as: "barang"}], where : {id_detailbarang : id}})
        .then(getDetail => {
            // res.send(getDetail);
            res.status(200).render('updatekondisi', {getDetail, user});
        })
	},

	getdata : (req, res) => {
		const {id_ruangan} = req.body;
		const user = req.user.dataValues;
		detail_barang.count({where : {id_ruangan : id_ruangan}})
        .then(jumlah => {
            detail_barang.findAll({include: [{model: barang, as: "barang"}, {model: ruangan, as: "ruangan"}], where: {id_ruangan : id_ruangan}})
            .then(getDetail => {
                ruangan.findAll({where : {deleted : false}, order:[['nama_ruangan', 'ASC']] })
                .then(getRuangan => {
                    // res.status(200).send('berhasil');
                    res.status(200).render('kondisipilih', {getRuangan, getDetail, jumlah, user});
                })
            })
        })
	},

	update : async (req, res) => {
		const {id_detailbarang} = req.body;
        await detail_barang.update({
            kondisi : req.body.kondisi,
            updatedby : req.user.nama_petugas
        }, {where : {id_detailbarang : id_detailbarang}})
        .then(result => {
            return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Update Berhasil');window.location.href='/kondisi';</script>");
        })   
	},

	delete : async (req, res) => {
		const id = req.params.id;
		await detail_barang.destroy({where : {id_detailbarang : id}})
		.then(result => {
			return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Data Berhasil Dihapus');window.location.href='/kondisi';</script>");
		})
	}
}