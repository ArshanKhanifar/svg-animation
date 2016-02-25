var s = Snap('#sky');

var defaultStyleColors=['url(#radial-gradient)','#29abe2','#333','#666','#999','#4d4d4d','#b3b3b3','gray','#fff'];
function loadStuff(){
	defaultStyleColors.forEach(function(element,index){
		if(index!=1){
			s.selectAll('.cls-'+(index+1)).attr({
				fillOpacity:0,  // filling other stuff
				fill:element
			},0);
		}else{s.selectAll('.cls-'+(index+1)).attr({fill:element},0);}

	})
	s.selectAll('.cls-10').attr({
		fillOpacity:0,
		stroke:'#333',								// Wires
		strokeMiterlimit:'10',
		strokeWidth:'2px'					
	},0);
	s.selectAll('radialGradient').forEach(function(element){
		element.selectAll('stop')[0].attr({
			stopOpacity:0																// makin em stars dissappear
		},0)
	})
	s.selectAll("#cloud_pattern").attr({transform:Translate(-3300,-3300),fillOpacity:0}) // dem clouds
}
loadStuff();

// makin em dissappear 

setTimeout(changeViewBox("400 700 2012.7 1200",0),0);
setTimeout(slide('#road-3',488.22,800.02,0),0);
setTimeout(slide('#road rect',0,800.02,0),0);
setTimeout(slide('#buildings2 rect',0,400,0),0);
setTimeout(slide('#skyscrapers_front rect',0,300,0),0);
setTimeout(slide('#skyscrapers_middle rect',0,300,0),0);
setTimeout(slide('#skyscrapers_back rect',0,300,0),0);
setTimeout(fadeStroke('#wires_right path,#wires_left path',0,0),0);

//	adjusting constellations

setTimeout(slide('#constellations',650,0,0),0);
setTimeout(fadeStroke('.constellation1,.constellation2',0,0),0);


// adjusting the Road Data

setTimeout(slide('#data_x5F_roadStrip',485,90,0),0);
setTimeout(function(){s.selectAll('#strip line')[0].attr({x2:969,y2:1120.1})},0);
setTimeout(changeScale('#numbers,#markers',0,0,969,1120,0),0);
s.selectAll('#data_object').attr({display:'none'});


// adjusting Tree Data

setTimeout(slide('#treeData_x5F_1st_x5F_row',485,85,0),0);
setTimeout(function(){s.selectAll('#treeData_x5F_1st_x5F_row polyline').animate({'stroke-dasharray':1980},0)},0);
setTimeout(function(){s.selectAll('#treeData_x5F_1st_x5F_row polyline').animate({'stroke-dashoffset':1980},0)},0);
setTimeout(changeScale('#treeDataNumbers',1,0,969,1070,0),0);


//adjusting the hydropoles Data

setTimeout(slide('#data_x5F_hydroPoles',485,88,0),0);
for (var i = 1; i < 7 ; i++){
	s.selectAll('#_x30_'+i)[0].selectAll('line').attr({display:'none'});
	s.selectAll('#numbers_'+i+'_').attr({display:'none'});
}
s.selectAll('#wire_x5F_left g,#wire_x5F_right g').attr({display:'none'});
s.selectAll('#hydroObject_x5F_right,#hydroObject_x5F_left').attr({display:'none'});



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

function changeScale(selector,scaleValx,scaleValy,x,y,duration){
	return function(){
		s.selectAll(selector).animate({
			transform:scale(scaleValx,scaleValy,x,y),
		},duration)
	}
}

function shift(number,tobeAdded){
	return number+tobeAdded;
}

function scale(scalex,scaley,x,y){

	return "matrix("+scalex+", 0, 0,"+scaley+", "+ (x-scalex*x) +"," + (y-scaley*y) +")";
}


function hydroPowerDatahelper(selector,side,attr){
	return s.selectAll(selector)[0].selectAll('line')[side].attr(attr) ;
}
function hydroPowerData(selector,side){
	var x1 = hydroPowerDatahelper(selector,side,'x1');
	var y1 = hydroPowerDatahelper(selector,side,'y1');
	var x2 = hydroPowerDatahelper(selector,side,'x2');
	var y2 = hydroPowerDatahelper(selector,side,'y2');
	s.selectAll(selector)[0].selectAll('line')[side].attr({'x2':x1,'y2':y1}) ;
	s.selectAll(selector)[0].selectAll('line').attr({display:"block"});
	s.selectAll(selector)[0].selectAll('line')[side].animate({x2:x2,y2:y2},300) ;
	s.selectAll('#numbers_'+selector.slice(6,7)+'_').attr({display:'block'});

}
function doSetTimeoutHydro(selector,side,delay){
	setTimeout(function(){hydroPowerData(selector,side)},delay);
}

function hydroWire(index){
	s.selectAll('#wire_x5F_left g')[4-index].attr({display:'block'});
	s.selectAll('#wire_x5F_right g')[4-index].attr({display:'block'});
}
function doSettimeoutHydroWire(index,delay) {
	setTimeout(function(){hydroWire(index)},delay);

}



var step1 = 0;
// road starting time: 0-600 
// diff : 600

