var http   = require("http"); 
var proxy  = require("http-proxy").createProxyServer({});  
var config = require("./config"); 
var db     = require("./mysql")(config.db); 

var proxyServer = http.createServer(function(req,res){
    console.log(req.url);
    console.log(req.method);
    
    var request = req.url.split('?'); 
    var path    = request[0]; 
    var query   = request[1]; 
    
    db.query('INSERT INTO api_usage SET ?', {
		method: req.method, 
		path: path, 
		query: query 
	}, function(err, info){
		if( err ) return console.log('db err: ', err); 
	});
    
    proxy.web(req, res, {target: 'http://localhost:9000'}); 
}); 

proxyServer.listen(config.app.port);

var server = http.createServer(function(req, res) {
    res.end('hello'); 
}); 

server.listen(9000); 

