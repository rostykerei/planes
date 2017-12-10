import {MapFlight} from "../model/map-flight";

export class DashboardUtils {

  static updatePosition(f: MapFlight, deltaTime: number) {
    let dist = f.speed * deltaTime / 3600000;

    let distRatio = dist / 3440;
    let distRatioSin = Math.sin(distRatio);
    let distRatioCos = Math.cos(distRatio);

    let startLatRad = f.lat * Math.PI / 180;
    let startLonRad = f.lon * Math.PI / 180;

    let headingRad = f.heading * Math.PI / 180;

    let startLatCos = Math.cos(startLatRad);
    let startLatSin = Math.sin(startLatRad);

    let endLatRads = Math.asin((startLatSin * distRatioCos) + (startLatCos * distRatioSin * Math.cos(headingRad)));

    let endLonRads = startLonRad
      + Math.atan2(Math.sin(headingRad) * distRatioSin * startLatCos,
        distRatioCos - startLatSin * Math.sin(endLatRads));

    f.lat = endLatRads * 180 / Math.PI;
    f.lon = endLonRads * 180 / Math.PI;

    return f;
  }

  static formatPopup(f: MapFlight): String {
    let s = '<b>';
    s += f.callsign ? f.callsign : 'UNKNOWN';
    s += '</b>';

    if (f.altitude || f.speed) {
      s += '<br/>';

      if (f.altitude) {
        s += 'FL';

        if (f.altitude < 10000) s += '0';

        s += Math.round(f.altitude / 100);

        if (f.verticalRate) {
          if (f.verticalRate > 0) {
            s += '&uarr;'
          }
          else if (f.verticalRate < 0) {
            s += '&darr;'
          }
        }

        s += '&emsp;';
      }

      if (f.speed) {
        s += '<span style="float: right;">';
        s += f.speed + 'kt';
        s += '</span>';
      }


    }

    if (f.type || f.heading) {
      s += '<br/>';

      if (f.type) s += f.type + '&emsp;';

      if (f.heading) {
        s += '<span style="float: right;">';
        if (f.heading < 100) s += '0';
        s += f.heading + '&deg;';
        s += '</span>';
      }

    }

    if (f.from || f.to) {
      s += '<br/><span style="white-space: nowrap;">';
      s += f.from || '????';
      s += ' &rarr; ';
      s += f.to || '????';
      s += '</span>';
    }

    return s;
  }
}
