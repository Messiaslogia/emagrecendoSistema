const express = require('express');
const multer = require('multer'); // Para lidar com uploads de arquivos
const router = express.Router();
const AdminController = require("../controller/AdminController")

// Configuração do multer para lidar com o upload da imagem
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Especifique o diretório onde deseja salvar a imagem
        cb(null, '../../images/products');
    },
    filename: function (req, file, cb) {
        // Gere um nome de arquivo único para a imagem
        cb(null, Date.now() + '-' + file.originalname);
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
router.post('/adicionarNovoProduto',   AdminController.adicionarNovoProduto)

router.post('/financeiro', AdminController.financeiroIndex)

module.exports = router;
