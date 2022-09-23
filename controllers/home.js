module.exports = {
    home : (req, res) => {
        const user = req.user.dataValues
        // console.log(req.user.dataValues);

        res.render('dashboard', {user})
    }
}