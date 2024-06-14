const multer = require('multer');
const path = require('path');
const axios = require('axios');


// Base da URL
const urls = "http://localhost:200/brindes/";

class ControllerBrindes {

    uploadImagemProduto() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/images/produtos');
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });

        const upload = multer({ storage: storage }).single('imagemProduto');

        return function (req, res, next) {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({ message: 'Erro durante o upload.' });
                } else if (err) {
                    return res.status(500).json({ message: 'Erro desconhecido durante o upload.' });
                }
                next();
            });
        };
    }

    indexAdicionarBrinde(req, res){
        res.render('admin/produtos/brindes/adicionarBrinde');
    }

    addBrinde(req, res){
        try {       
            
            let novo_produto = {
                nome: req.body.nomeProduto,
                descricao: req.body.descricaoProduto,
                quantidade: req.body.quantidadeProduto,
                preco: req.body.precoProduto.replace(' ', '').replace('R$', '').replace(',', '.'),
                img: req.file ? req.file.path : '',
                categoria: 2
            };

            axios.post(`${urls}adicionarBrindes`, novo_produto)
                .then(resp => {
                    res.redirect('/admin/produtos/brindes');
                })
                .catch(err => {
                    console.log(err); 
                });


        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao adicionar produto.');
        }
    }

    indexEditBrinde(req, res){
        const idBrinde = req.params.idBrinde;
        res.render('admin/produtos/brindes/editarBrinde', {idBrinde});
    }   

    editBrinde(req, res){
        const novo_produto = {
            id: req.params.id,
            nome: req.body.nomeProduto,
            descricao: req.body.descricaoProduto,
            quantidade: req.body.quantidadeProduto,
            preco: req.body.precoProduto.replace(' ', '').replace('R$', '').replace(',', '.'),
            img: req.file ? req.file.path : req.body.imagemProduto,
            categoria: 2
        };

        // Verifica se uma nova imagem foi enviada
        if (req.file) {
            novo_produto.img = 'images/produtos/' + req.file.filename; // Define o novo caminho da imagem

            // Remove a antiga imagem se for diferente da nova
            if (req.body.imagemAtual && fs.existsSync('public' + req.body.imagemAtual)) {
                fs.unlinkSync('public' + req.body.imagemAtual); // Removendo a imagem antiga do servidor
            }
        }

        axios.post(`${urls}editarBrinde`, novo_produto)
            .then(result => {
                res.redirect('/admin/produtos/brindes');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = new ControllerBrindes()