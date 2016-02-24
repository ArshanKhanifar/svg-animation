var s = Snap('#sky');

var defaultStyleColors=['url(#radial-gradient)','#29abe2','#333','#666','#999','#4d4d4d','#b3b3b3','gray','#fff'];
function loadStuff(){
	defaultStyleColors.forEach(function(element,index){
		s.selectAll('.cls-'+(index+1)).attr({
			fillOpacity:1,  // filling other stuff
			fill:element
		},0);
	})
	s.selectAll('.cls-10').attr({
		fillOpacity:0,
		stroke:'#333',					// Wires
		strokeMiterlimit:'10',
		strokeWidth:'2px'					
	},0);
	s.selectAll('radialGradient').forEach(function(element,index){
		element.selectAll('stop')[0].attr({
			stopOpacity:0					// makin em stars dissappear
		},0)
	})
	s.selectAll("#cloud_pattern").attr({transform:Translate(-3300,-3300),fillOpacity:0}) // dem clouds
}
loadStuff();

// makin em dissappear 

setTimeout(changeViewBox("400 700 2012.7 1200",0),0);
setTimeout(fadeFill('#road-3',0,0),0);
setTimeout(fadeFill('#lane_paint_path',0,0),0);
setTimeout(fadeFill('#road rect',0,0),0);
setTimeout(slide('#road-3',488.22,800.02,0),0);
setTimeout(slide('#road rect',0,800.02,0),0);
setTimeout(fadeFill('#_1st_row path',0,0),0);
setTimeout(fadeFill('#_2nd_row path',0,0),0);
setTimeout(fadeFill('#_3rd_row path',0,0),0);
setTimeout(fadeFill('#buildings1 rect',0,0),0);
setTimeout(fadeFill('#buildings2 rect',0,0),0);
setTimeout(slide('#buildings2 rect',0,400,0),0);
setTimeout(fadeFill('#skyscrapers_front rect',0,0),0);
setTimeout(fadeFill('#skyscrapers_middle rect',0,0),0);
setTimeout(fadeFill('#skyscrapers_back rect',0,0),0);
setTimeout(slide('#skyscrapers_front rect',0,300,0),0);
setTimeout(slide('#skyscrapers_middle rect',0,300,0),0);
setTimeout(slide('#skyscrapers_back rect',0,300,0),0);
setTimeout(fadeFill('#hydro_poles #left_side polygon',0,0),0);
setTimeout(fadeFill('#wires_left path',0,0),0);
setTimeout(fadeFill('#hydro_poles #right_side polygon',0,0),0);
setTimeout(fadeFill('#wires_right path',0,0),0);
setTimeout(fadeStroke('#wires_right path',0,0),0);
setTimeout(fadeStroke('#wires_left path',0,0),0);




function Translate(x,y){
	return 'matrix(1,0,0,1,'+ x +',' + y + ')';
}

function fadeFill(selector,alpha,duration){
	return function(){
		s.selectAll(selector).animate({
			fillOpacity:alpha,

		},duration);
	}
}
function fadeStroke(selector,alpha,duration){
	return function(){
		s.selectAll(selector).animate({
			strokeOpacity:alpha,
		},duration);
	}
}
function slide(selector,x,y,duration){
	return function(){
		s.selectAll(selector).animate({
			transform: Translate(x,y)
		},duration);
	}
}
function changeViewBox(values,duration){
	return function() {
		s.animate({
			viewBox: values,
		},duration)
	}
}
function changeFill(selector,color,duration){
	return function() {
		s.selectAll(selector).animate({
			fill: color,
		},duration)
	}
}

function shift(number,tobeAdded){
	return number+tobeAdded;
}


setTimeout(fadeFill('#road-3',1,500),shift(100,0));
setTimeout(slide('#road-3',485.22,74.02,500),shift(100,0));
setTimeout(fadeFill('#road rect',1,500),shift(100,0));
setTimeout(slide('#road rect',0,0,500),shift(100,0));
setTimeout(fadeFill('#lane_paint_path',1,300),shift(600,0));
setTimeout(fadeFill('#_1st_row path',1,300),shift(900,0));
setTimeout(fadeFill('#_2nd_row path',1,300),shift(1200,0));
setTimeout(fadeFill('#_3rd_row path',1,300),shift(1500,0));
setTimeout(fadeFill('#buildings1 rect',1,200),shift(1800,0));
setTimeout(fadeFill('#buildings2 rect',1,200),shift(2000,0));
setTimeout(slide('#buildings2 rect',0,0,200),shift(2000,0));
setTimeout(fadeFill('#hydro_poles #left_side polygon',1,150),shift(2200,0));
setTimeout(fadeStroke('#wires_left path',1,150),shift(2200,0));
setTimeout(fadeFill('#hydro_poles #right_side polygon',1,150),shift(2350,0));
setTimeout(fadeStroke('#wires_right path',1,150),shift(2350,0));
setTimeout(fadeFill('#skyscrapers_front rect',1,200),shift(2500,0));
setTimeout(slide('#skyscrapers_front rect',0,0,200),shift(2500,0));
setTimeout(fadeFill('#skyscrapers_middle rect',1,200),shift(2700,0));
setTimeout(slide('#skyscrapers_middle rect',0,0,200),shift(2700,0));
setTimeout(fadeFill('#skyscrapers_back rect',1,200),shift(2900,0));
setTimeout(slide('#skyscrapers_back rect',0,0,200),shift(2900,0));
setTimeout(changeViewBox("400 0 2012.7 1400",500),shift(3100,0));
setTimeout(changeFill('#theSky','#F55320',1000),shift(3600,0));
setTimeout(function(){s.selectAll("#cloud_pattern").animate({transform:Translate(-1200,-1200)},4000)},shift(1800,0));
setTimeout(function(){s.selectAll("#cloud_pattern").animate({fillOpacity:0.8},1900)},shift(2300,0));
setTimeout(changeFill('#theSky','#0E2842',2000),shift(4600,0));
setTimeout(function(){s.selectAll("#cloud_pattern").animate({transform:Translate(900,900)},4000)},shift(5800,0));
setTimeout(function(){s.selectAll("#cloud_pattern").animate({fillOpacity:0.3},1000)},shift(3900,0));
setTimeout(function(){s.selectAll("#cloud_pattern").animate({fillOpacity:0},400)},shift(4900,0));
setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:1},500)},1000)},shift(7200,0));
setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:0},500)},1000)},shift(7700,0));
setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:1},1000)},shift(5000,0));
setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:1},500)},shift(5800,0));
setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:1},500)},shift(6300,0));



function roadBackgroundFadeFillIn(){
	s.select('#road rect').animate({
		fillOpacity:0,
	},0);
}

