const {
  LockedStake,
  Account,
  SavingAccount,
  RegisterLockedStake,
} = require('../db.js');

const lockedStake = async (req, res) => {
  try {


    let { parking, roi, deposit } = req.body;
    const { AccountId } = req.user;
    const accountOrigin = await Account.findOne({ where: { id: AccountId } });
    const savingAccountOrigin = await SavingAccount.findOne({
      where: { id: accountOrigin.SavingAccountId },
    });

    let status = await LockedStake.findAll({
      where: {
        transactionType: 'pending',
        SavingAccountId: accountOrigin.SavingAccountId,
      },
    });

    console.log(status);

    if (status[0]) {
      res.send('plazo fijo activo');
    } else {
      if (savingAccountOrigin.ars >= deposit) {
        if (parking === '5 minutes') {
          let start_date = Date.now();
          const endDate = start_date + 120000;
          let updateAmountOrigin = savingAccountOrigin.ars - Number(deposit);
          await savingAccountOrigin.update(
            {
              ars: updateAmountOrigin,
            },
            { where: { id: savingAccountOrigin.id } }
          );
          let updateBalanceOrigin = accountOrigin.balance - Number(deposit);
          await accountOrigin.update({
            balance: updateBalanceOrigin,
          });

          let a = setInterval(function () {
            mensaje(endDate);
          }, 120000);

          async function mensaje(end_date) {
            let time1 = Date.now();
            console.log(time1);
            console.log(end_date);
            if (time1 >= end_date) {
              let roiF = Number(deposit) + Number((deposit * 5) / 100);
              let updateAmountOrigin = savingAccountOrigin.ars + Number(roiF);
              await savingAccountOrigin.update(
                {
                  ars: updateAmountOrigin,
                },
                { where: { id: savingAccountOrigin.id } }
              );
              let updateBalanceOrigin = accountOrigin.balance + Number(roiF);
              await accountOrigin.update({
                balance: updateBalanceOrigin,
              });
              await LockedStake.update(
                {
                  transactionType: 'finalized',
                },
                {
                  where: {
                    transactionType: 'pending',
                    SavingAccountId: accountOrigin.SavingAccountId,
                  },
                }
              );

              let hour = new Date().getHours();
              let min = new Date().getMinutes();
              let minFinal = Number(min) + 5;
              if (Number(min) >= 55) {
                minFinal = Number(minFinal) - 60;
                hour = Number(hour + 1);
              }
              let time1 = hour + ':' + minFinal;
              let month = '' + new Date().getMonth();
              let monthFinal = Number(month) + 1;
              let day = '' + new Date().getDate();
              let year = new Date().getFullYear();
              let end_date = day + '/' + monthFinal + '/' + year + ' ' + time1;
              let transactionType = 'finalized';

              await RegisterLockedStake.create({
                roi,
                account: AccountId,
                parking,
                transactionType,
                deposit: roiF,
                end_date,
              });

              console.log('dinero enviado');
              clearInterval(a);
              return;
            }
          }

          let hour = new Date().getHours();
          let min = new Date().getMinutes();
          let minFinal = Number(min) + 5;
          if (Number(min) >= 55) {
            minFinal = Number(minFinal) - 60;
            hour = Number(hour + 1);
          }
          let time1 = hour + ':' + minFinal;
          let month = '' + new Date().getMonth();
          let monthFinal = Number(month) + 1;
          let day = '' + new Date().getDate();
          let year = new Date().getFullYear();
          let end_date = day + '/' + monthFinal + '/' + year + ' ' + time1;
          let transactionType = 'pending';

          await RegisterLockedStake.create({
            roi,
            account: AccountId,
            parking,
            transactionType,
            deposit,
            end_date,
          });
          const locked = await LockedStake.create({
            roi,
            parking,
            transactionType,
            deposit,
            end_date,
          });
          locked.setSavingAccount(savingAccountOrigin);
          res.send('El plazo fijo se creo correctamente');
        }
      } else if (savingAccountOrigin.ars < deposit) {
        res.send('No tienes el dinero suficiente para invertir en plazo fijo');
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = lockedStake;
