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

setTimeout(changeViewBox("400 500 2012.7 1200",0),0);
setTimeout(slide('#road-3',488.22,800.02,0),0);
setTimeout(slide('#road rect',0,800.02,0),0);
setTimeout(fadeStroke('#wires_right path,#wires_left path',0,0),0);

//  adjusting buildings nd shit
setTimeout(slide('#skyline',700,1210.02,0),0);
setTimeout(hide('#skyline'),0);

//	adjusting constellations

setTimeout(slide('#constellations',650,0,0),0);
setTimeout(fadeStroke('.constellation1,.constellation2',0,0),0);


// adjusting the Road Data

s.selectAll('#data_object').attr({display:'none'});
setTimeout(slide('#data_object',-150,-600,0),0);


// adjusting the buildings Data 


// adjusting the skyscrapers Data



// adjusting Tree Data

setTimeout(slide('#treeData',485,85,0),0);
setTimeout(function(){s.selectAll('#treeData polyline').animate({'stroke-dasharray':1980},0)},0);
setTimeout(function(){s.selectAll('#treeData polyline').animate({'stroke-dashoffset':1980},0)},0);
setTimeout(changeScale('#treeDataNumbers',1,0,969,1070,0),0);

//adjusting the hydropoles Data

setTimeout(slide('#data_hydroPoles',485,88,0),0);
s.selectAll('#hydroObject_x5F_right,#hydroObject_x5F_left').attr({display:'none'});
setTimeout(function(){hydroPolesWiresOut(lengths,0)},0);



function pwr(a, b) {
  var c = 1;
  for (i = 0; i < b; i++) {
    c *= a;
  }
  return c;
}

function rand(){
	return Math.floor(Math.random()*10);
}

function randGen(digits) {
	var text='';
	for(var i=0;i<digits;i++){
		text = rand() + text;
		if((i+1)%3==0 && i!==digits-1){
			text = ',' + text;
		}
	}
	return text;
}


function movingNumbers(selector,digits,tempo){
	setInterval(function(){
		s.selectAll(selector).forEach(function(element){
			element.node.innerHTML = randGen(digits);
		});
	},tempo);
}


function Translate(x,y){
	return 'matrix(1,0,0,1,'+ x +',' + y + ')';
}

