const {
  LockedStake,
  Account,
  SavingAccount,
  RegisterLockedStake,
  User,
} = require('../db.js');

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.EMAIL_SEND_KEY);

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
          console.log(hour)
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
      console.log(hour)
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
        account: AccountId,
        parking,
        transactionType,
        deposit,
        end_date,
      });
      locked.setSavingAccount(savingAccountOrigin);

      const emailUser = await User.findOne({
        where: { AccountId: accountOrigin.id },
      });

      // const msg = {
      //   to: emailUser.email,
      //   from: 'briangvazq@gmail.com',
      //   subject: 'Nuevo plazo fijo creado HenryBank',
      //   text:
      //     'Hola, se ha creado un nuevo plazo fijo en HenryBank para el usuario ' +
      //     emailUser.name +
      //     ' ' +
      //     emailUser.lastName +
      //     ' por un monto de ' +
      //     deposit +
      //     ' ARS',
      //   html:
      //     '<strong>Hola, se ha creado un nuevo plazo fijo en HenryBank para el usuario ' +
      //     emailUser.name +
      //     ' ' +
      //     emailUser.lastName +
      //     ' por un monto de ' +
      //     deposit +
      //     ' ARS</strong>',
      // };
      // sgMail.send(msg);

      res.send('El plazo fijo se creo correctamente')
    }
  } else if (savingAccountOrigin.ars < deposit) {
    res.send('No tienes el dinero suficiente para invertir en plazo fijo');
  }
  } catch (error) {
    console.log(error)
  };
};

module.exports = lockedStake;
