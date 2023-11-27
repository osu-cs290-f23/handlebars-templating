var express = require('express')

var port = process.env.PORT || 8000
var app = express()

app.use(express.static('static'))

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/static/people.html')
})

var availablePeople = [
  'luke',
  'leia',
  'rey',
  'finn',
  'r2d2'
]

app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase()
  if (availablePeople.indexOf(person) >= 0) {
    res.status(200).sendFile(
      __dirname + '/static/people/' + person + '.html'
    )
  } else {
    next()
  }
})

app.get("*", function (req, res, next) {
  res.status(404).sendFile(__dirname + '/static/404.html')
})

app.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log("== Server listening on port", port)
})
