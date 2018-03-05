import {MapFlight} from '../model/map-flight';

declare const google: any;

export class DashboardUtils {

  static readonly ICON_COLOR: String = 'orange';
  static readonly ICON_OPACITY: number = 0.8;

  static updatePosition(f: MapFlight, deltaTime: number): MapFlight {
    const dist = f.speed * deltaTime / 3600000;

    const distRatio = dist / 3440;
    const distRatioSin = Math.sin(distRatio);
    const distRatioCos = Math.cos(distRatio);

    const startLatRad = this.deg2rad(f.lat);
    const startLonRad = this.deg2rad(f.lon);

    const headingRad = this.deg2rad(f.heading);

    const startLatCos = Math.cos(startLatRad);
    const startLatSin = Math.sin(startLatRad);

    const endLatRads = Math.asin((startLatSin * distRatioCos) + (startLatCos * distRatioSin * Math.cos(headingRad)));

    const endLonRads = startLonRad
      + Math.atan2(Math.sin(headingRad) * distRatioSin * startLatCos,
        distRatioCos - startLatSin * Math.sin(endLatRads));

    f.lat = this.rad2deg(endLatRads);
    f.lon = this.rad2deg(endLonRads);

    return f;
  }

  static distance(lat: number, lon: number, f: MapFlight): number {
    const dLat = this.deg2rad(f.lat - lat);
    const dLon = this.deg2rad(f.lon - lon);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(this.deg2rad(lat)) * Math.cos(this.deg2rad(f.lat))
      * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return 3440 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  static deg2rad(deg: number): number {
    return deg * Math.PI / 180;
  }

  static rad2deg(rad: number): number {
    return rad * 180 / Math.PI;
  }

  static formatPopup(f: MapFlight): String {
    let fl = '', heading = '';

    if (f.altitude) {
      fl = f.altitude < 10000 ? 'FL0' : 'FL';
      fl += Math.round(f.altitude / 100);
      if (f.verticalRate && f.verticalRate !== 0) {
        fl += f.verticalRate > 0 ? '&uarr;' : '&darr;';
      }
    }

    let speed = f.speed ? f.speed + 'kt' : '';

    if (f.heading) {
      heading = f.heading < 100 ? (f.heading < 10 ? '00' : '0') : '';
      heading += f.heading + '&deg;';
    }

    return `<div class="map-popup">
        <b>${f.callsign || 'UNKNOWN'}</b>
        <span>${fl}</span>
        <span>${speed}</span>
        <span>${f.type || ''}</span>
        <span>${heading}</span>
        <span>${f.from || ''}</span>
        <span>${f.to || ''}</span>
    </div>`;
  }

  static getIcon(f: MapFlight): any {
    if (f.type) {
      switch (f.type) {
        case 'A388':
          return this.getIconA380(f);
        case 'A318':
        case 'A319':
        case 'A320':
        case 'A20N':
        case 'A321':
        case 'A21N':
        case 'A332':
        case 'A333':
          return this.getIconAirbus(f);
        case 'B772':
        case 'B77W':
        case 'B773':
        case 'B77L':
          return this.getIconB777(f);
      }
    }

    if (f.classification) {
      switch (f.classification) {
        case 'L2J':
          return this.getIconL2J(f);
        case 'L2T':
          return this.getIconL2T(f);
        case 'L4J':
          return this.getIconL4J(f);
      }

      if (f.classification.substring(0, 1) === 'H') {
        return this.getIconHeli(f);
      }
    }

    return this.getIconDefault(f);
  }

  static getIconAirbus(f: MapFlight): any {
    let scale = 0.4;

    if (f.type && (f.type.substring(0, 3) === 'A33' || f.type.substring(0, 3) === 'A33')) {
      scale = 0.5;
    }

    return {
      path: 'm 32,1 2,1 2,3 0,18 4,1 0,-4 3,0 0,5 17,6 0,3 -15,-2 -9,0 0,12 -2,6 7,3 0,2 -8,-1 -1,2 -1,-2 -8,1 0,-2 7,' +
      '-3 -2,-6 0,-12 -9,0 -15,2 0,-3 17,-6 0,-5 3,0 0,4 4,-1 0,-18 2,-3 2,-1z',
      anchor: new google.maps.Point(32, 28),
      scale: scale,
      fillColor: this.ICON_COLOR,
      fillOpacity: this.ICON_OPACITY,
      strokeWeight: 1,
      rotation: f.heading
    };
  }

  static getIconA380(f: MapFlight): any {
    return {
      path: 'm 32,59 -1,-4 -4,1 -7,3 -1,0 1,-3 1,-1 7,-6 2,-2 -1,-5 0,-9 -1,-2 -2,0 -6,2 -5,2 -5,2 -9,4 0,1 0,-3 1,-2 9,' +
      '-7 -1,-1 0,-4 1,-1 1,0 1,1 0,3 1,0 5,-4 0,-5 1,-1 1,0 1,1 0,3 6,-5 1,-2 0,-7 1,-5 1,-2 1,-1 1,1 1,2 1,5 0,7 1,2 6,' +
      '5 0,-3 1,-1 1,0 1,1 0,5 5,4 1,0 0,-3 1,-1 1,0 1,1 0,4 -1,1 9,7 1,2 0,3 0,-1 -9,-4 -5,-2 -5,-2 -6,-2 -2,0 -1,2 0,' +
      '9 -1,5 2,2 7,6 1,1 1,3 -1,0 -7,-3 -4,-1 -1,4 z',
      anchor: new google.maps.Point(32, 30),
      scale: 0.5,
      fillColor: this.ICON_COLOR,
      fillOpacity: this.ICON_OPACITY,
      strokeWeight: 1,
      rotation: f.heading
    };
  }

  static getIconB777(f: MapFlight): any {
    return {
      path: 'm 32,1 2,1 1,2 0,20 4,4 0,-4 3,0 0,4 -1,2 17,12 0,2 -16,-5 -7,0 0,13 -1,5 7,5 0,2 -8,-2 -1,2 -1,-2 -8,2 0,' +
      '-2 7,-5 -1,-5 0,-13 -7,0 -16,5 0,-2 17,-12 -1,-2 0,-4 3,0 0,4 4,-4 0,-20 1,-2 2,-1z',
      anchor: new google.maps.Point(32, 32),
      scale: 0.5,
      fillColor: this.ICON_COLOR,
      fillOpacity: this.ICON_OPACITY,
      strokeWeight: 1,
      rotation: f.heading
    };
  }

  static getIconL2J(f: MapFlight): any {
    let scale = 0.4;

    if (f.type && (f.type.substring(0, 3) === 'B76' || f.type.substring(0, 3) === 'B78')) {
      scale = 0.5;
    }

    return {
      path: 'm 32,61 -1,-1 -9,2 -2,1 0,-2 9,-6 1,-1 -1,-9 0,-11 -7,0 -1,1 0,-1 -3,1 -1,1 0,-1 -3,1 -9,3 -1,1 0,-2 1,' +
      '-2 17,-9 1,-1 -1,-2 0,-3 1,-1 2,0 1,1 0,3 3,-2 0,-13 1,-5 1,-3 1,-1 1,1 1,3 1,5 0,13 3,2 0,-3 1,-1 2,0 1,1 0,' +
      '3 -1,2 1,1 17,9 1,2 0,2 -1,-1 -9,-3 -3,-1 0,1 -1,-1 -3,-1 0,1 -1,-1 -7,0 0,11 -1,9 1,1 9,6 0,2 -2,-1 -9,-2 -1,1 z',
      anchor: new google.maps.Point(32, 32),
      scale: scale,
      fillColor: this.ICON_COLOR,
      fillOpacity: this.ICON_OPACITY,
      strokeWeight: 1,
      rotation: f.heading
    };
  }

  static getIconL4J(f: MapFlight): any {
    let scale = 0.4;

    if (f.type && f.type.substring(0, 3) === 'B74') {
      scale = 0.5;
    }

    return {
      path: 'm28.64874,12.035023l0,8.801421l-4.585627,3.066495c0.126825,-0.257055 0.094102,-0.531839 0.095802,' +
      '-0.802796l-0.015437,-3.087446l-2.230453,-0.012673l0.019009,3.599141c0.000513,0.577993 0.076338,0.923195 ' +
      '0.589296,1.241956l-5.533809,3.630512c0.166511,-0.256275 0.153699,-0.551367 0.153699,-0.841892l-0.005929,' +
      '-3.270195l-2.160751,-0.012672l-0.006337,3.637159c0.016349,0.5301 0.096662,1.090947 0.576623,1.419379l-11.976014,' +
      '7.825597c-2.106287,1.48859 -1.705322,3.044253 -1.56512,4.587637l26.645047,-9.048544l0,13.750239l0.722364,' +
      '5.062875l-8.681027,6.387208c-1.239945,1.059417 -1.080616,2.171837 -0.842757,3.256969l11.278998,' +
      '-2.946479c0.130159,3.116897 1.559821,3.171571 1.780561,0.006336l11.278998,2.94648c0.23786,-1.085133 0.397189,' +
      '-2.197552 -0.842756,-3.256969l-8.681026,-6.387207l0.722362,-5.062875l0,-13.750239l26.645048,9.042207c0.140203,' +
      '-1.543381 0.541167,-3.092711 -1.56512,-4.581301l-11.976015,-7.825597c0.47996,-0.328434 0.553938,-0.889279 ' +
      '0.570286,-1.419379l0,-3.63716l-2.160751,0.012673l-0.005378,3.328244c-0.002334,0.294243 0.007077,0.545056 ' +
      '0.178191,0.817583l-5.565189,-3.664251c0.512962,-0.318761 0.59512,-0.663963 0.595633,-1.241956l0.019009,' +
      '-3.599141l-2.230454,0.012673l-0.015793,3.100403c0.001462,0.282341 -0.019949,0.535579 0.124839,0.794638l-4.614307,' +
      '-3.071294l0,-8.801421c-1.111672,-11.152869 -5.489391,-11.217579 -6.735717,-0.006336z',
      anchor: new google.maps.Point(32, 32),
      scale: scale,
      fillColor: this.ICON_COLOR,
      fillOpacity: this.ICON_OPACITY,
      strokeWeight: 1,
      rotation: f.heading
    };
  }

  static getIconL2T(f: MapFlight): any {
    return {
      path: 'm 32,1 3,4 0,20 4,0 0,-5 1,-1 1,1 0,5 17,2 0,3 -17,2 0,3 -1,1 -1,-1 0,-3 -4,0 0,15 -1,8 6,0 1,1 0,3 -8,0 -1,' +
      '1 -1,-1 -8,0 0,-3 1,-1 6,0 -1,-8 0,-15 -4,0 0,3, -1,1 -1,-1 0,-3 -17,-2 0,-3 17,-2 0,-5 1,-1 1,1 0,5 4,0 0,-20 3,-4z',
      anchor: new google.maps.Point(32, 30),
      scale: 0.4,
      fillColor: this.ICON_COLOR,
      fillOpacity: this.ICON_OPACITY,
      strokeWeight: 1,
      rotation: f.heading
    };
  }

  static getIconHeli(f: MapFlight): any {
    return {
      path: 'M 43.89309,0.4301 c -0.60546,-0.60546 -1.62623,-0.56506 -2.2813,0.0897 L 25.82444,16.3061 C 24.95171,' +
      '-1.27473 21.64491,1.24212 21.64491,1.24212 c 0,0 -3.20153,-2.80873 -4.13518,14.07519 L 2.71103,0.51862 C 2.05636,' +
      '-0.13606 1.03533,-0.17646 0.43,0.42902 c -0.60546,0.6052 -0.56506,1.6261 0.0896,2.28104 l 16.81957,16.81931 c -0.0454,' +
      '1.63425 -0.072,3.41089 -0.0796,5.34281 l -0.90497,0.90496 h -1.94113 v 1.94113 L 0.51882,41.61319 c -0.6548,0.65454 -0.69533,' +
      '1.67531 -0.09,2.28077 0.60533,0.60546 1.62636,0.5648 2.28104,-0.0896 L 14.41335,32.10074 v 1.94073 h 3.09928 c 0,0 ' +
      '1.25961,6.97312 2.03417,8.65159 0.77495,1.67913 0.032,17.17487 2.09799,17.17487 0.38346,0 0.66928,-0.53374 0.88615,' +
      '-1.41331 l 6.34515,-2.71897 v -1.03314 h -5.85155 c 0.34017,-4.67077 0.24161,-10.97316 0.71942,-12.00945 0.77416,' +
      '-1.67847 2.03285,-8.65159 2.03285,-8.65159 h 3.09928 v -2.974 l 12.73545,12.73689 c 0.65507,0.65442 1.67584,0.69495 ' +
      '2.2813,0.0896 0.60546,-0.60533 0.56479,-1.62623 -0.0901,-2.28077 L 28.876,26.68527 v -0.90813 h -0.90799 l -1.94284,' +
      '-1.9431 c -0.009,-1.15407 -0.0263,-2.25524 -0.0496,-3.29693 l 17.82849,-17.826 c 0.65389,-0.65494 0.69442,-1.67702 ' +
      '0.0891,-2.28103 z M 18.80421,51.60336 h -0.5165 c -0.42794,0 -0.77495,0.34754 -0.77495,0.77521 v 10.84709 c ' +
      '0,0.42768 0.34701,0.77469 0.77495,0.77469 h 0.5165 c 0.42768,0 0.77469,-0.34701 0.77469,-0.77469 V 52.37857 c ' +
      '0,-0.42781 -0.34701,-0.77521 -0.77469,-0.77521 z',
      anchor: new google.maps.Point(22, 32),
      scale: 0.4,
      fillColor: this.ICON_COLOR,
      fillOpacity: this.ICON_OPACITY,
      strokeWeight: 1,
      rotation: f.heading
    };
  }

  static getIconDefault(f: MapFlight): any {
    return {
      path: 'M 0,0 ' +
      'M 1.9565564,41.694305 C 1.7174505,40.497708 1.6419973,38.448747 ' +
      '1.8096508,37.70494 1.8936398,37.332056 2.0796653,36.88191 2.222907,36.70461 ' +
      '2.4497603,36.423844 4.087816,35.47248 14.917931,29.331528 l 12.434577,' +
      '-7.050718 -0.04295,-7.613412 c -0.03657,-6.4844888 -0.01164,-7.7625804 ' +
      '0.168134,-8.6194061 0.276129,-1.3160905 0.762276,-2.5869575 1.347875,' +
      '-3.5235502 l 0.472298,-0.7553719 1.083746,-0.6085497 c 1.194146,-0.67053522 ' +
      '1.399524,-0.71738842 2.146113,-0.48960552 1.077005,0.3285939 2.06344,' +
      '1.41299352 2.797602,3.07543322 0.462378,1.0469993 0.978731,2.7738408 ' +
      '1.047635,3.5036272 0.02421,0.2570284 0.06357,3.78334 0.08732,7.836246 0.02375,' +
      '4.052905 0.0658,7.409251 0.09345,7.458546 0.02764,0.04929 5.600384,3.561772 ' +
      '12.38386,7.805502 l 12.333598,7.715871 0.537584,0.959688 c 0.626485,1.118378 ' +
      '0.651686,1.311286 0.459287,3.516442 -0.175469,2.011604 -0.608966,2.863924 ' +
      '-1.590344,3.127136 -0.748529,0.200763 -1.293144,0.03637 -10.184829,-3.07436 ' +
      'C 48.007733,41.72562 44.793806,40.60197 43.35084,40.098045 l -2.623567,' +
      '-0.916227 -1.981212,-0.06614 c -1.089663,-0.03638 -1.985079,-0.05089 -1.989804,' +
      '-0.03225 -0.0052,0.01863 -0.02396,2.421278 -0.04267,5.339183 -0.0395,6.147742 ' +
      '-0.143635,7.215456 -0.862956,8.845475 l -0.300457,0.680872 2.91906,1.361455 ' +
      'c 2.929379,1.366269 3.714195,1.835385 4.04589,2.41841 0.368292,0.647353 ' +
      '0.594634,2.901439 0.395779,3.941627 -0.0705,0.368571 -0.106308,0.404853 ' +
      '-0.765159,0.773916 L 41.4545,62.83158 39.259237,62.80426 c -6.030106,-0.07507 ' +
      '-16.19508,-0.495041 -16.870991,-0.697033 -0.359409,-0.107405 -0.523792,' +
      '-0.227482 -0.741884,-0.541926 -0.250591,-0.361297 -0.28386,-0.522402 -0.315075,' +
      '-1.52589 -0.06327,-2.03378 0.23288,-3.033615 1.077963,-3.639283 0.307525,' +
      '-0.2204 4.818478,-2.133627 6.017853,-2.552345 0.247872,-0.08654 0.247455,' +
      '-0.102501 -0.01855,-0.711959 -0.330395,-0.756986 -0.708622,-2.221756 -0.832676,' +
      '-3.224748 -0.05031,-0.406952 -0.133825,-3.078805 -0.185533,-5.937448 -0.0517,' +
      '-2.858644 -0.145909,-5.208974 -0.209316,-5.222958 -0.06341,-0.01399 -0.974464,' +
      '-0.0493 -2.024551,-0.07845 L 23.247235,38.61921 18.831373,39.8906 C 4.9432155,' +
      '43.88916 4.2929558,44.057819 3.4954426,43.86823 2.7487826,43.690732 2.2007966,' +
      '42.916622 1.9565564,41.694305 z',
      anchor: new google.maps.Point(32, 32),
      scale: 0.35,
      fillColor: this.ICON_COLOR,
      fillOpacity: this.ICON_OPACITY,
      strokeWeight: 1,
      rotation: f.heading
    };
  }
}