setTimeout(fadeFill('#road-3',1,500),shift(100,step1));
setTimeout(slide('#road-3',485.22,74.02,500),shift(100,step1));
setTimeout(fadeFill('#road rect',1,500),shift(100,step1));
setTimeout(slide('#road rect',0,0,500),shift(100,step1));		

var step2 = 600 ;
var off2 = 600;
//lane paint: 600-900
//diff: 900

setTimeout(fadeFill('#lane_paint_path',1,300),shift(0,step2));
setTimeout(function(){s.selectAll('#strip line')[0].animate({x2:974,y2:1925},300)},shift(300,step2));
setTimeout(changeScale('#numbers,#markers',1,1,969,1120,600),shift(300,step2));



var step3 = 900 + off2;
var off3 = 800; 
// Trees : 900-1800
// diff: 900

setTimeout(fadeFill('#_1st_row path',1,300),shift(0,step3));
setTimeout(fadeFill('#_2nd_row path',1,300),shift(300,step3));
setTimeout(fadeFill('#_3rd_row path',1,300),shift(600,step3));
setTimeout(function(){s.selectAll('#treeData_x5F_1st_x5F_row polyline').animate({'stroke-dashoffset':0},500)},shift(900,step3));
setTimeout(changeScale('#treeDataNumbers',1,1,969,1070,300),shift(1400,step3));
setTimeout(function(){s.selectAll('#data_object').attr({display:'block'})},shift(1700,step3));




var step4 = 1800 + off2 + off3;
// Buildings : 1800-2200
//diff : 400

setTimeout(fadeFill('#buildings1 rect',1,200),shift(0,step4));
setTimeout(fadeFill('#buildings2 rect',1,200),shift(200,step4));
setTimeout(slide('#buildings2 rect',0,0,200),shift(200,step4));


var step5 = 2200 + off2 + off3;
var off5 = 2200;
// Hydro Poles and their wires : 2200-2500
//diff : 300

setTimeout(fadeFill('#hydro_poles #left_side polygon,#hydro_poles #right_side polygon',1,300),shift(0,step5));
setTimeout(fadeStroke('#wires_left path,#wires_right path',1,300),shift(0,step5));
setTimeout(function(){
	for (var i = 1; i < 7 ; i++){
		doSetTimeoutHydro('#_x30_'+i,0,200*(i-1));
		doSetTimeoutHydro('#_x30_'+i,1,200*(i-1));
	}

},shift(300,step5));
setTimeout(function(){
	for (var i = 0; i < 5 ; i++){
		doSettimeoutHydroWire(i,i*200)
	}

},shift(1500,step5));





var step6 = 2500 + off2 + off3 + off5;
//sky scrapers : 2500-3100
// diff: 600

setTimeout(fadeFill('#skyscrapers_front rect',1,200),shift(0,step6));
setTimeout(slide('#skyscrapers_front rect',0,0,200),shift(0,step6));
setTimeout(fadeFill('#skyscrapers_middle rect',1,200),shift(200,step6));
setTimeout(slide('#skyscrapers_middle rect',0,0,200),shift(200,step6));
setTimeout(fadeFill('#skyscrapers_back rect',1,200),shift(400,step6));
setTimeout(slide('#skyscrapers_back rect',0,0,200),shift(400,step6));



var step7 = 3100 + off2 + off3 + off5;
// change point of view : 3100-3600
// diff : 500

setTimeout(changeViewBox("300 0 2312.7 1370",500),shift(0,step7));
setTimeout(slide('#data_object',0,-600,500),shift(0,step7));

var step8 = 3600 + off2 + off3 + off5;
// sunset : 3600-5300
// diff : 1700

setTimeout(changeFill('#theSky','#F55320',1000),shift(0,step8));
setTimeout(slide('#cloud_pattern',-1200,-1200,4000),shift(-1800,step8));  
setTimeout(fadeFill('#cloud_pattern',0.8,1900),shift(-1300,step8));
setTimeout(changeFill('#theSky','#0E2842',2000),shift(1000,step8));
setTimeout(slide('#cloud_pattern',900,900,4000),shift(1200,step8));  
setTimeout(fadeFill('#cloud_pattern',0.3,1000),shift(300,step8));
setTimeout(fadeFill('#cloud_pattern',0,400),shift(1300,step8));


var step9 = 5000 + off2 + off3 + off5;
// appearance of stars : 5000-7000
// diff: 2000


setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:1},1000)},shift(-1000,step9));
setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:1},500)},shift(500,step9));
setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:1},500)},shift(1300,step9));
setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:1},500)},1000)},shift(1000,step9));
setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:0},500)},1000)},shift(1500,step9));


var step10 = 7000 + off2 + off3 + off5;
//appearance of dem constellations : 7000-
//diff : who cares? it's looking awesome! 

setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:0.1},500)},shift(0,step10));
setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:0.1},500)},shift(0,step10));
setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:0.1},500)},shift(0,step10));

setTimeout(function(){s.selectAll('radialGradient stop')[8].animate({stopOpacity:1},500)},shift(500,step10));
setTimeout(fadeStroke('.constellation1,.constellation2',1,500),shift(800,step10));



