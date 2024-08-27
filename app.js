const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configss
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Cache-Control Headers
// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store');
//   res.setHeader('Pragma', 'no-cache');
//   res.setHeader('Expires', '0');
//   next();
// });


// Controllers
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const distribuidorRouter = require('./routes/distribuidor');
const produtosRouter = require('./routes/apiProdutos');
const vendedores = require('./routes/vendedores');
const alertas = require('./routes/alertas');



// APIS Controllers
const apiRouter = require('./routes/apiUser');
const apiPedidos = require('./routes/apiPedidos');
const apiPagamentos = require('./routes/apiPagamentos');
const apiDividas = require('./routes/apiDividas');
const apiFinanceiro = require('./routes/apiFinanceiro');
const apiBrindes = require('./routes/apiBrindes');
const apiMateriais = require('./routes/apiMateriais');



// Rotas
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/distribuidor', distribuidorRouter);
app.use('/vendedores', vendedores);
app.use('/alertas', alertas);


// API ROTAS
app.use('/api', apiRouter);
app.use('/apiDividas', apiDividas);
app.use('/apiPedidos', apiPedidos);
app.use('/apiProdutos', produtosRouter);
app.use('/apiPagamentos', apiPagamentos);
app.use('/apiFinanceiro', apiFinanceiro)
app.use('/apiBrindes', apiBrindes);
app.use('/apiMateriais', apiMateriais);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
