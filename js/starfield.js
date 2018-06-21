var canvas = document.getElementById('starfield');
canvas.width=document.body.clientWidth;
canvas.height=document.body.clientHeight;
var ctx = canvas.getContext('2d');
var stars=[];
var numStars=111;
var speed=1;
function makeStar() {
	return {
		x: Math.random(),
		y: Math.random(),
		distance: Math.sqrt(Math.random()),
		color: '#fff'
	};
}
for (i=0;i<numStars;i++) {
	stars[i]=makeStar();
}
function updateStars() {
	// Clear canvas
	ctx.clearRect(0,0,canvas.width,canvas.height);
	// Draw each star
	for (i=0;i<numStars;i++) {
		// Move the star first
		stars[i].x-=Math.pow(stars[i].distance,2)/canvas.width*speed;
		// If it's off-screen, reset it
		if (stars[i].x<=0) {
			stars[i]=makeStar();
			stars[i].x=1;
		}
		// Draw the star
		ctx.beginPath();
		ctx.arc(stars[i].x*canvas.width,stars[i].y*canvas.height,stars[i].distance*2,0,2*Math.PI,false);
		ctx.lineWidth=stars[i].distance*4;
		ctx.strokeStyle='rgba(255,255,255,0.2)';
		ctx.stroke();
		ctx.fillStyle=stars[i].color;
		ctx.fill();
	}
}
// Redraw the stars every 30 milliseconds
setInterval(function(){
	updateStars();
},30);
