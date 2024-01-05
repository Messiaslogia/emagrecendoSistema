const express = require('express');
const router = express.Router();
const LoginController = require("../controller/LoginController")

/* GET home page. */
router.get('/', LoginController.index);
router.get('/users', LoginController.login)



router.post('/users', LoginController.login)
router.post('/distribuidores', LoginController.distribuidor)
router.post('/vendedores', LoginController.vendedor)





module.exports = router;
