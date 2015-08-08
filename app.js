var http   = require("http"); 
var proxy  = require("http-proxy").createProxyServer({});  
var config = require("./config"); 

var proxyServer = http.createServer(function(req,res){
    console.log(req.url); 
    proxy.web(req, res, {target: 'http://localhost:9000'}); 
}); 

proxyServer.listen(config.app.port);

var server = http.createServer(function(req, res) {
    res.end('hello'); 
}); 

server.listen(9000); 

