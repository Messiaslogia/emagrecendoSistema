const express = require('express');
const router = express.Router();
const LoginController = require("../controller/LoginController");
const verifyToken  = require("../controller/token");


/* GET home page. */
router.get('/', LoginController.index);
router.get('/users', verifyToken, LoginController.login)



router.post('/users', verifyToken, LoginController.login)
router.post('/distribuidores', LoginController.distribuidor)
router.post('/vendedores', LoginController.vendedor)





module.exports = router;
