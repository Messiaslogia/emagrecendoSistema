class LoginController {

    index(req, res) {
        res.render('login/login');
    }

    login(req, res) {
        res.render('admin/index');

    }

    distribuidor(req, res) {
        res.render('distribuidores/index')
    }

    vendedor(req, res) {
        res.render('vendedores/index')
    }
}

module.exports = new LoginController()