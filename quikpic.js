document.addEventListener('DOMContentLoaded', function(event) {
	var list = document.querySelectorAll('img')
	var host = document.location.host

	for(var i = 0; i < list.length; i++) {
		// TODO: add the root of the images domain to the link
			// eg: img src = 'img/pic.png'
			// =>  rootdomain + img.src
			//     micmax.pw + img/pic.png

		//  list[i].src
		// 'http://i.imgur.com/cVjim4r.jpg'
		var src = list[i].src
		var link = encodeURIComponent('http://i.imgur.com/cVjim4r.jpg')
		list[i].src = 'http://localhost:3000/' + src
	}
 })