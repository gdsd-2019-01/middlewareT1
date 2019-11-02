const http = require('http');
const fs = require('fs');
const con = require('./db');

const hostname = 'localhost'
const port = '3000'

function onRequest(req, res) {
    if(req.method == 'GET' && req.url == '/')
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('./index.html').pipe(res);
    }
    else if(req.method == "GET" && req.url == '/functions.js')
    {
        res.writeHead(200, {"Content-Type":"text/javascript"});
        fs.createReadStream("./functions.js").pipe(res);
    }
    else if(req.method == "GET" && req.url == '/home')
    {
        res.statusCode == 200;
        res.setHeader('Content-Type', 'application/json');

        var conn = con.getConnection();

        conn.query('SELECT * FROM amounts ORDER BY `amounts`.`id` DESC', function(error, results, fields){
            if(error) throw error;

            var comments = JSON.stringify(results);

            res.end(comments);
        });

        conn.end();
    }
    else if(req.method == "POST" && req.url == "/insert")
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        var content = '';
        req.on('data', function(data){
            content += data;

            var obj = JSON.parse(content);
            var conn = con.getConnection();

            conn.query('INSERT INTO history.amounts (amounts.name, amounts._from, amounts._to) VALUES (?,?,?)',[obj.name,obj._from,obj._to], function(error, results, fields){
            if(error) throw error;
            console.log("Success!");
        });

        conn.end();
        res.end("Success!");
        });
    }

}

const server = http.createServer(onRequest);

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`)
});