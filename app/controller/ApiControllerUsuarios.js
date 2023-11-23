const axios = require('axios')
const cache = require('../configs/cache')

// Base da URL
const urls = "http://localhost:200/users/"

// Controller
class ApiControllerUsuarios{
    addUser( req, res ){

    }

    confirmLogin( req, res ){
        let user = {
            email: req.body.email,
            senha: req.body.senha
        };

        axios.post(`${urls}login`, {
            email: `${user.email}`,
            password: `${user.senha}`
        })
        .then(resp => {
            switch(resp.data.funcao){
                case 'Gerente':
                    cache.set('id_gerente', `${resp.data.id_usuario}`)
                    return res.redirect(307, '/admin/financeiro');
                
                case 'Afiliado':
                    cache.set('id_afiliado', `${resp.data.id_usuario}`);
                    return  console.log("Corno");

                case 'Distribuidor':
                    cache.set('id_distribuidor', `${resp.data.id_usuario}`);
                    return  console.log('OK');

                case 'Vendedor':
                    cache.set('id_vendedor', `${resp.data.id_usuario}`);
                    return  console.log("Outro Corno");

                case 'Representante':
                    cache.set('id_representante', `${resp.data.id_usuario}`);
                    return  console.log("Outro corno 2");

                default:
                    return  console.log("Corno não encontrado");
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    dellUser( req, res ){

    }
}



module.exports = new ApiControllerUsuarios()