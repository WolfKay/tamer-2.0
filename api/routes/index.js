var express = require('express');
const authRoutes = express.Router();

/* GET home page. */
authRoutes.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;