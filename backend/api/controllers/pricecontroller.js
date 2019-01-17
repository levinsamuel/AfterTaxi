
const fetch = require('node-fetch');

// 'Authorization': 'Bearer hTXciu2pC+TBy857QKeHekOFaEWxtcaU7tuGR605ZV2c7YKHNpwKmbUPbN3YSXvH0rq55qi9/COD5xlH9H8dxGoPCDGjr4WnFyCM+olqexKPs1sXfibXXKE='

exports.estimate_price = function (req, res) {

    var {start_lat, start_lng, end_lat, end_lng} = req.query;
    res.set('Access-Control-Allow-Origin', '*')
    
    const est = fetch('https://api.lyft.com/v1/cost?' +
          `start_lat=${start_lat}&start_lng=${start_lng}&` +
          `end_lat=${end_lat}&end_lng=${end_lng}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
    })
    .then(res2 => res2.json())
    .then(res2 => {
      console.log("response:", res2);
      return res2;
    })
    .then(res2 => res.send(res2))
    .catch((err) => console.error('request failed', err.message));

}
