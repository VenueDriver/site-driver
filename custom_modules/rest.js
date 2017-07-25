const http  = require('http' );
const https = require('https');
const zlib  = require('zlib');

const isGziped = (res)=>{
  return res.headers.hasOwnProperty("content-encoding") && res.headers['content-encoding'] == 'gzip'
}

module.exports = (opt , onResult) => {
  opt.method = "GET";
  opt.headers['Content-Type'] = 'application/json';
  opt.headers['Accept-Encoding'] = 'gzip';

  let response = [];
  var bufLength = 0;
  let raw = '';
  let prot = (opt.port == 443) ? https : http;
  let req  = prot.request(opt , (res) =>{
    if(!isGziped(res)){
      res.setEncoding('UTF-8');
    }
    res.on('data', (chunk) => {
      // if(isGziped(res)){
      //   let buf = new Buffer(chunk,'utf-8');
      //   bufLength += buf.length;
      //   response.push(buf);
      // }else{
        response.push(chunk);
      // }
    } );

    res.on('end', () =>{
      const returnResponse = ()=>{
        try {
          raw = response;
          JSON.parse(response);
        } catch (e) {
          response = JSON.stringify("[{error: Invalid JSON , raw : "+e+"}]");
        }
        onResult(res.statusCode,  JSON.parse(response) , raw );
      }

      if(isGziped(res)){
        let buf = Buffer.concat(response);
        zlib.gunzip(buf,(err,decoded)=>{
          decoded = decoded.toString('utf-8');
          response = decoded;
          returnResponse();
        });
      }else{
        response = response.join('');
        returnResponse();
      }


    });

  });

  req.on('error' , (err) =>{ console.log("Error: #{err}") });
  req.end();
}
