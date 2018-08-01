var express = require('express');
var router = express.Router();
const pug = require('pug')
const request = require('request')
const parser = require('xml2json')
const service_key = '0%2Bb2RqxeIJdNC51p8yGvERJvRiloEfrrDvsuQHkMHWFHd4pVI%2BsGM3Or5CXI6e3csklzLGGepCiGfjhoJgNb%2Fg%3D%3D'
const url = `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getUnityAirEnvrnIdexSnstiveAboveMsrstnList?ServiceKey=${service_key}`

request({
  url: url,
  method: 'GET'
}, (error, response, xml) => {
  const json = JSON.parse(parser.toJson(xml))
  const item = json.response.body.items.item
  console.table(item)
  const addrs = item.map(i => i.addr)
  const template = `
ul
  each addr in addrs
    li= addr
  `
  const html = pug.render(template, {
    addrs: addrs
  })
  console.log(html)

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Express',
      data:html
    });
  });
});



module.exports = router;