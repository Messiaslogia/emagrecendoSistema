const express = require('express');
const router = express.Router();
const ApiControllerUsuarios = require("../controller/ApiControllerUsuarios")

router.post("/login", ApiControllerUsuarios.confirmLogin)

module.exports = router