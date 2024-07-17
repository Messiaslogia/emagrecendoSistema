const express = require('express');
const router = express.Router();
const verifyToken  = require("../controller/token");
const ApiControllerAdmin = require("../controller/ApiControllerUsuarios")

router.get("/dellUser/:id", verifyToken, ApiControllerAdmin.dellUser);
router.get("/clientesTotais", ApiControllerAdmin.clientesTotais);
router.get("/userConsultEdit",  ApiControllerAdmin.infoUsuario)
router.get("/userConsult", verifyToken,  ApiControllerAdmin.consultUser)
router.get('/editUser/:id', verifyToken, ApiControllerAdmin.editIndex)
router.get("/todosUsuarios", ApiControllerAdmin.allUsers);
router.get("/usuariosPedidos/:funcao", ApiControllerAdmin.usuariosPedidos);



router.post("/login", ApiControllerAdmin.confirmLogin);
router.post("/edit/:id", verifyToken, ApiControllerAdmin.editUser);
router.post("/novoUser", verifyToken, ApiControllerAdmin.addUser);
router.post("/todosUsuariosPedido", ApiControllerAdmin.todosUsuariosPedido);


// Distribbuidores
router.post("/novoUsuarioParaDistribuidor", ApiControllerAdmin.novoUsuarioParaDistribuidor);

// Vendedores
router.post("/novoUsuarioParaVendedores", ApiControllerAdmin.novoUsuarioParaVendedores);





module.exports = router