var s = Snap('#container');
s.node.onmouseenter=function(){
	randomize();
}
s.node.onmousewheel=function(){
	randomize();
}
s.node.onmouseleave=function(){
	tidyUp();
}

function polygonMaker(points){
	var element = document.createElement('path');
	element.className = 'logo1';
	element.setAttribute('d',points);
	return element;
}

function specialRandom(){   //generates a number between 40 and 80 (either positive or negative)
	var number = Math.random()*160 - 80;
	while(-40<number && number<40){
		number = Math.random()*160 - 80;
	}
	return number;
}

function randomPointGenerator(){
	var firstX = 275 + Math.random()*275;
	var firstY = 50 + Math.random()*432; 
	var secondX = firstX + 50 + specialRandom();
	var secondY = firstY + 50 + specialRandom();
	var thirdX = firstX + 50 + specialRandom();
	var thirdY = firstY + 50 + specialRandom();
	return 'M'+firstX+' '+firstY+' '+secondX+' '+secondY+' '+thirdX+' '+thirdY+'Z';
}

function randomize(){
	s.selectAll('path').forEach(function(e){
		e.animate({d:randomPointGenerator()},1000);
	})
}


var points = [
	'M79.81 198.53 79.76 132.63 112.73 165.6Z',
	'M79.81 132.2 79.76 66.3 112.73 99.28Z',
	'M205.75 146.41 159.22 99.75 159.19 146.39Z',
	'M205.73 146.54 159.24 193.25 159.17 146.62Z',
	'M112.98 100.02 159.18 147.01 159.54 100.39Z',
	'M159.47 146.5 113.05 193.28 159.69 193.06Z',
	'M179.02 231.38 113.13 231.41 146.14 264.35Z',
	'M79.73 87.04 33.28 133.77 79.91 133.6Z',
	'M33.4 0.62 79.69 47.52 79.95 0.89Z',
	'M32.92 134.15 32.97 68.25 0 101.23Z',
	'M0.62 100.19 0.57 34.29 33.55 67.26Z',
	'M33.49 67.09 33.55 1.19 0.57 34.16Z',
	'M112.68 231.73 112.73 165.84 79.76 198.81Z',
	'M112.68 99.51 112.73 165.41 79.76 132.43Z',
	'M79.81 65.9 79.76 0 112.73 32.97Z',
	'M112.68 33.2 112.73 99.1 79.76 66.13Z'
]

function tidyUp(){
	for(var i = 1; i<=points.length ; i++){
		s.select('#logo path:nth-child('+i+')').animate({d:points[i-1]},700);
	}
}



var nodes = 0 ; 
var attr='M';
var number = 1 ; 
s.click(function(e){
	nodes++;
	if (nodes>3){
		nodes = 1; 
		attr='M';
	}

	var x = e.x;
	var y = e.y; 
	if(nodes!=3){
		attr+= x + ' ' + y + ' ';	
	}else{
		attr+= x + ' ' + y +'Z';
		console.log(attr); 
		s.select('#logo path:nth-of-type('+number+')').animate({d:attr},1000);
		number++;
		if (number>s.selectAll('#logo path').length){number = 1};
	}

})

