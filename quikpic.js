document.addEventListener('DOMContentLoaded', function(event) {
	var list = document.querySelectorAll('img')
	// TODO: get base url of website
	var base = 

	for(var i = 0; i < list.length; i++) {
		// TODO: escape the link
		// TODO: add the root of the images domain to the link
			// eg: img src = 'img/pic.png'
			// =>  rootdomain + img.src
			//     micmax.pw + img/pic.png

		// replace imgur image with list[i].src
		// 'http://i.imgur.com/cVjim4r.jpg'
		var link = encodeURIComponent(base + list[i].src)
		list[i].src = 'http://localhost:3000/' + link
	}
 })