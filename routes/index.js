const express = require('express');
const router = express.Router();
const LoginController = require("../controller/LoginController");
const verifyToken  = require("../controller/token");


/* GET home page. */
router.get('/', LoginController.index);
router.get('/users', verifyToken, LoginController.login);

router.get('/users/sair', verifyToken, LoginController.logout);
router.get('/users/editarPerfil', verifyToken, LoginController.editarPerfilIndex);

router.post('/users', verifyToken, LoginController.login);
router.post('/users/editarPerfil', verifyToken, LoginController.editarPerfilPost);
router.post('/distribuidores', LoginController.distribuidor)
router.post('/vendedores', LoginController.vendedor)





module.exports = router;
