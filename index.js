var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var api = require("./api")
var bodyParser = require('body-parser')

// Serve up public/ftp folder
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']})
 
// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})
 
// Listen
server.listen(3000)

//Express
const express = require('express')
const app = express()
const port = 3001

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/Question', (req, res) => res.send(api.getNextQuestion()))
app.post('/Answer', (req, res) => res.send(api.processAnswer(req.body)))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))