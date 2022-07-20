
const { conn } = require('../db.js');

const queryInterface = conn.queryInterface


async function loadRole() {
    return await Promise.all([



        queryInterface.bulkInsert('Roles', [
            { role: "admin", createdAt: new Date(), updatedAt: new Date() },
            { role: "user", createdAt: new Date(), updatedAt: new Date() }
        ], {}),



        queryInterface.bulkInsert('Users', [
            {
                id: "c709182f-1f00-40d1-8f9a-e2236025c2b4",
                identity: 99582369,
                image: 'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png',
                name: "Enano",
                lastName: "Loco",
                gender: "indefinfido",
                dateOfBirth: 123123,
                address: "Calle Falsa 125",
                city: "Mexico",
                email: "enanoloco@henrry.com",
                password: "pass123456",
                role: "admin"
            },

        ], {}),
        queryInterface.bulkInsert('User_Role', [
            {
                UserId: "c709182f-1f00-40d1-8f9a-e2236025c2b4",
                RoleId: 1,
            },

        ], {}),

    ]);
};


module.exports = {
    loadRole
}
