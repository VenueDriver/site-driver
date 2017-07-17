const http  = require('http' );
const https = require('https');

module.exports = (opt , onResult) => {
  opt.method = "GET";
  opt.headers['Content-Type'] = 'application/json';

  let response = '';
  let raw = '';
  let prot = (opt.port == 443) ? https : http;
  let req  = prot.request(opt , (res) =>{
    res.setEncoding('UTF-8');
    res.on('data', (chunk) => { response += chunk } );

    res.on('end', () =>{
      try {
        raw = response;
        JSON.parse(response);
      } catch (e) {
        response = JSON.stringify("[{error: Invalid JSON , raw : "+e+"}]");
      }
      onResult(res.statusCode,  JSON.parse(response) , raw );
    });

  });

  req.on('error' , (err) =>{ console.log("Error: #{err}") });
  req.end();
}
