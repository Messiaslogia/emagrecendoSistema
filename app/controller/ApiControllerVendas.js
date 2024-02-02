const axios = require('axios')
const cache = require('../configs/cache')

// Base da URL
const urls = "http://localhost:200/pagamentos/"

// Variáveis Globais
let vendasList = [];

class ApiControllerPagamentos {
    vendasTotais(req, res) {
        let id_gerente = cache.get('id_gerente');
        let vendasList = 0;


        axios.get(`${urls}ganhosTotais`)
            .then(resp => {
                console.log(resp)
                res.json(resp.data);
            })
            .catch(err => {
                console.log(err);
                res.json(false);
            })

    }
}

module.exports = new ApiControllerPagamentos