var cache = require('../configs/cache');

class LoginController {

    index(req, res) {
        res.render('login/login');
    }

    login(req, res) {
        res.render('admin/index');

    }

    distribuidor(req, res) {
        var idDoDistribuidor = cache.get('id_distribuidor')
        console.log(idDoDistribuidor)
        res.render('distribuidores/index',{idDoDistribuidor})
    }

    vendedor(req, res) {
        res.render('vendedores/index')
    }
}

module.exports = new LoginController()