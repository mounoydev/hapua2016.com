var express = require('express');
var router = express.Router();
var url=require('../repo/weatherapiconf');
var api=require('../repo/weatherapi');

var weatherapi=new api();

/* GET weather page. */
router.get('/', function(req, res, next) {

    getweather([url.api.curl,url.api.furl], function (data) {

        res.render('waether', {title: 'weather',weatherdata:data});

    });

});

router.get('/map', function (req, res, next) {

    res.render('mapweatherview',{});

});


function getweather(urls,callback){

    var docweather={};

    weatherapi.getcurenweather(urls[0], function (cdata) {

        docweather.cw=cdata;

        weatherapi.getcurenforecast(urls[1], function (cfdata) {

            docweather.cfw=cfdata;

            weatherapi.getforcastweather(urls[1], function (fdata) {

                docweather.fw=fdata;
                callback(docweather);
            });

        });

    });

}


module.exports = router;