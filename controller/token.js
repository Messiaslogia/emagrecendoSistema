const cache = require('../configs/cache');
const express = require('express');


function verifyToken( req, res, next ){
    let key = cache.get(`${req.query.user}`);
    console.log(key);
    if(key != null || ''){
        req.Id_User = req.query.user;
        next();
    }else{
        res.redirect('/')
    }
}

module.exports = verifyToken