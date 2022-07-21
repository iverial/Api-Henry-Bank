
const { conn } = require('../db.js');
const { hashSync, compareSync } = require('bcrypt');


const { User, Account, Nationality, SavingAccount, Role } = require('../db.js');
const queryInterface = conn.queryInterface
const { generateCBU, generateAlias } = require("../controllers/register.controller.js")

async function loadRole() {

    await queryInterface.bulkInsert('Roles', [
        { role: "admin", createdAt: new Date(), updatedAt: new Date() },
        { role: "user", createdAt: new Date(), updatedAt: new Date() }
    ], {})
}



async function createAdmin(
    identity = "99582369",
    name = "Enano",
    lastName = "Loco",
    dateOfBirth = 123124,
    gender = "indefinfido",
    email = "enanoloco@henrry.com",
    password = "Enanoloco123",
    city = "Mexico",
    address = "enanoloco@henrry.com",
    nationality = "Argentina",
    role = "admin",
) {
    const encrippassword = hashSync(password, 10);
    try {

        const user = await User.create({
            identity: identity,
            name: name,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            email: email,
            password: encrippassword,
            city: city,
            address: address,
            role: role
        })
        const dbRoles = await Role.findOne({ where: { role: 'admin' } })
        await user.addRole(dbRoles);

        const account = await Account.create({
            cbu: generateCBU(),
            alias: generateAlias(email),
            name: name,
            lastName: lastName,
            balance: 0,
            contacts: email,
        });
        account.setUser(user);

        const [nation, created] = await Nationality.findOrCreate({
            where: { name: nationality },
            defaults: {
                name: nationality,
            },
        });

        nation.addUser(user);

        const savingAccount = await SavingAccount.create({
            ars: 0,
            usd: 0,
        });

        account.setSavingAccount(savingAccount);

    }

    catch (error) {

    }
};


module.exports = {
    loadRole,
    createAdmin
}
