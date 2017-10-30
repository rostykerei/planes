let airlines = require('./l1.json');
let l2 = require('./l2.json');

for (let icao in airlines) {

    let callsign = l2.hasOwnProperty(icao) ? l2[icao].callsign : null;
    console.log(icao + " " + callsign);
}