const { LockedStake, Transaction } = require('../db.js')

const lockedStake = async (req, res) => {
  let { parking, roi, deposit, Acc} = req.body
  

  if(parking === '5 minutes'){
  let start_date = Date.now()
  const end_date = start_date + 300000

  console.log(start_date)
  console.log(end_date)
 
  let a = setInterval(function(){
  mensaje(end_date)
}, 60000)
 
function mensaje(end_date) {
       let time1 = Date.now()
          console.log(time1)
					console.log(end_date)
         if(time1 >= end_date){
           console.log('dineroenviado')
           clearInterval(a)
           return 
         };
  };
  
  const locked = await LockedStake.create({
      roi,
      parking,
      deposit,
      end_date,
  });
    res.send("El plazo fijo se creo correctamente");
  }
};


module.exports = lockedStake;

