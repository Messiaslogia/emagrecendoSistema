const axios = require('axios')
const cache = require('../configs/cache')
const multer = require('multer');
const path = require('path');

// Base da URL
const urls = "http://localhost:200/produtos/"

// Variáveis Globais
let produtosList = [];

class ProductController {
    addProduto(req, res) {
        try {
            let id_gerente = cache.get('id_gerente');
            console.log(req.body)
            let novo_produto = {
                nome: req.body.nomeProduto,
                descricao: req.body.descricaoProduto,
                img: ``,
                quantidade: req.body.quantidadeProduto,
                preco: req.body.precoProduto.replace(' ', '').replace('R$', '').replace(',', '.'),
                precoRevenda: req.body.precoProdutoRevenda.replace(' ', '').replace('R$', '').replace(',', '.'),
                precoDistribuidor: req.body.precoProdutoDistribuidor.replace(' ', '').replace('R$', '').replace(',', '.'),
                data: req.body.dataProduto
            };


            if (id_gerente != null && id_gerente != '') {
                axios.post(`${urls}adicionarProdutos`, novo_produto)
                    .then(resp => {
                        axios.post(`${urls}consultarProdutos`, {
                            id: resp.data
                        })
                            .then(resp => {
                                // produtosList.push(resp.data[0]);
                                res.redirect('/admin/produtos');
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                return res.json(false)
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao adicionar produto.');
        }


    }

    dellProduto(req, res) {
        let id_gerente = cache.get('id_gerente');
        let id_produto = req.params.id;

        if (id_gerente != null && id_gerente != '') {
            axios.post(`${urls}deletarProdutos`, {
                id: id_produto
            })
                .then(resp => {
                    // let id = parseInt(id_produto);
                    // let listModificada = produtosList.filter(produto => produto.id_produto != id);
                    // produtosList = listModificada;
                    res.redirect('/admin/produtos');
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
        }
    }

    allProdutos(req, res) {
        let id_gerente = cache.get('id_gerente');

        axios.get(`${urls}todosProdutos`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    todosProdutos(req, res) {

        axios.get(`${urls}todosProdutosForm`)
            .then(resp => {
                let data = resp.data;
                // data.forEach(produto => produtosList.push(produto));
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    editIndex(req, res) {
        let id = req.params.id;
        res.render('admin/produtos/editarProduto', { id });
    }

    editProdutos(req, res) {
        let novo_produto = {
            id: req.params.id,
            nome: req.body.nomeProduto,
            descricao: req.body.descricaoProduto,
            quantidade: req.body.quantidadeProduto,
            preco: req.body.precoProduto.replace(' ', '').replace('R$', '').replace(',', '.'),
            preco_distribuidor: req.body.precoProdutoDistribuidor.replace(' ', '').replace('R$', '').replace(',', '.'),
            preco_revenda: req.body.precoProdutoRevenda.replace(' ', '').replace('R$', '').replace(',', '.'),
            data: req.body.dataProduto,
            hora: req.body.horaProduto
        };

        console.log(novo_produto)

        axios.post(`${urls}editarProdutos`, novo_produto)
            .then((result) => {
                console.log('Produto editado com sucesso!');
                // produtosList = []
                res.redirect('/admin/produtos');
            }).catch((err) => {
                console.log(err);
            });

    }

    uploadImagemProduto() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/images/produtos'); // Diretório onde a imagem será armazenada
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Nome do arquivo
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
        let id_gerente = cache.get('id_gerente');

        axios.get(`${urls}valorTotalEstoque`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })

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
            })

    }

    consultProduto(req, res) {
        let id_produto = req.params.id;

        axios.post(`${urls}infoProduto`, {
            id: id_produto
        })
            .then((result) => {
                res.json(result.data);
            }).catch((err) => {
                console.log(err);
            });
    }



}

module.exports = new ProductController