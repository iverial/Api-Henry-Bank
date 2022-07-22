
const { Router } = require('express');
const passport = require('passport');
const router = Router();


//middlewares
const { isAdmin } = require('../middlewares/authAdmin.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const authRouter = require('./auth.js');

const loginRouter = require('./login.router.js');
const registerRouter = require('./register.router.js');
const userRouter = require('./user.router.js');
const lockedStake = require('./lockedStake.router.js');
const cryptoRouter = require('./crypto.router.js');
const userEmail = require('./userEmail.router');
const searchAccount = require('./searchAccount.router.js');
const adminRouter = require('./admin.router.js');
const forgetPassword = require('./forgetPassword.router.js')

//----------LOGIN REGISTER----------//
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  userRouter
);

//----------------------------------------------------------//

//----------COMPRA Y VENTA CRIPTO----------//
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

//----------------------------------------------------------//

router.use('/forgetPassword', forgetPassword);


router.use('/userEmail', userEmail);

router.use(
  '/search',
  passport.authenticate('jwt', { session: false }),
  searchAccount
);
//----------------------------------------------------------//

//rutas de admin 


router.use(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  adminRouter
);

module.exports = router;
