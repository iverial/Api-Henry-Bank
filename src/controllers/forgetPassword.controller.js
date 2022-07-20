const { User } = require('../db.js');
const { hashSync, compareSync } = require('bcrypt');

const forgetPassword = async (req, res) => {
    try {
        const { password, identity, email } = req.body;
        let passwordhash = hashSync(password, 10);
        let finduserByidentity = await User.findOne({where: {identity: identity}})
        let usuario = await User.findOne({where: {email: email}})
        if(!finduserByidentity || !usuario){
            res.status(404).send("el usuario no existe")
        } else {
             await usuario.update({
            password: passwordhash
        })
        res.send("password actualizada con exito.")
      }
    } catch (error) {
       console.log(error)
    }
};

module.exports = forgetPassword