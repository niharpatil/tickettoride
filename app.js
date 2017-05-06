var express = require('express');
var path = require('path');
var app = express();
app.set('view engine', 'hbs');
var server = require('http').createServer(app);

var port = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.static('node_modules/socket.io-client'))

server.listen(port, function(){
  console.log('listening on port ' + port);
});

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))

app.get('/selectcities', function(req,res){
  res.sendFile(path.join(__dirname,'/index.html'));
})

var net = require('net')

app.post('/selectcities', function(req,res){
  var first = req.body.first_city
  var second = req.body.second_city
  var red = req.body.red
  var white = req.body.white
  var yellow = req.body.yellow
  var blue = req.body.blue
  var pink = req.body.pink
  var green = req.body.green
  var black = req.body.black
  var orange = req.body.orange
  var colorless = req.body.colorless
  var stuff = [first,second,red,white,yellow,blue,pink,green,black,orange,colorless]
  
  var client = net.connect('3000','localhost')
  client.on('data', function(data){
    var buf = Buffer.from(data, 'ascii')
    var shortestPath = buf.toString()
    shortestPath = shortestPath.substring(1,shortestPath.length-2)
    res.send(shortestPath.split(','))
  })

  client.write(stuff.join())
  client.end()
})









