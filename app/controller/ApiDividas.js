const axios = require('axios')
const cache = require('../configs/cache')

// Base da URL
const urls = "http://localhost:200/dividas/"

// Variáveis Globais
let dividaList = [];

class ApiControllerDividas{
    dividasTotais( req, res ){
        let id_gerente = cache.get('id_gerente');
        let dividaTotal = 0;

        if( id_gerente != null && id_gerente != ''){
            axios.get(`${urls}todasDividas`)
                .then(resp => {
                    let data = resp.data;
                    data.forEach( divida => {
                        dividaTotal = dividaTotal + divida.valor
                    });
                    res.json(dividaTotal);
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
        }
    }
}

module.exports = new ApiControllerDividas