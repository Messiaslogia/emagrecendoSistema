const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const AdminController = require("../controller/AdminController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/'); // Diretório onde a imagem será armazenada
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Nome do arquivo
    }
});

const upload = multer({ storage: storage });
/* GET users listing. */
// router.get('/financeiro', AdminController.financeiroIndex);
router.get('/produtos', AdminController.produtoIndex);
router.get('/pedidos', AdminController.pedidosIndex);
router.get('/usuarios', AdminController.usuariosIndex);
router.get('/adicionarUsuario', AdminController.adicionarUsuario)
router.get('/adicionarProduto', AdminController.adicionarProduto)

// Recursos Admin
router.post('/adicionarNovoProduto', upload.single('imagemProduto'), AdminController.adicionarNovoProduto);
router.post('/financeiro', AdminController.financeiroIndex)

module.exports = router;
