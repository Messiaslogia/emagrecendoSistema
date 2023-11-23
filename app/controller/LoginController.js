class LoginController{

    index(req, res){
        res.render('login/login');
    }

    login(req, res){
        res.render('admin/index');
        // res.render('distribuidores/index');
        // res.render('vendedores/index');

    }
}

module.exports = new LoginController()