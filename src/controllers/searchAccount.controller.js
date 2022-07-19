const { Account } = require('../db.js');

let AccountDestiny = {};
async function searchAccount(req, res) {
  try {
    const { cbu, alias } = req.body;

    if (!cbu && !alias)
      res.status(404).json({ msg: 'No se ingreso el alias o el cbu' });
    else {
      if (cbu) {
        if (typeof cbu !== 'string')
          res.status(400).json({ msg: 'El cbu tiene que ser un string' });
        else {
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
        }
      } else if (alias) {
        if (typeof alias !== 'string')
          res.status(400).json({ msg: 'El alias tiene que ser un string' });
        else {
          const findAlias = await Account.findOne({ where: { alias } });

          console.log(findAlias);

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
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  searchAccount,
  AccountDestiny,
};
