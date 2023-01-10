var http = require('http'); 
var files = require('fs')
var server = http.createServer(function (req, res) {   
    res.writeHead(200, {'Content-Type':'text/json'})
    var database = files.readFileSync('node_data.txt','utf8')
    if(req.url != '/favicon.ico'){
        files.writeFileSync('node_data.txt',`${database}${req.url.slice(1)}\n`)
    }
    res.write('hi')
    res.end()
});
server.listen(6968); 
