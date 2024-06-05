const axios = require('axios')


// Base da URL
const urls = "http://localhost:200/dividas/"

// Variáveis Globais


class ApiControllerDividas {
    dividasTotais(req, res) {
        let id_User = req.query.IdUsuario

        axios.get(`${urls}todasDividas?IdUser=${id_User}`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    };

    adicionarDivida(req, res) {
        console.log(req.body)
        let data = new Date;
        let mes = data.getMonth() + 1;


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
                    res.redirect('/admin/dividas');
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    };

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
                res.redirect('/admin/dividas');
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })

    };

    deletarDividaDistribuidor(req, res) {
        const id = req.params.id;
        const idCripted = req.query.user;

        axios.post(`${urls}deletarDividas`, {id})
            .then(resp => {
                res.redirect(`/distribuidor/dividasGerais?user=${idCripted}`);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })

    };

    deletarDividaVendedor(req, res) {
        let divida = req.params.id;
        const idCripted = req.query.user;

        axios.post(`${urls}deletarDividas`, {
            id: divida
        })
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
            id: req.body.id,
            nome: req.body.nomeDivida,
            descricao: req.body.descricaoDivida,
            valor: parseFloat(req.body.valorDivida.replace('R$', '').replace(',', '.')),
            data: req.body.dataDivida,
            hora: req.body.horaDivida,
        };

        console.log(nova_divida)

        axios.post(`${urls}editDividas`, nova_divida)
            .then((result) => {
                console.log('Produto editado com sucesso!');
                // produtosList = []
                res.redirect('/admin/dividas');
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
            valor: parseFloat(req.body.valorDivida.replace('R$', '').replace(',', '.')),
            data: req.body.dataDivida,
            hora: req.body.horaDivida,
        };

        console.log(nova_divida)

        axios.post(`${urls}editDividas`, nova_divida)
            .then((result) => {
                console.log('Produto editado com sucesso!');
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
            hora: req.body.horaDivida,
        };

        console.log(nova_divida)

        axios.post(`${urls}editDividas`, nova_divida)
            .then((result) => {
                console.log('Produto editado com sucesso!');
                res.redirect(`/vendedores/dividasGeraisVendedor?user=${idCripted}`);
            }).catch((err) => {
                console.log(err);
            });
    }

    editarDividaForm(req, res) {
        let id = req.params.id;
        console.log(id)
        res.render('admin/financeiro/dividas/editarDivida', { id });
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
                res.json(result.data);
            }).catch((err) => {
                console.log(err);
            });

    }
}

module.exports = new ApiControllerDividas