function hide(selector){
	return function(){
		s.selectAll(selector).attr({display:'none'});
	}
}
function show(selector){
	return function(){
		s.selectAll(selector).attr({display:'block'});
	}
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

function setDasharray(selector,length,duration){
	return function(){
		s.selectAll(selector).animate({
			'stroke-dasharray': length,
		},duration);
	}
}

function setDashoffset(selector,length,duration){
	return function(){
		s.selectAll(selector).animate({
			'stroke-dashoffset': length,
		},duration);
	}
}

function doSetTimeout1(func,param1,delay){
	setTimeout(function(){func(param1)},delay);
}
function doSetTimeout2(func,param1,param2,delay){
	setTimeout(function(){func(param1,param2)},delay);
}
function doSetTimeout3(func,param1,param2,param3,delay){
	setTimeout(function(){func(param1,param2,param3)},delay);
}
function doSetTimeout4(func,param1,param2,param3,param4,delay){
	setTimeout(function(){func(param1,param2,param3,param4)},delay);
}
function doSetTimeout5(func,param1,param2,param3,param4,param5,delay){
	setTimeout(function(){func(param1,param2,param3,param4,param5)},delay);
}

function shift(number,tobeAdded){
	return number+tobeAdded;
}

function scale(scalex,scaley,x,y){
	return "matrix("+scalex+", 0, 0,"+scaley+", "+ (x-scalex*x) +"," + (y-scaley*y) +")";
}

// var wires_data_left_lengths = [55,90,135,230,634];
var lengths = [55,90,135,230,634];
function strokeDanceWireOut(index,length,duration){
	s.selectAll('#hydroWires .wire' + index + ' path').animate({'stroke-dasharray':length},0);
	s.selectAll('#hydroWires .wire' + index + ' path').animate({'stroke-dashoffset':-length},duration);
	s.selectAll('#hydroWires .wire' + index + ' text').attr({'display':'none'});
}

function strokeDanceWireIn(index,length,duration){
	s.selectAll('#hydroWires .wire' + index + ' path').animate({'stroke-dasharray':length},0);
	s.selectAll('#hydroWires .wire' + index + ' path').attr({'stroke-dashoffset':length});
	s.selectAll('#hydroWires .wire' + index + ' path').animate({'stroke-dashoffset':0},duration);
	s.selectAll('#hydroWires .wire' + index + ' text').attr({'display':'block'});
}


function hydroPolesWiresOut(lengths,duration){
	for(var i=1;i<6;i++){
		doSetTimeout3(strokeDanceWireOut,i,lengths[i-1],duration,(i-1)*duration);
	}
}
function hydroPolesWiresIn(lengths,duration){
	for(var i=1;i<6;i++){
		doSetTimeout3(strokeDanceWireIn,i,lengths[i-1],duration,(i-1)*duration);
	}
}





var step1 = 0;
// road starting time: 0-600 
// diff : 600

setTimeout(fadeFill('#road-3',1,500),shift(100,step1));
setTimeout(slide('#road-3',485.22,74.02,500),shift(100,step1));
setTimeout(fadeFill('#road rect',1,500),shift(100,step1));
setTimeout(slide('#road rect',0,0,500),shift(100,step1));		

var step2 = 600 ;
var off2 = 0;

//lane paint: 600-900
//diff: 900

setTimeout(fadeFill('#lane_paint_path',1,300),shift(0,step2));



var step3 = 900 + off2;
var off3 = 0; 
// Trees : 900-1800
// diff: 900




var step4 = 1800 + off2 + off3;
// Buildings : 1800-2200
//diff : 400

setTimeout(show('#skyline'),shift(0,step4));
for (var i=1;i<13;i++){
	if(i<10){
		setTimeout(slide('#skyline #group0'+i,0,-650,200),shift(100+i*100,step4));
	} else{
		setTimeout(slide('#skyline #group'+i,0,-650,200),shift(100 +i*100 ,step4));
	}
}

var step5 = 2200 + off2 + off3;
var off5 = 0;

// Hydro Poles and their wires : 2200-2500
//diff : 300

setTimeout(fadeFill('#hydro_poles #left_side polygon,#hydro_poles #right_side polygon',1,300),shift(0,step5));
setTimeout(fadeStroke('#wires_left path,#wires_right path',1,300),shift(0,step5));
setTimeout(function(){movingNumbers('#hydroWires text',9,160)},shift(300,step5));



var off6=3500;
var step6 = 2500 + off2 + off3 + off5;
//sky scrapers : 2500-3100
// diff: 600


setTimeout(fadeFill('#skyscrapers_front rect',1,200),shift(0,step6));
setTimeout(slide('#skyscrapers_front rect',0,0,200),shift(0,step6));
setTimeout(fadeFill('#skyscrapers_middle rect',1,200),shift(200,step6)); //themselves
setTimeout(slide('#skyscrapers_middle rect',0,0,200),shift(200,step6));
setTimeout(fadeFill('#skyscrapers_back rect',1,200),shift(400,step6));
setTimeout(slide('#skyscrapers_back rect',0,0,200),shift(400,step6));

setTimeout(function(){hydroPolesWiresIn(lengths,400)},shift(600,step6));
setTimeout(function(){hydroPolesWiresOut(lengths,400)},shift(2100,step6));


var off7 = 0;
var step7 = 3100 + off2 + off3 + off5 + off6;
// change point of view : 3100-3600
// diff : 500

setTimeout(changeViewBox("300 0 2312.7 1370",500),shift(0,step7));
setTimeout(slide('#data_object',-150,-600,0),shift(0,step7));

var step8 = 3600 + off2 + off3 + off5 + off6 + off7;
// sunset : 3600-5300
// diff : 1700

setTimeout(changeFill('#theSky','#F55320',1000),shift(0,step8));
setTimeout(slide('#cloud_pattern',-1200,-1200,4000),shift(-1800,step8));  
setTimeout(fadeFill('#cloud_pattern',0.8,1900),shift(-1300,step8));
setTimeout(changeFill('#theSky','#0E2842',2000),shift(1000,step8));
setTimeout(slide('#cloud_pattern',900,900,4000),shift(1200,step8));  
setTimeout(fadeFill('#cloud_pattern',0.3,1000),shift(300,step8));
setTimeout(fadeFill('#cloud_pattern',0,400),shift(1300,step8));


var step9 = 5000 + off2 + off3 + off5 + off6 + off7;
// appearance of stars : 5000-7000
// diff: 2000


setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:1},1000)},shift(-1000,step9));
setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:1},500)},shift(500,step9));
setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:1},500)},shift(1300,step9));
setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:1},500)},1000)},shift(1000,step9));
setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:0},500)},1000)},shift(1500,step9));


var step10 = 7000 + off2 + off3 + off5 + off6 + off7;
//appearance of dem constellations : 7000-
//diff : who cares? it's looking awesome! 

setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:0.1},500)},shift(0,step10));
setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:0.1},500)},shift(0,step10));
setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:0.1},500)},shift(0,step10));

setTimeout(function(){s.selectAll('radialGradient stop')[8].animate({stopOpacity:1},500)},shift(500,step10));
setTimeout(fadeStroke('.constellation1,.constellation2',1,500),shift(800,step10));



