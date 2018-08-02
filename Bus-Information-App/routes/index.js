var express = require('express');
var router = express.Router();
var request = require('request');
const pug = require('pug');
const parser = require('xml2json');

var url = 'http://openapi.its.ulsan.kr/UlsanAPI/RouteInfo.xo';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=서비스키'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 기본1 */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 기본10 */


request({
  url: url + queryParams,
  method: 'GET'
}, function (error, response, body) {
  //console.log('Status', response.statusCode);
  //console.log('Headers', JSON.stringify(response.headers));
  //console.log('Reponse received', body);

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  });
});



module.exports = router;