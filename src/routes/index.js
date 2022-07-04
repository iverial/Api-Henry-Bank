const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const registerAccont = require('../controllers/registerAccount');
const loginAccount = require('../controllers/loginAccount');
const userManagement = require('../controllers/userManagement');
const addCredit = require('../controllers/addCredit');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// POST /Register
// POST /Login

// POST /addCredit         Recibe el usuario y el monto a recargar

// GET  /user/             Traiga el saldo y las trx del usuario
// POST /user/transfer     Recibe datos y hace una transferencia a otro usuario devuelve el nuevo saldo
// GET  /user/invest       Recibe el balance de los activos del usuario
// POST /user/invest       Recibe datos y hace compra o venta de un activo y devuelve el nuevo saldo

// GET  /prices            Actualiza el precio de los activos

router.use('/register', registerAccont);
router.use('/login', loginAccount);
router.use('/addCredit', addCredit);
router.use('/user', userManagement);

module.exports = router;
