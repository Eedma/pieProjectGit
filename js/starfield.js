// We set up the canvas width and height here rather than in the CSS, because otherwise it will scale rather than actually get bigger.

// Set up canvas with full screen width and height
var canvas = document.getElementById('starfield');
canvas.width=document.body.clientWidth;
canvas.height=document.body.clientHeight;
var ctx = canvas.getContext('2d');

// Next we create a few variables to hold things like our stars and settings.  You can probably guess what they’ll be used for.

// Set the number of stars to draw
var stars=[];
var numStars=111;
var speed=1;

// Here’s the function that creates a star.

// Reset a star
//modificare la dunzione makestar per annullare lo spostamento orizzontale
function makeStar() {
	return {
		x: Math.random(),
		y: Math.random(),
		distance: Math.sqrt(Math.random()),
	 	// color: 'hsl('+Math.random()*40+',100%,'+(70+Math.random()*30)+'%)'
		color: '#fff'
	};
}


// We’re setting everything to be pretty random here.  Note that Math.random()  creates a number between 0 and 1, so we’ll need to put that into context later.  We Math.sqrt()  the random number for the distance, so that it’s weighted more towards closer stars; these will move faster, so we need more of them there.  The logic in the colour is simply giving us a star that is mostly white but with a slight tint between red and yellow.  It’s worth checking out hsl() and hsla() if you haven’t already, it’s pretty useful!
//
// Now we can initialise our stars array.
for (i=0;i<numStars;i++) {
	stars[i]=makeStar();
}

// Next we’ve got a function to draw the stars.  I’ve put it in a function because we’ll be calling it multiple times shortly.

// Draw stars
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

// First off we clear whatever might be on the canvas already.  Modern browsers handle output buffering quite well, so we don’t need to bother about manually double-buffering to avoid the flickering.
// Before we draw each star, we move it.  How far it moves depends how close it is to us, and we’re using Math.pow()  to weight it correctly.  This is the inverse of the Math.sqrt()  we used when setting the distance of the star.  We’re also transforming that 0-1 value into something relative to the canvas width.  We also check whether the star has moved off-screen, and reset it if we need to.
// And then we actually draw the star on the canvas.  I’ve given it a semi-transparent stroke, to simulate a blur effect.
// Finally, we call the updateStars()  function every 30 milliseconds so we get a nice smooth animation.


// Redraw the stars every 30 milliseconds
setInterval(function(){
	updateStars();
},30);
