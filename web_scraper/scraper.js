const scrapeIt = require('scrape-it');
const fsp = require('fs-promise');
const data = require('./map-data');

const hikeData = [];
for (let i = 0; i < 200; i++) {
  hikeData.push(getHikeData(i));
}

// console.log(data.markers[1].url);
// data is drawing from the right place, but scrape-it not grabbing any elements
function getHikeData(i) {
  return scrapeIt(data.markers[1].url, {
    markers: {
      listItem: {
        selector: '#mw-content-text',
        closest: 'ul'
      },
      data: {
        hikeType: {
          selector: 'li',
          eq: 3
        },
        // distance: 'li',
        // highPoint: null,
        // elevationGain: null,
        // difficulty: null,
        // seasons: null,
        // familyFriendly: null,
        // backpackable: null,
        // crowded: null
      }
    }
  });
}

Promise.all(hikeData)
  .then(values => {
    const flattened = values.reduce((acc, curr) => {
      return acc.concat(curr.markers);
    }, []);
    fsp.writeFile('hike-data.json', JSON.stringify(flattened), 'utf-8')
      .then(contents => {
        console.log('done!');
      });
  });