/**
 * Geografische Koordinaten deutscher Städte
 * (Latitude, Longitude)
 */
export const cityCoordinates = {
  "Aachen": { lat: 50.7753, lng: 6.0839 },
  "Augsburg": { lat: 48.3705, lng: 10.8979 },
  "Bad Kissingen": { lat: 50.1990, lng: 9.9833 },
  "Bad Vilbel": { lat: 50.1396, lng: 8.6850 },
  "Baden-Baden": { lat: 48.7605, lng: 8.2396 },
  "Berlin": { lat: 52.5200, lng: 13.4050 },
  "Bielefeld": { lat: 52.0116, lng: 8.5342 },
  "Bochum": { lat: 51.4556, lng: 7.2152 },
  "Bonn": { lat: 50.7353, lng: 7.0918 },
  "Bremen": { lat: 53.0758, lng: 8.8075 },
  "Braunschweig": { lat: 52.2688, lng: 10.5268 },
  "Chemnitz": { lat: 50.8324, lng: 12.9244 },
  "Darmstadt": { lat: 49.8728, lng: 8.6512 },
  "Dortmund": { lat: 51.5150, lng: 7.4653 },
  "Dresden": { lat: 51.0459, lng: 13.7370 },
  "Duisburg": { lat: 51.4344, lng: 6.7603 },
  "Düsseldorf": { lat: 51.2277, lng: 6.7735 },
  "Erfurt": { lat: 50.9789, lng: 11.0298 },
  "Erlangen": { lat: 49.5965, lng: 11.0045 },
  "Essen": { lat: 51.4556, lng: 7.0116 },
  "Flensburg": { lat: 54.7678, lng: 8.8856 },
  "Frankfurt (Oder)": { lat: 52.3464, lng: 14.5497 },
  "Frankfurt am Main": { lat: 50.1109, lng: 8.6821 },
  "Freiburg": { lat: 48.0021, lng: 7.8421 },
  "Friedrichshafen": { lat: 47.6564, lng: 9.5115 },
  "Göttingen": { lat: 51.5339, lng: 9.9356 },
  "Greifswald": { lat: 54.0836, lng: 13.3838 },
  "Halle": { lat: 51.4769, lng: 11.9855 },
  "Hamburg": { lat: 53.5511, lng: 10.0096 },
  "Hannover": { lat: 52.3760, lng: 9.7348 },
  "Heidelberg": { lat: 49.4069, lng: 8.6753 },
  "Heilbronn": { lat: 49.1393, lng: 9.2200 },
  "Hohenheim": { lat: 48.7078, lng: 9.1946 },
  "Jena": { lat: 50.9277, lng: 11.5880 },
  "Kiel": { lat: 54.3233, lng: 10.1348 },
  "Kleve": { lat: 51.7881, lng: 6.1316 },
  "Koblenz": { lat: 50.3569, lng: 7.5914 },
  "Köln": { lat: 50.9375, lng: 6.9603 },
  "Konstanz": { lat: 47.6560, lng: 9.1763 },
  "Lübeck": { lat: 53.8656, lng: 10.6869 },
  "Magdeburg": { lat: 52.1345, lng: 11.5769 },
  "Mannheim": { lat: 49.4881, lng: 8.4648 },
  "Marburg": { lat: 50.8045, lng: 8.7738 },
  "München": { lat: 48.1351, lng: 11.5820 },
  "Münster": { lat: 51.9607, lng: 7.6261 },
  "Neuss": { lat: 51.4022, lng: 6.6850 },
  "Neuruppin": { lat: 52.9276, lng: 12.8043 },
  "Nürnberg": { lat: 49.4521, lng: 11.0767 },
  "Oldenburg": { lat: 53.1439, lng: 8.2146 },
  "Osnabrück": { lat: 52.2799, lng: 8.0472 },
  "Paderborn": { lat: 51.7189, lng: 8.7577 },
  "Passau": { lat: 48.5730, lng: 13.4631 },
  "Potsdam": { lat: 52.3906, lng: 13.0645 },
  "Regensburg": { lat: 48.3704, lng: 12.1016 },
  "Rinteln": { lat: 52.1846, lng: 9.0769 },
  "Rostock": { lat: 54.0887, lng: 12.1389 },
  "Saarbrücken": { lat: 49.2392, lng: 6.9975 },
  "Schwäbisch Hall": { lat: 49.1043, lng: 9.7345 },
  "Siegen": { lat: 50.8758, lng: 8.0262 },
  "Sindelfingen": { lat: 48.7155, lng: 8.9986 },
  "Stuttgart": { lat: 48.7758, lng: 9.1829 },
  "Tecklenburg": { lat: 52.1843, lng: 8.3340 },
  "Tübingen": { lat: 48.5216, lng: 9.0576 },
  "Tutzing": { lat: 47.9206, lng: 11.4572 },
  "Ulm": { lat: 48.3985, lng: 9.9869 },
  "Wiesbaden": { lat: 50.0829, lng: 8.2427 },
  "Wuppertal": { lat: 51.2629, lng: 7.1495 },
  "Würzburg": { lat: 49.7927, lng: 9.9547 }
}

/**
 * Konvertiert geografische Koordinaten zu SVG-Position in %
 * @param {string} city - Stadtname
 * @returns {object} { top: "XX%", left: "XX%" }
 */
export const getEventPosition = (city) => {
  const coords = cityCoordinates[city]
  
  if (!coords) {
    console.warn(`Stadt nicht gefunden: ${city}`)
    return { top: "50%", left: "50%" }
  }

  // Deutschland geografische Grenzen (ungefähr)
  const minLat = 47.27    // Süden (Bayern)
  const maxLat = 55.06    // Norden (Sylt)
  const minLng = 5.87     // Westen (Aachen)
  const maxLng = 15.02    // Osten (Görlitz)

  // Berechne prozentuale Position
  const top = ((maxLat - coords.lat) / (maxLat - minLat)) * 100
  const left = ((coords.lng - minLng) / (maxLng - minLng)) * 100

  return {
    top: `${top.toFixed(1)}%`,
    left: `${left.toFixed(1)}%`
  }
}