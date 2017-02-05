const path = require('path')
const http = require('http')

const jimp = require('jimp')
const express = require('express')
const download = require('download-file')

var app = express()

var server = app.listen(3000, () => {
	console.log('Express running localhost:3000')
})

app.use((req, res, next) => {
 	console.log(req.method + ': ' + req.url)
 	next()
})

app.get('/:pic', (req, res) => {
	var pic = req.params.pic // uri encoded link
	var link = decodeURIComponent(pic)

	var op = {
		directory: './img/',
		filename: pic.replace(/[^a-zA-Z0-9\.]/g, '')
	}

	// TODO: if file `op.filename` already exists, simply serve it.

	download(link, op, (err) => {
		if (err)
			throw err
		console.log(' downloaded')
		// make it bad
		jimp.read('./img/' + op.filename, function (err, img) {
			if (err)
				throw err;
			console.log(' read')

			img.scale(0.1)
			.quality(60)
			.write(op.directory + op.filename, (err) => {
				if(err)
					throw err
				console.log(' wrote')
				res.sendFile(path.join(__dirname, '../app', op.directory, op.filename))
			})
		})
	})
})