const { Account, SavingAccount, RegisterTransaction } = require('../db.js');

const { AccountDestiny } = require('../controllers/searchAccount.controller.js');


async function tranfer(req, res) {




    const { amount } = req.body
    // cuenta origen
    const { AccountId } = req.user
    const accountOrigin = await Account.findOne({ where: { id: AccountId } });

    const savingAccountOrigin = await SavingAccount.findOne({ where: { id: accountOrigin.SavingAccountId } });
    const savingAccountDestiny = await SavingAccount.findOne({ where: { id: AccountDestiny.Account.SavingAccountId } });

    if (savingAccountOrigin.ars >= amount) {
        //transaccion de cuenta de Origen
        let updateAmountOrigin = savingAccountOrigin.ars - Number(amount)
        await savingAccountOrigin.update({
            ars: updateAmountOrigin
        }, { where: { id: savingAccountOrigin.id } }
        )
        //transaccion de cuenta de Destiny
        let updateAmountDestiny = savingAccountDestiny.ars + Number(amount)
        await savingAccountDestiny.update({
            ars: updateAmountDestiny
        }, { where: { id: savingAccountDestiny.id } }
        )
        // ACA ENVIAR AL REGISTRO DE TRANSACCIONES 
        await RegisterTransaction.create({
            accountOrigin: accountOrigin.id,
            amountOrigin: savingAccountOrigin.ars,
            accountDestiny: AccountDestiny.Account.id,
            amountDestiny: savingAccountDestiny.ars,
            amount: amount,
        });

        res.send({ msg: "Transaccion Exitosa" })
    } else {
        res.send({ msg: "Fondos insuficiente" })
    }
}


module.exports = {
    tranfer
}