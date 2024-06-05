const axios = require('axios');
const cache = require('../configs/cache');

// Base da URL
const urls = "http://localhost:200/financeiro/"

class ApiControllerFinanceiro {
    getTodosRelatorios(req, res) {
        axios.get(`${urls}todosRelatorios`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    getInfoMensais(req, res) {
        axios.get(`${urls}relatorioMensal`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    getInfoSemanais(req, res) {
        axios.get(`${urls}relatorioSemanal`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })
    }

    consultandorelatorio(req, res) {
        let numeracao = req.params.numero;
        axios.get(`${urls}consultRelatorio/${numeracao}`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    // DEVEDORES
    todosDevedores(req, res) {
        axios.get(`${urls}todosDevedores`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    todasEntregas(req, res) {
        axios.get(`${urls}todasEntregas`)
            .then(resp => {
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err)
            })
    }
};

module.exports = new ApiControllerFinanceiro 