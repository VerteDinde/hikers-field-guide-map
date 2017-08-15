const osmosis = require('osmosis');
const fsp = require('fs-promise');

osmosis
  .get('http://www.oregonhikers.org/field_guide/Buck_Peak_Hike')
  .find('h1')
  .set('name')
  .find('#mw-content-text ul:first')
  .set({
    'location-data': ['li'],
  })
  .data(function (data) {
    // let formatted = data.title.map(location => {
    //   return location.split(':');
    // });
    return fsp.writeFile('hike-data.json', JSON.stringify(data), 'utf-8');
  })
  .log(console.log)
  .error(console.log)
  .debug(console.log);