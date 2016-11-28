var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var path = require('path')

var indexRoutes = require(path.join(__dirname, 'backend-routes', 'index'))
var indexFile = path.join(__dirname, 'dist', 'index.html')

// CORS middleware
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://ec2-34-193-24-15.compute-1.amazonaws.com')
  // res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  next()
}

var app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(allowCrossDomain)
app.use('/api', indexRoutes)

app.use(express.static(path.join(__dirname, '/dist')))

// 404 catch
app.all('*', (req, res) => {
  res.status(200).sendFile(indexFile)
})

app.listen(80, () => {
  console.log('listening . . .')
})
