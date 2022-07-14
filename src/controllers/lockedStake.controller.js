const { LockedStake, Account, SavingAccount, RegisterLockedStake } = require('../db.js');

const lockedStake = async (req, res) => {
  let { parking, roi, deposit } = req.body
  const { AccountId } = req.user
  const accountOrigin = await Account.findOne({ where: { id: AccountId } });
  const savingAccountOrigin = await SavingAccount.findOne({ where: { id: accountOrigin.SavingAccountId } });
  
if(savingAccountOrigin.LockedStakeId === null){  
if(savingAccountOrigin.ars >= deposit){
if(parking === '5 minutes'){
  let start_date = Date.now()
  const endDate = start_date + 300000
  let updateAmountOrigin = savingAccountOrigin.ars - Number(deposit)
  await savingAccountOrigin.update({
      ars: updateAmountOrigin
 }, { where: { id: savingAccountOrigin.id }})
  let updateBalanceOrigin = accountOrigin.balance - Number(deposit)
  await accountOrigin.update({
    balance: updateBalanceOrigin
  }) 

  console.log(start_date)
  console.log(endDate)
 
  let a = setInterval(function(){
  mensaje(endDate)
}, 300000)
 
async function mensaje(end_date) {
       let time1 = Date.now()
          console.log(time1)
					console.log(end_date)
         if(time1 >= end_date){
          let roiF = Number(deposit) + Number(deposit * 5 / 100) 
          let updateAmountOrigin = savingAccountOrigin.ars + Number(roiF)
          await savingAccountOrigin.update({
              ars: updateAmountOrigin
          }, { where: { id: savingAccountOrigin.id }})
          let updateBalanceOrigin = accountOrigin.balance + Number(roiF)
          await accountOrigin.update({
            balance: updateBalanceOrigin
          }) 

          let hour = new Date().getHours()
          let min = new Date().getMinutes()
          let minFinal = Number(min) + 5
          if(Number(min) >= 55){
          minFinal = Number(minFinal) - 60
          hour = Number(hour + 1) 
          }
          let time1 = hour + ':' + minFinal
          let month = '' + new Date().getMonth()
          let monthFinal = Number(month) + 1 
          let day = '' + new Date().getDate()
          let year = new Date().getFullYear()
          let end_date = day + '/' + monthFinal + '/' + year + ' ' + time1
          let transactionType = "finalized"
       const registerLocked = await RegisterLockedStake.create({
        roi,
        parking,
        transactionType,
        deposit: updateAmountOrigin,
        end_date,
      })
           console.log('dinero enviado')
           clearInterval(a)
           return 
    } 
  };

  let hour = new Date().getHours()
  let min = new Date().getMinutes()
  let minFinal = Number(min) + 5
  if(Number(min) >= 55){
  minFinal = Number(minFinal) - 60
  hour = Number(hour + 1) 
  }
  let time1 = hour + ':' + minFinal
  let month = '' + new Date().getMonth()
  let monthFinal = Number(month) + 1 
  let day = '' + new Date().getDate()
  let year = new Date().getFullYear()
  let end_date = day + '/' + monthFinal + '/' + year + ' ' + time1
  let transactionType = "pending"

  const registerLocked = await RegisterLockedStake.create({
    roi,
    parking,
    transactionType,
    deposit,
    end_date,
  })
  
  const locked = await LockedStake.create({
      roi,
      parking,
      deposit,
      end_date,
  });
  locked.setSavingAccount(savingAccountOrigin)
    res.send("El plazo fijo se creo correctamente");
  } 
} else if(savingAccountOrigin.ars < deposit) {
   res.send("No tienes el dinero suficiente para invertir en plazo fijo")
}} else if(savingAccountOrigin.LockedStakeId === 1)  {
    res.status(404).send('solo puedes tener un plazo fijo!')
  }  
};


module.exports = lockedStake;

