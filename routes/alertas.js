const express = require('express');
const router = express.Router();
const verifyToken  = require("../controller/token");
const Alertas_Controller = require("../controller/ApiAlertaController");

router.get('/alertasGeraisAdmin', verifyToken, Alertas_Controller.consultandoAlertasAdmin);
router.get('/dellAlertas', verifyToken, Alertas_Controller.dellAlertaAdmin);


module.exports = router