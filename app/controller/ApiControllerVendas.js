const axios = require('axios')
const cache = require('../configs/cache')

// Base da URL
const urls = "http://localhost:200/pagamentos/"

// Variáveis Globais
let vendasList  = [];

class ApiControllerPagamentos {
    vendasTotais( req, res ){
        let id_gerente = cache.get('id_gerente');
        let vendasList = 0;

        if( id_gerente != null && id_gerente != ''){
            axios.get(`${urls}todosPagamentos`)
                .then(resp => {
                    let data = resp.data;
                    data.forEach( vendas => {
                        if(vendas.status == 'Concluido'){
                            vendasList = vendasList + vendas.valor
                        }
                    });
                    res.json(vendasList);
                })
                .catch(err => {
                    console.log(err);
                    res.json(false);
                })
        }
    }
}

module.exports = new ApiControllerPagamentos