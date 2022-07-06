// const { Router } = require('express');
// const router = Router();

// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

// const loginRouter = require('./loginRouter.js');

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);

// // POST /Register
// // POST /Login

// // POST /addCredit         Recibe el usuario y el monto a recargar

// // GET  /user/             Traiga el saldo y las trx del usuario
// // POST /user/transfer     Recibe datos y hace una transferencia a otro usuario devuelve el nuevo saldo
// // GET  /user/invest       Recibe el balance de los activos del usuario
// // POST /user/invest       Recibe datos y hace compra o venta de un activo y devuelve el nuevo saldo

// // GET  /prices            Actualiza el precio de los activos

// router.use('/login', loginRouter);

// // router.use('/register', registerRouter);
// // router.use('/addCredit', addCredit);
// // router.use('/user', userManagement);

// module.exports = router;

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const loginRouter = require('./loginRouter.js');
// const temperamentsRouter = require('./temperamentsRouter/router.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/login', loginRouter);
// router.use('/temperaments', temperamentsRouter);

module.exports = router;
