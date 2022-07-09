const { LockedStake, Account } = require('../db.js')

const lockedStake = async (req, res) => {
  let { id , parking, start_date, end_date, roi, deposit, cbu} = req.body
    
  const [locked, created] = await LockedStake.findOrCreate({
    where: {
      id
    },
    defaults: {
      id,
      roi,
      parking,
      deposit,
      start_date,
      end_date,
    },
  });


  if(created) {
    res.send("El plazo fijo se creo correctamente");
  } else {
    res.send("el plazo fijo ya existe");
  }
};


module.exports = lockedStake;

