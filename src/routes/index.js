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
const passport = require('passport');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const authRouter = require('./auth.js');

const loginRouter = require('./login.router.js');
const registerRouter = require('./register.router.js');
const userRouter = require('./user.router.js');
const lockedStake = require('./lockedStake.router.js');
const cryptoRouter = require('./crypto.router.js');
const userEmail = require('./userEmail.router')
const searchAccount = require('./searchAccount.router.js');

// const temperamentsRouter = require('./temperamentsRouter/router.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  userRouter
);
router.use(
  '/crypto',
  passport.authenticate('jwt', { session: false }),
  cryptoRouter
);
router.use(
  '/lockedStake',
  passport.authenticate('jwt', { session: false }),
  lockedStake
);
router.use('/userEmail', userEmail)



router.use('/search', searchAccount); 





module.exports = router;
