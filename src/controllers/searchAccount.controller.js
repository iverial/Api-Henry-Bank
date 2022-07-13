const { Account } = require('../db.js');

let AccountDestiny = {};
async function searchAccount(req, res) {
  const { cbu, alias } = req.body;

  if (!cbu && !alias)
    res.status(404).json({ msg: 'No se ingreso el alias o el cbu' });
  else {
    if (cbu) {
      const findCbu = await Account.findOne({ where: { cbu } });
      if (findCbu) {
        AccountDestiny.Account = findCbu;
        res.status(200).json({
          msg: 'Se recibicio el cbu',
          user: findCbu.name + ' ' + findCbu.lastName,
          cbu: findCbu.cbu,
        });
      } else {
        res.status(400).json({ msg: 'No se encontro el cbu' });
      }
    } else if (alias) {
      const findAlias = await Account.findOne({ where: { alias } });

      if (findAlias) {
        res.status(200).json({
          msg: 'Se recibicio el alias',
          user: findAlias.name + ' ' + findAlias.lastName,
          cbu: findAlias.dataValues.cbu,
        });
        AccountDestiny.Account = findAlias;
      } else res.status(400).json({ msg: 'No se encontro el alias' });
    }
  }
}

module.exports = {
  searchAccount,
  AccountDestiny,
};
