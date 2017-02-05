const fs = require('fs')
const path = require('path')
const http = require('http')

const express = require('express')
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
	var dl = download('http://www.w3schools.com/w3css/img_fjords.jpg', 'img/pic1.jpg', () => {
		console.log('downloaded image')
		// make it bad
		jimp.read('img/pic1.jpg', function (err, img) {
		if (err)
			throw err;

		img.resize(256, 256)
			.quality(60)
			.write('img/pic1-small.jpg', (err) => {
				if(err)
					res.end()
				res.sendFile(path.join(__dirname, '../app', './img/pic1-small.jpg'));
			})
		})

		// this vvv sends the file over http
	})

	//res.send(req.params.tagId)
	//res.end()
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