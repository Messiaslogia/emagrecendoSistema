const axios = require('axios')
const cache = require('../configs/cache');


// Base da URL

const urls = "https://apiemagrecendo.com/dividas/"


class ApiControllerDividas {
    dividasTotais(req, res) {
        let id_User = cache.get(`${req.Id_User}`)
        axios.get(`${urls}todasDividas?IdUser=${id_User}`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    };

    dividasAdmin(req, res) {
        let id_User = cache.get(`${req.Id_User}`);
        axios.get(`${urls}todasDividasAdmin?IdUser=${id_User}`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "Erro ao obter dados das dívidas." });
            });
    }

    adicionarDivida(req, res) {
        let data = new Date;
        let mes = data.getMonth() + 1;

        try {
            let novaDivida = {
                nome: req.body.nomeDivida,
                id_user: cache.get(req.Id_User),
                descricao: req.body.descricaoDivida,
                valor: parseFloat(req.body.valorDivida.replace('R$', '').replace(',', '.')),
                data: req.body.dataDivida,
                hora: req.body.horaDivida,
                mes: mes
            }

            console.log(novaDivida.id_user)

            axios.post(`${urls}novaDivida`, novaDivida)
                .then(resp => {
                    res.redirect(`/admin/dividas?user=${req.Id_User}`);
                })
                .catch(err => console.log(err))

        } catch (error) {
            console.log(error)
        }
    };

    addNovaDivida(req, res){

        try {
            let novoPedido = {
                id_user: cache.get(req.Id_User),
                tipo: req.body.tipo,
                nome: req.body.nome,
                descricao: req.body.descricao,
                valor: req.body.valor,
                data_inicio: req.body.data_inicio,
                num_parcelas: req.body.num_parcelas
            }

            
            axios.post(`${urls}novaDividaAdmin`, novoPedido)
                .then(resp => {
                    res.redirect(`/admin/dividas?user=${req.Id_User}`);
                })
                .catch(err =>{
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
        
    }

    adicionarDividaVendedor(req, res) {
        let data = new Date;
        let mes = data.getMonth() + 1;
        const idCripted = req.query.user


        try {
            let novaDivida = {
                nome: req.body.nomeDivida,
                id_user: req.body.idUser,
                descricao: req.body.descricaoDivida,
                valor: parseFloat(req.body.valorDivida.replace('R$', '').replace(',', '.')),
                data: req.body.dataDivida,
                hora: req.body.horaDivida,
                mes: mes
            }



            axios.post(`${urls}novaDivida`, novaDivida)
                .then(resp => {
                    res.redirect(`/vendedores/dividasGeraisVendedor?user=${idCripted}`);
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    };

    adicionarDividaDistribuidor(req, res) {
        let data = new Date;
        let mes = data.getMonth() + 1;
        const idCripted = req.query.user

        try {
            let novaDivida = {
                nome: req.body.nomeDivida,
                id_user: req.body.idUser,
                descricao: req.body.descricaoDivida,
                valor: parseFloat(req.body.valorDivida.replace('R$', '').replace(',', '.')),
                data: req.body.dataDivida,
                hora: req.body.horaDivida,
                mes: mes
            }



            axios.post(`${urls}novaDivida`, novaDivida)
                .then(resp => {
                    res.redirect(`/distribuidor/dividasGerais?user=${idCripted}`);
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    };

    deletarDivida(req, res) {
        let divida = req.params.id;
        axios.post(`${urls}deletarDividas`, {
            id: divida
        })
            .then(resp => {
                res.redirect(`/admin/dividas?user=${req.Id_User}`);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })

    };

    deletarDividaDistribuidor(req, res) {
        const id = req.params.id;
        const idCripted = req.query.user;

        axios.post(`${urls}deletarDividasOutrosUsuarios`, {id})
            .then(resp => {
                res.redirect(`/distribuidor/dividasGerais?user=${idCripted}`);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })

    };

    deletarDividaVendedor(req, res) {
        let id = req.params.id;
        const idCripted = req.query.user;

        axios.post(`${urls}deletarDividasOutrosUsuarios`, {id})
            .then(resp => {
                res.redirect(`/vendedores/dividasGeraisVendedor?user=${idCripted}`);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })

    };

    editarDivida(req, res) {
        
        let nova_divida = {
            id: req.body.id_divida,
            tipo: req.body.tipo,
            nome: req.body.nome,
            descricao: req.body.descricao,
            valor: parseFloat(req.body.valor.replace('R$', '').replace(',', '.')),
            data: req.body.data_inicio
        };

        axios.post(`${urls}editDividas`, nova_divida)
            .then((result) => {
                console.log('Produto editado com sucesso!');
                // produtosList = []
                res.redirect(`/admin/dividas?user=${req.Id_User}`);
            }).catch((err) => {
                console.log(err);
            });
    }

    editarDividaDistribuidor(req, res) {
        const idCripted = req.query.user;

        const nova_divida = {
            id: req.body.id,
            nome: req.body.nomeDivida,
            descricao: req.body.descricaoDivida,
            valor: parseFloat(req.body.valorDivida.replace('R$', '').replace(' ', '').replace(',', '.')),
            data: req.body.dataDivida,
        };

        axios.post(`${urls}editDividasOutrosUsuarios`, nova_divida)
            .then((result) => {
                console.log('Divida editado com sucesso!');
                // produtosList = []
                res.redirect(`/distribuidor/dividasGerais?user=${idCripted}`);
            }).catch((err) => {
                console.log(err);
            });
    }

    editarDividaVendedor(req, res) {
        const idCripted = req.query.user;

        let nova_divida = {
            id: req.body.id,
            nome: req.body.nomeDivida,
            descricao: req.body.descricaoDivida,
            valor: parseFloat(req.body.valorDivida.replace('R$', '').replace(',', '.')),
            data: req.body.dataDivida,
        };

        axios.post(`${urls}editDividasOutrosUsuarios`, nova_divida)
            .then((result) => {
                console.log('Divida editado com sucesso!');
                res.redirect(`/vendedores/dividasGeraisVendedor?user=${idCripted}`);
            }).catch((err) => {
                console.log(err);
            });
    }

    editarDividaForm(req, res) {
        let id = req.params.id;
        // console.log(req.Id_User);
        // console.log(id);
        // return;
        res.render('admin/financeiro/dividas/editarDivida', { id: id, idUser: req.Id_User });
    };

    editarDividaFormDistribuidor(req, res) {
        let id = req.params.id;
        const idCripted = req.query.user;

        res.render('distribuidores/vendas/registrarVenda/editarVenda', { id, idCripted });
    };

    editarDividaFormVendedor(req, res) {
        let id = req.params.id;
        const idCripted = req.query.user;

        res.render('vendedores/vendas/dividasGerais/editarVenda', { id, idCripted });
    };

    consultarDivida(req, res) {
        let id_divida = req.params.id;
        

        axios.post(`${urls}consultarDividas`, {
            id: id_divida
        })
            .then((result) => {
                // console.log(result.data);
                // return
                res.json(result.data);
            }).catch((err) => {
                console.log(err);
            });

    }
}

module.exports = new ApiControllerDividas