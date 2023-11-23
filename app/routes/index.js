const express = require('express');
const router = express.Router();
const LoginController = require("../controller/LoginController")

/* GET home page. */
router.get('/',LoginController.index);
router.get('/users',LoginController.login)


module.exports = router;
