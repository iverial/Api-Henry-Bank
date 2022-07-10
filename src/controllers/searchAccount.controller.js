const { Account } = require('../db.js');

async function searchAccount(req, res, next) {
    const { cbu, alias } = req.body
    if (cbu) {
        const findCbu = await Account.findOne({ where: { cbu } });
        if (findCbu) {
            res.status(200).json("se recibicio el cbu")
        } else {
            res.status(400).json("no se encontro el alias cbu")
        }
    } else if (alias) {
        const findAlias = await Account.findOne({ where: { alias: alias } });
        console.log(findAlias)
        if (findAlias) {
            res.status(200).json("se recibicio el alias")
        } else
            res.status(400).json("no se encotro el alias buscado")
    }
}

module.exports = {
    searchAccount,
}
