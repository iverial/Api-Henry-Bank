const { User } = require('../db.js');
const { hashSync, compareSync } = require('bcrypt');

const forgetPassword = async (req, res) => {
    try {
        const { password, identity, email } = req.body;
        let passwordhash = hashSync(password, 10);
        let usuario = await User.findOne({where: {identity: identity}, where: {email: email}})
        await usuario.update({
            password: passwordhash
        })
        res.send("password actualizada con exito.")
    } catch (error) {
       console.log(error)
    }
};

module.exports = forgetPassword