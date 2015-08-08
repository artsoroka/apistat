var http   = require("http"); 
var proxy  = require("http-proxy").createProxyServer({});  
var config = require("./config"); 
var db     = require("./mysql")(config.db); 

var proxyServer = http.createServer(function(req,res){
    
    var request = req.url.split('?'); 
    var path    = request[0]; 
    var query   = request[1]; 
    
    db.query('INSERT INTO api_usage SET ?', {
		method: req.method, 
		path: path, 
		query: query, 
		timestamp: parseInt(Date.now() / 1000) 
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

var reports = http.createServer(function(req,res){
   db.query('SELECT method, path, count(id) as hits FROM api_usage GROUP BY path', function(err, data){
       if( err ) return res.end('db error'); 
       res.end(JSON.stringify(data)); 
   });  
}); 

reports.listen(9001); 
