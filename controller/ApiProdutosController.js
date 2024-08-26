const axios = require('axios');
const cache = require('../configs/cache');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Base da URL
const urls = "https://apiemagrecendo.com/produtos/";

// Variáveis Globais
let produtosList = [];

class ProductController {
    addProduto(req, res) {
        try {            
            let novo_produto = {
                nome: req.body.nomeProduto,
                descricao: req.body.descricaoProduto,
                quantidade: req.body.quantidadeProduto,
                preco: req.body.precoProduto.replace(' ', '').replace('R$', '').replace(',', '.'),
                precoDistribuidor: req.body.precoProdutoDistribuidor.replace(' ', '').replace('R$', '').replace(',', '.'),
                precoRepresentante: req.body.precoProdutoRepresentante.replace(' ', '').replace('R$', '').replace(',', '.'),
                precoVendedor: req.body.precoProdutoVendedor.replace(' ', '').replace('R$', '').replace(',', '.'),
                precoDeCusto: req.body.precoCusto.replace(' ', '').replace('R$', '').replace(',', '.'),
                img: req.file ? req.file.path : '',
                categoria: 1
            };
                axios.post(`${urls}adicionarProdutos`, novo_produto)
                    .then(resp => {
                        axios.post(`${urls}consultarProdutos`, {
                            id: resp.data
                        })
                            .then(resp => {
                                res.redirect(`/admin/produtos?user=${req.Id_User}`);
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => {
                        console.log(err);
                    });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao adicionar produto.');
        }
    }

    dellProduto(req, res) {
        let id_produto = req.params.id;

            axios.post(`${urls}deletarProdutos`, {
                id: id_produto
            })
                .then(resp => {
                    res.redirect(`/admin/produtos?user=${req.Id_User}`);
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                });
    }

    allProdutos(req, res) {
        axios.get(`${urls}todosProdutos`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            });
    }

    todosProdutos(req, res) {
        axios.get(`${urls}todosProdutosForm`)
            .then(resp => {
                let data = resp.data;
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            });
    }

    todosProdutosBrindes(req, res){
        axios.get(`${urls}todosProdutosBrindes`)
            .then(resp =>{
                res.json(resp.data);
            })
            .catch(err =>{
                console.error('Erro ao buscar produtos brindes:', err.message);

                const statusCode = err.response ? err.response.status : 500;
                const errorMessage = err.response && err.response.data ? err.response.data.message : 'Ocorreu um erro ao processar sua solicitação.';

                res.status(statusCode).json({ error: errorMessage });
            })
    }

    todosProdutosMateriais(req, res) {
        axios.get(`${urls}todosProdutosMateriais`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.error('Erro ao buscar produtos materiais:', err.message);

                const statusCode = err.response ? err.response.status : 500;
                const errorMessage = err.response && err.response.data ? err.response.data.message : 'Ocorreu um erro ao processar sua solicitação.';

                res.status(statusCode).json({ error: errorMessage });
            })
    }

    editIndex(req, res) {
        let id = req.params.id;
        res.render('admin/produtos/editarProduto', { id, Id_User: req.Id_User });
    }

    editProdutos(req, res) {
        let novo_produto = {
            id: req.params.id,
            nome: req.body.nomeProduto,
            descricao: req.body.descricaoProduto,
            quantidade: req.body.quantidadeProduto,
            preco: req.body.precoProduto.replace(' ', '').replace('R$', '').replace(',', '.'),
            preco_distribuidor: req.body.precoProdutoDistribuidor.replace(' ', '').replace('R$', '').replace(',', '.'),
            preco_revenda: req.body.precoProdutoRepresentante.replace(' ', '').replace('R$', '').replace(',', '.'),
            preco_vendedor: req.body.precoProdutoVendedor.replace(' ', '').replace('R$', '').replace(',', '.'),
            preco_custo: req.body.precoCusto.replace(' ', '').replace('R$', '').replace(',', '.'),
            categoria: req.body.categoria,
            img: req.file ? req.file.path : req.body.imagemAtual
        };



        // Verifica se uma nova imagem foi enviada
        if (req.file) {
            novo_produto.img = 'images/produtos/' + req.file.filename; // Define o novo caminho da imagem

            // Remove a antiga imagem se for diferente da nova
            if (req.body.imagemAtual && fs.existsSync('public' + req.body.imagemAtual)) {
                fs.unlinkSync('public' + req.body.imagemAtual); // Removendo a imagem antiga do servidor
            }
        };

        axios.post(`${urls}editarProdutos`, novo_produto)
            .then(result => {
                console.log('Produto editado com sucesso!');
                res.redirect(`/admin/produtos?user=${req.Id_User}`);
            })
            .catch(err => {
                console.log(err);
            });
    }

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

    valorTotalProdutos(req, res) {
        axios.get(`${urls}valorTotalEstoque`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            });
    }

    valorTotalBrindes(req, res) {
        axios.get(`${urls}valorTotalEstoqueBrindes`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            });
    }

    valorTotalMateriais(req, res) {
        let id_gerente = cache.get('id_gerente');

        axios.get(`${urls}valorTotalMateriais`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            });
    }

    estoqueTotal(req, res) {
        let id_gerente = cache.get('id_gerente');

        axios.get(`${urls}estoqueTotal`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            });
    }

    todoEstoqueBrindes(req, res){
        axios.get(`${urls}estoqueTotalBrindes`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    todoEstoqueMateriais(req, res) {
        axios.get(`${urls}estoqueTotalMateriais`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json("false");
            })
    }

    consultProduto(req, res) {
        let id_produto = req.params.id;

        axios.post(`${urls}infoProduto`, {
            id: id_produto
        })
            .then(result => {
                res.json(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = new ProductController();
