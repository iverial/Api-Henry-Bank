const {
  Account,
  SavingAccount,
  RegisterTransaction,
  User,
} = require('../db.js');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_SEND_KEY);

const {
  AccountDestiny,
} = require('../controllers/searchAccount.controller.js');

async function tranfer(req, res) {
  try {
    const { amount } = req.body;
    if (!amount) res.status(404).json({ msg: 'No se ingreso dinero' });
    else {
      // cuenta origen
      const { AccountId } = req.user;
      const accountOrigin = await Account.findOne({ where: { id: AccountId } });

      const savingAccountOrigin = await SavingAccount.findOne({
        where: { id: accountOrigin.SavingAccountId },
      });
      const savingAccountDestiny = await SavingAccount.findOne({
        where: { id: AccountDestiny.Account.SavingAccountId },
      });

      if (Number(savingAccountOrigin.ars) >= Number(amount)) {
        //transaccion de cuenta de Origen
        let updateAmountOrigin =
          Number(savingAccountOrigin.ars) - Number(amount);
        await savingAccountOrigin.update(
          {
            ars: updateAmountOrigin,
          },
          { where: { id: savingAccountOrigin.id } }
        );
        await accountOrigin.update({
          balance: updateAmountOrigin,
        });

        //transaccion de cuenta de Destiny
        let updateAmountDestiny =
          Number(savingAccountDestiny.ars) + Number(amount);
        await savingAccountDestiny.update(
          {
            ars: updateAmountDestiny,
          },
          { where: { id: savingAccountDestiny.id } }
        );
        await AccountDestiny.Account.update({
          balance: updateAmountDestiny,
        });

        // ACA ENVIAR AL REGISTRO DE TRANSACCIONES
        await RegisterTransaction.create({
          accountOrigin: accountOrigin.id,
          amountOrigin: savingAccountOrigin.ars,
          accountDestiny: AccountDestiny.Account.id,
          amountDestiny: savingAccountDestiny.ars,
          amount: amount,
        });

        const emailOrigin = await User.findOne({
          where: { AccountId: accountOrigin.id },
        });
        const emailDestiny = await User.findOne({
          where: { AccountId: AccountDestiny.Account.id },
        });
        const msgSend = {
          to: emailOrigin.email,
          from: 'briangvazq@gmail.com',
          subject: 'HenryBank Transferencia enviada',
          text: `Hola ${emailOrigin.name}, has enviado ${amount} a ${emailDestiny.name} ${emailDestiny.lastName}`,
        };
        sgMail.send(msgSend);
        const msgReceive = {
          to: emailDestiny.email,
          from: 'briangvazq@gmail.com',
          subject: 'HenryBank Transferencia recibida',
          text: `Hola ${emailDestiny.name}, has recibido ${amount} de ${emailOrigin.name} ${emailOrigin.lastName}`,
        };
        sgMail.send(msgReceive);

        res.send({ msg: 'Transaccion Exitosa' });
      } else {
        res.send({ msg: 'Fondos insuficiente' });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  tranfer,
};
