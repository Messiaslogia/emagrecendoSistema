const express = require('express');
const router = express.Router();
const ApiControllerAdmin = require("../controller/ApiControllerUsuarios")

router.get("/todosUsuarios", ApiControllerAdmin.allUsers);
router.get("/dellUser/:id", ApiControllerAdmin.dellUser);
router.get("/clientesTotais", ApiControllerAdmin.clientesTotais);

router.post("/login", ApiControllerAdmin.confirmLogin);
router.post("/novoUser", ApiControllerAdmin.addUser);

module.exports = router