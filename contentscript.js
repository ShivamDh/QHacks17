//alert ("hello");
//document.body.style.background = 'yellow';

var list = document.querySelectorAll("img");
console.log(list.length)
for(var i = 0; i < list.length; i++) {
	console.log(i)
	list[i].src = 'http://cdn-s3.si.com/s3fs-public/[current-date:custom:Y]/[current-date:custom:m]/[current-date:custom:d]/best-crying-jordan-memes.jpg'
}