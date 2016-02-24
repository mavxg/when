var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var http = require('http')
var WebSocketServer = require("ws").Server

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

var server = http.createServer(app)
server.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

function makeHat() {
	var hat = 0;
	return function() {
		hat = hat + 1;
		return hat;
	}
}

var hat = makeHat();

wss.on("connection", function(ws) {
  var hid = hat();
  var state = {};

  console.log("websocket connection open")

  ws.on("message", function(message) {
  	console.log('recieved %s: %s',hid,message);
  })

  ws.on("close", function() {
    console.log("websocket connection close")
  })
})
