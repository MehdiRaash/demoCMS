//1.
// var http = require('http');

// http.createServer(function(req, res){

//     res.writeHead(200, {'Content-type':'text/plain'});
//     res.end("hello world\n");
// }).listen(1337, '127.0.0.1');

//2.
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res){

//     res.writeHead(200, {'Content-type':'text/html'});
//     var html = fs.readFileSync(__dirname + '/index.html');
//     res.end(html);
// }).listen(1337, '127.0.0.1');

//2.1
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res){

//     res.writeHead(200, {'Content-type':'text/html'});
//     var streamed_HTML = fs.createReadStream(__dirname + '/index.html');
//     streamed_HTML.pipe(res);

// }).listen(1337, '127.0.0.1');

//3.
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res){

//     res.writeHead(200, {'Content-type':'application/json'});
//     var obj = {
//         firstName: 'ali',
//         lastName: 'kazemi'
//     }
//     res.end(JSON.stringify(obj)); 

// }).listen(1337, '127.0.0.1');

//4. routing
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res){

//     if(req.url === '/'){

//     }
//     else if(req.url === '/api'){
//         res.writeHead(200, {'Content-type':'application/json'});
//         var obj = {
//             firstName: 'ali',
//             lastName: 'kazemi'
//         }
//         res.end(JSON.stringify(obj)); 
//     }
//     else{
//         res.writeHead(404);//could not be found
//         res.end();
//     }
// }).listen(1337, '127.0.0.1');

//5.express
var express = require("express");
var bodyParser = require('body-parser')
var app = express();

//it searchs for views folder
app.set("view engine", "ejs");


var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()



app.use('/public', express.static(__dirname+'/public'));



// app.use(function(req, res, next){
//     res.cookie('cookieName', 'cookieValue');
//     next();
// });
app.get('/', function(req, res){
    res.send("<html><head><link href=public/style.css type=text/css rel=stylesheet /></head><body>ddd</body></html>");
});
app.get('/ejs/:name', function(req, res){
   // console.log(req.query.ok)
    res.render("index", { name :req.params.name , gender: "M"});
});
app.get('/*', function(req, res){
    res.render('error');
});
app.get('/api', function(req, res){
    res.json({firstName:'ali', lastName:'kazemi'});
})
app.get('/dashboard/:id', function(req, res){
    res.send("<html><body>d"+ req.params.id+" dd</body></html>");
});


app.post('/save',urlencodedParser, function(req, res){
    console.log(req.body.firstName)
    res.send('dd')
});
var port  = process.env.PORT || 3000;
app.listen(port);
 
 
