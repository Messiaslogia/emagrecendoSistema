const cache = require('../configs/cache');
const axios = require('axios');
const url_base = 'http://localhost:200/alertas'

class Alertas_Controller{

    consultandoAlertasAdmin( req, res ){
        const id = cache.get(req.Id_User);
        axios.get(`${url_base}/alertasAdmin?user=${id}`)
            .then((result) => {
                res.json(result.data);
            }).catch((err) => {
                res.json({ status: 511, menssage: 'Erro ao verificar alertas do usuário', error: err });
            });
    }

    dellAlertaAdmin( req, res ){
        const idAlerta = req.query.idAlerta;
        axios.get(`${url_base}/statusAlertaAdmin?idAlerta=${idAlerta}`)
            .then((result) => {
                res.json(result.data);
            }).catch((err) => {
                res.json({ status: 511, menssage: 'Erro ao verificar alertas do usuário', error: err });
            });
    }
}

module.exports = new Alertas_Controller