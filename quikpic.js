document.addEventListener("DOMContentLoaded", function(event) {
	console.log("DOM fully loaded and parsed")
	var list = document.querySelectorAll("img")
	//we have the image urls stored in 'list' array
	console.log(list.length)
	// var urlArray[list.length()];
	for(var i = 0; i < list.length; i++) {
		// urlArray[i] = list[i];
		// set the src = ourdomain/link-to-image
		
		list[i].src = 'https://5a5d33f9.ngrok.io/a'
		//list[i].src = some local host website url?
		//list[i].src = 'http://quikpic.net.s3-website.ca-central-1.amazonaws.com/' + list[i].src
	}
 })