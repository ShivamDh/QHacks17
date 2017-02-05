const fs = require('fs')
const http = require('http')

const express = require('express')
const bodyParser = require('body-parser')
const jimp = require('jimp')

var app = express()

app.use((req, res, next) => {
 	console.log(req.method + ": " + req.url)
 	next()
})

app.get('/:tagId', (req, res) => {
	// if file already exists, do nothing
	// download req.params.tagId
	// actually dont store the full sized image, just save in memory
	var dl = download('http://i.imgur.com/cVjim4r.jpg', 'img/cVjim4r.jpg', () => {
		console.log('downloaded image')
		// make it bad
		jimp.read('img/cVjim4r.jpg', function (err, img) {
		if (err)
			throw err;

		img.resize(256, 256)
			.quality(60)
			.write('img/cVjim4r-small.jpg')
		})

		// this vvv sends the file over http
		// res.sendFile('img/cVjim4r-small.jpg')
	})

	res.send(req.params.tagId)
	res.end()
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