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
            const imagemProduto = req.file
            let id_gerente = cache.get('id_gerente');

            let novo_produto = {
                nome: req.body.nomeProduto,
                descricao: req.body.descricaoProduto,
                img: ``,
                quantidade: req.body.quantidadeProduto,
                preco: req.body.precoProduto,
                data: req.body.dataProduto,
                hora: req.body.horaProduto
            };

            if (!imagemProduto || !novo_produto.nome ||
                !novo_produto.descricao ||
                !novo_produto.quantidade ||
                !novo_produto.preco ||
                !novo_produto.data ||
                !novo_produto.hora) {
                return res.status(400).send('Nenhuma imagem selecionada ou Campos inválidos.');
            } else {
                novo_produto.img = `${imagemProduto.destination}/${imagemProduto.filename}`
            }


            if (id_gerente != null && id_gerente != '') {
                axios.post(`${urls}adicionarProdutos`, novo_produto)
                    .then(resp => {
                        axios.post(`${urls}consultarProdutos`, {
                            id: resp.data
                        })
                            .then(resp => {
                                produtosList.push(resp.data[0]);
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
                    let id = parseInt(id_produto);
                    let listModificada = produtosList.filter(produto => produto.id_produto != id);
                    produtosList = listModificada;
                    res.redirect('/admin/produtos');
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
        }
    }

    allProdutos(req, res) {
        if (produtosList.length > 0) {
            res.json(produtosList)
        } else {
                axios.get(`${urls}todosProdutos`)
                    .then(resp => {
                        let data = resp.data;
                        data.forEach(produto => produtosList.push(produto));
                        res.json(data);
                    })
                    .catch(err => {
                        console.log(err);
                        res.json(false);
                    })
        }
    }

    editProdutos(req, res) {

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
        let valor = 0;

        if (id_gerente != null && id_gerente != '') {
            axios.get(`${urls}todosProdutos`)
                .then(resp => {
                    let data = resp.data;
                    data.forEach(produto => {
                        let valorDoProdutoTotal = produto.preco * produto.quantidade
                        valor = valor + valorDoProdutoTotal
                    });
                    res.json(valor);
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
        }
    }

    estoqueTotal(req, res) {
        let id_gerente = cache.get('id_gerente');
        let estoque = 0;

        if (id_gerente != null && id_gerente != '') {
            axios.get(`${urls}todosProdutos`)
                .then(resp => {
                    let data = resp.data;
                    data.forEach(produto => {
                        estoque = estoque + produto.quantidade
                    });
                    res.json(estoque);
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
        }
    }

}

module.exports = new ProductController