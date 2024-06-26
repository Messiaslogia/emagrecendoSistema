const express = require('express');
const router = express.Router();
const ApiControllerAdmin = require("../controller/ApiControllerUsuarios")

router.get("/dellUser/:id", ApiControllerAdmin.dellUser);
router.get("/clientesTotais", ApiControllerAdmin.clientesTotais);
router.get("/userConsult/:id", ApiControllerAdmin.consultUser)
router.get('/editUser/:id', ApiControllerAdmin.editIndex)
router.get("/todosUsuarios", ApiControllerAdmin.allUsers);
router.get("/usuariosPedidos/:funcao", ApiControllerAdmin.usuariosPedidos);



router.post("/login", ApiControllerAdmin.confirmLogin);
router.post("/edit/:id", ApiControllerAdmin.editUser);
router.post("/novoUser", ApiControllerAdmin.addUser);
router.post("/todosUsuariosPedido", ApiControllerAdmin.todosUsuariosPedido);


// Distribbuidores
router.post("/novoUsuarioParaDistribuidor", ApiControllerAdmin.novoUsuarioParaDistribuidor);

// Vendedores
router.post("/novoUsuarioParaVendedores", ApiControllerAdmin.novoUsuarioParaVendedores);





module.exports = router