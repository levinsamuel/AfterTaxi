
const fetch = require('node-fetch');

exports.estimate_price = function (req, res) {

    res.set('Access-Control-Allow-Origin', '*')
    const est = fetch('https://api.lyft.com/v1/cost?start_lat=34.17&start_lng=-118.42&end_lat=34.19&end_lng=-118.46', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': 'Bearer hTXciu2pC+TBy857QKeHekOFaEWxtcaU7tuGR605ZV2c7YKHNpwKmbUPbN3YSXvH0rq55qi9/COD5xlH9H8dxGoPCDGjr4WnFyCM+olqexKPs1sXfibXXKE='
        }
    })
    .then(res2 => res2.json())
    .then(res2 => {console.log("response:", res2); return res2})
    .then(res2 => res.send(res2))
    .catch((err) => console.error('request failed', err.message));

}
