const osmosis = require('osmosis');
const fsp = require('fs-promise');

const raw = require('./map-data');

const hikeData = [];
for (let i = 0; i < 200; i++) {
  hikeData.push(getHikeData(i));
}

function getHikeData(i) {
  let url = raw.markers[i].url;
  osmosis
    .get('http://www.oregonhikers.org/field_guide/Buck_Peak_Hike') //url
    .find('h1')
    .set('name')
    .find('#mw-content-text ul:first')
    .set({
      'location': ['li'],
    })
    .data(function (data) {
      const obj = {};
      for (var i = 0; i < data.location.length; i++) {
        var split = data.location[i].split(':');
        obj[split[0].trim()] = split[1].trim();
      }
      data.location = obj;
      return fsp.writeFile('hike-data.json', JSON.stringify(data), 'utf-8');
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log);

}