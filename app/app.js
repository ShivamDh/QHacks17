const fs = require('fs')
const http = require('http')
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
var app = express()

app.use((req, res, next) => {
 	console.log(req.method + ": " + req.url)
 	next()
})

app.get('/', (req, res) => {
	res.writeHead(200, {'content-type': 'text/html'})
	res.end('hello world')
})

app.get('/pic/:tagId', (req, res) => {
	// download req.params.tagId
	// make it bad
	// send the bad image
	//res.send(req.params.tagId)
	res.end('hi')
})

app.use('/pic/', bodyParser.urlencoded({extended: false}))
app.post('/pic/', (req, res) => {
	res.send(req.body)
	console.log(req.body)
})

var server = app.listen(3000, () => {
	console.log('Express running localhost:3000')
})

function download(link, dest, cb) {
	var file = fs.createWriteStream(dest)
	var req = http.get(link, (res) => {
		res.pipe(file)
		file.on('finish', () => {
			file.close(cb)
		})
	}).on('error', (err) => {
		fs.unlink(dest)
		if(cb)
			cb(err.message)
	})
	return file
}