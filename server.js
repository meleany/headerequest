// Request Header Microservice by Yasmin Melean 16/06/2017
// Uses Node.js and Express
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// Enable 'trust proxy' to work easily the ip. 
// However, doesn't always work. Seems it's now incomplete from what I read online.
//app.enable("trust proxy");

app.get("/", function(request, response){
  //var ip = request.ip;  // Comment previous line and uncomment this and app.enable() lines  
  var ip = request.headers['x-forwarded-for'].split(",")[0] || request.connection.remoteAddress;
  var language = request.headers['accept-language'].split(",")[0];
  var os = request.headers['user-agent'];
  var regExp = /\(([^)]+)\)/;  
  response.send({"ipaddress": ip, "language": language, "software": regExp.exec(os)[1]});
});

// Starts a server and listens/connects in PORT
// The default routing is 0.0.0.0 represented by :: in IPv6
var server = app.listen(PORT, function(){
  var host = server.address().address;
  if(host == "::"){ host = "0.0.0.0" }
  var port = server.address().port;
  console.log("Request Header Microservice running at http://%s:%s", host, port);
});