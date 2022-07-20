
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
const userEmail = require('./userEmail.router');
const searchAccount = require('./searchAccount.router.js');
const adminRouter = require('./admin.router.js');
const forgetPassword = require('./forgetPassword.router.js')



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
router.use('/forgetPassword', forgetPassword);

router.use('/userEmail', userEmail);

router.use(
  '/search',
  passport.authenticate('jwt', { session: false }),
  searchAccount
);

router.use(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  adminRouter
);

module.exports = router;
