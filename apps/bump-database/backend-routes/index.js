var path = require('path')
var express = require('express')
var mysql = require('mysql')

var router = express.Router()

var dbConfig = require(path.join(__dirname, '..', 'secret', 'dbConfig'))
var connection = mysql.createConnection(dbConfig)
connection.connect()

router.get('/students', (req, res) => {
  connection.query('SELECT * FROM Students', (err, rows, fields) => {
    if (err) throw err

    res.status(200).json(rows)
  })
  // var schema = require('../backend-schema/schema1.js')
  // connection.query(schema, (err, rows, fields) => {
  //   if (err) throw err
  // })
})

// body example
// { "uid": "123", "displayName": "test", "email": "test@test.com", "facebookUid" : "321" }
router.post('/students', (req, res) => {
  if (!req.body ||
      !req.body.uid ||
      !req.body.displayName ||
      !req.body.email ||
      !req.body.facebookUid) {
    console.log(req.body)
    res.status(400).send('Bad request')
  } else {
    var query = 'SELECT * FROM Students WHERE uid = "' + req.body.uid + '"'
    connection.query(query, (err1, rows, fields) => {
      if (err1) throw err1
      console.log(rows.length)
      if (rows.length === 0) {
        console.log('asdf2')
        query = 'INSERT INTO Students (uid, displayName, email, facebookUid) VALUES (' +
        '"' + req.body.uid + '"' + ', ' +
        '"' + req.body.displayName + '"' + ', ' +
        '"' + req.body.email + '"' + ', ' +
        '"' + req.body.facebookUid + '"' + ');'
        connection.query(query, (err, rows, fields) => {
          if (err) throw err

          res.status(200).json(rows)
        })
      }
    })
  }
})

router.delete('/students/:uid', (req, res) => {
  if (!req.params['uid']) {
    res.status(400).send('Bad request')
  } else {
    var query = 'DELETE FROM Students WHERE uid = "' + req.params['uid'] + '";'
    console.log(query)
    connection.query(query, (err, rows, fields) => {
      if (err) throw err

      res.status(200).json(rows)
    })
  }
})

router.get('/bumps', (req, res) => {
  var query = `
    SELECT
      displayName,
      SUM(CASE WHEN issued=FALSE THEN expAmount ELSE 0 END) AS requestedExp,
      SUM(expAmount) AS totalBumpExp
    FROM Bumps B
      JOIN Students S WHERE S.uid = B.uid
    WHERE B.bumpId > 144
    GROUP BY B.uid
    ORDER BY totalBumpExp desc
  `
  connection.query(query, (err, rows, fields) => {
    if (err) throw err

    res.status(200).json(rows)
  })
})

router.get('/bumps/uid/:uid', (req, res) => {
  var query = `
    SELECT * FROM Bumps
    WHERE uid = "` + req.params['uid'] + '"' +
    'ORDER BY timeRequested desc'
  connection.query(query, (err, rows, fields) => {
    if (err) throw err

    res.status(200).json(rows)
  })
})

router.get('/bumps/requested', (req, res) => {
  var query = `
    SELECT B.uid, bumpId, displayName, whatDay, expAmount, issued, forWhat
    FROM Bumps B
      JOIN Students S ON S.uid = B.uid
    WHERE B.issued = 0
    ORDER BY displayName asc
  `
  connection.query(query, (err, rows, fields) => {
    if (err) throw err

    res.status(200).json(rows)
  })
})

router.post('/bumps', (req, res) => {
  if (!req.body.uid ||
      !req.body.expAmount ||
      !req.body.whatDay ||
      !req.body.forWhat) {
    res.status(400).send('Bad request')
  } else {
    var query = 'INSERT INTO Bumps (uid, expAmount, whatDay, forWhat) VALUES (' +
      '"' + req.body.uid + '", ' +
      req.body.expAmount + ', ' +
      'STR_TO_DATE("' + req.body.whatDay + '", "%m/%d/%Y"), ' +
      '"' + req.body.forWhat + '")'
    connection.query(query, (err, rows, fields) => {
      if (err) throw err

      res.status(200).json(rows)
    })
  }
})

router.post('/bumps/issue', (req, res) => {
  if (!req.body || !req.body.bumpId || (!req.body.amountIssued && req.body.amountIssued !== 0)) {
    res.status(400).send('Bad request')
  } else {
    var query = 'UPDATE Bumps SET issued=1, amountIssued =' + req.body.amountIssued + ' WHERE bumpId = "' + req.body.bumpId + '"'
    connection.query(query, (err, rows, fields) => {
      if (err) throw err

      res.status(200).json(rows)
    })
  }
})

router.delete('/bumps/delete/:bumpId', (req, res) => {
  if (!req.params || !req.params['bumpId']) {
    res.status(400).send('Bad request')
  } else {
    var query = 'DELETE FROM Bumps WHERE bumpId = "' + req.params['bumpId'] + '"'
    connection.query(query, (err, rows, fields) => {
      if (err) throw err

      res.status(200).json(rows)
    })
  }
})

module.exports = router
