var express = require('express');
var router = express.Router();
var request = require('request');
const pug = require('pug');
const parser = require('xml2json');
const service_key = '0%2Bb2RqxeIJdNC51p8yGvERJvRiloEfrrDvsuQHkMHWFHd4pVI%2BsGM3Or5CXI6e3csklzLGGepCiGfjhoJgNb%2Fg%3D%3D'
const url = `http://openapi.its.ulsan.kr/UlsanAPI/getBusArrivalInfo.xo?stopid=196040122&pageNo=1&numOfRows=10&serviceKey=${service_key}`

request({
  url: url,
  method: 'GET'
}, (error, response, xml) => {
  const json = JSON.parse(parser.toJson(xml))
  console.log(json);
  const item = json.tableInfo.list.row
  console.table(item)
  var vehicleno = item.map(i => i.VEHICLENO);
  var rnum = item.map(i => i.RNUM);
  var routenm =item.map(i=>i.ROUTENM);
  //   const VEHICLENOS = item.map(i => i.VEHICLENO)
  //   const template = `
  // ul
  //   each VEHICLENO in VEHICLENOS
  //     li= VEHICLENO
  //   `
  // const html = pug.render(template, {
  //   VEHICLENOS: VEHICLENOS
  // })
  // console.log(html)

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Express',
      vehicleno: vehicleno,
      howmanybus: item.length,
      rnum: rnum,
      routenm: routenm
      // presentstopnm: presentstopnm,
      // stopnm: stopnm,
      // stopid: stopid,
      // arrivaltime: arrivaltime,
      // prevstopcnt: prevstopcnt
    });
  });
});


module.exports = router;