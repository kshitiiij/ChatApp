const express = require('express');
const router = express.Router();
const {register,signin,loginRequired,profile} = require('../controllers/userController');

// router.route('/tasks').post(loginRequired,profile);

// router.route('auth/register').post(register);

// router.route('auth/signin').post(signin);

// module.exports = router;


module.exports = function(app) {
    app.route('/profile').post(loginRequired, profile);
    app.route('/auth/register').post(register);
   app.route('/auth/signin').post(signin);
};