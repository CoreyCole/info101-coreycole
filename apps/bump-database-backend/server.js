var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser')
var mysql = require('mysql')

var dbConfig = require('secret/dbConfig')
var connection = mysql.createConnection(dbConfig)

var app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('listening . . .')
})
