const express = require('express');
const router = express.Router();
const ApiControllerAdmin = require("../controller/ApiControllerUsuarios")

router.get("/dellUser/:id", ApiControllerAdmin.dellUser);
router.get("/clientesTotais", ApiControllerAdmin.clientesTotais);
router.get("/userConsult/:id", ApiControllerAdmin.consultUser)
router.get("/todosUsuariosPedido", ApiControllerAdmin.todosUsuariosPedido);
router.get('/editUser/:id', ApiControllerAdmin.editIndex)

router.post("/login", ApiControllerAdmin.confirmLogin);
router.post("/edit/:id", ApiControllerAdmin.editUser);

router.post("/novoUser", ApiControllerAdmin.addUser);
router.post("/todosUsuarios", ApiControllerAdmin.allUsers);



module.exports = router