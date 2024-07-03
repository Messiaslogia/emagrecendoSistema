var cache = require('../configs/cache');

class LoginController {

    index(req, res) {
        res.render('login/login');
    }

    login(req, res) {
        res.render('admin/index', {Id_User: req.Id_User});
    }

    distribuidor(req, res) {
        var idDoDistribuidor = cache.get('id_distribuidor')
        res.render('distribuidores/index',{idDoDistribuidor})
    }

    vendedor(req, res) {
        var idDoVendedor = cache.get('id_vendedor')
        res.render('vendedores/index', {idDoVendedor})
    }
}

module.exports = new LoginController()