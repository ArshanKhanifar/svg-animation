var s = Snap('#sky');

var defaultStyleColors=['url(#radial-gradient)','#29abe2','#333','#666','#676767','#4d4d4d','#676767','gray','#fff'];
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
hide('#roadDataMask')();
s.selectAll('#roadDataBackground path').animate({d:"M970,1420 970,1420 970.9,1420 970.9,1420"},0);
setTimeout(slide('#roadDataMask',508,1239,0),0);



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
setTimeout(function(){hydroPolesWiresOut(0)},0);



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
function slide(selector,x,y,duration,easing){
	if (easing === undefined){easing = mina.linear};
	return function(){
		s.selectAll(selector).animate({
			transform: Translate(x,y)
		},duration,easing);
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
function changeStroke(selector,color){
	return function() {
		s.selectAll(selector).attr({style:'stroke:'+color});
		// s.selectAll(selector).animate({
		// 	style: 'stroke : ' + color,
		// },duration);
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

function setTimeoutFixed() {
	//first param = function
	var func = arguments[0];
	var params =[];
	for (var i = 1 ; i < arguments.length - 1; i++){
		params.push(arguments[i]);
	}
	var delay = arguments[arguments.length - 1];
	setTimeout(function(){func.apply(null,params)},delay);
}

function draw(selector,duration,reverse,out){
	return function(){
		var elements = s.selectAll(selector);
		elements.forEach(function(element){
			var length = element.getTotalLength();
			var offsetInit;
			var offsetFinal;
			if(reverse && !out ){
				offsetInit = -length;
				offsetFinal = 0;
			}else if(reverse && out){
				offsetInit = 0;
				offsetFinal = length;
			}else if(!reverse && out){
				offsetInit = 0;
				offsetFinal = -length;
			}else if (!reverse && !out){
				offsetInit = length;
				offsetFinal = 0;
			}
			element.attr({
				'stroke-dasharray':length,
				'stroke-dashoffset':offsetInit,
				'stroke': '#00FFFF' 
			});
			element.animate({'stroke-dashoffset': offsetFinal }, duration);
		})	
	}
}

function window1(){
	for (var i = 1; i < 9 ; i++){
		setTimeout(changeFill('#_'+i+'-2','#00FFFF',100),i*60);
	}
	for (var i = 1; i < 9 ; i++){
		setTimeout(changeFill('#_'+i+'-2','black',100),480+i*60);
	}
}

function window2(){
	var numberRight = s.selectAll('#window2 .right line').length;
	for (var i = 1; i < numberRight+1 ; i++){
		setTimeout(changeStroke('#window2 .right line:nth-of-type('+i+')','#00FFFF'),i*1);
	}
	for (var i = 1; i < numberRight+1 ; i++){
		setTimeout(changeStroke('#window2 .right line:nth-of-type('+i+')','#000000'),numberRight*1+i*1);
	}
	var numberLeft = s.selectAll('#window2 .left line').length;
	for (var i = 1; i < numberLeft+1 ; i++){
		setTimeout(changeStroke('#window2 .left line:nth-of-type('+i+')','#00FFFF'),shift(numberRight*2*1,i*1));
	}
	for (var i = 1; i < numberLeft+1 ; i++){
		setTimeout(changeStroke('#window2 .left line:nth-of-type('+i+')','#000000'),shift(numberRight*2*1,numberLeft*1+i*1));
	}
}

function window3(){
	var number = s.selectAll('#window3 line').length;
	for (var i = 1; i < number+1 ; i++){
		setTimeout(changeStroke('#window3 line:nth-of-type('+i+')','#00FFFF'),i*10);
	}
	for (var i = 1; i < number+1 ; i++){
		setTimeout(changeStroke('#window3 line:nth-of-type('+i+')','#000000'),number*10+i*10);
	}
}
function window4(){
	var number = s.selectAll('#window4 line').length;
	for (var i = 1; i < number+1 ; i++){
		setTimeout(changeStroke('#window4 line:nth-of-type('+(number+1-i)+')','#00FFFF'),i*10);
	}
	for (var i = 1; i < number+1 ; i++){
		setTimeout(changeStroke('#window4 line:nth-of-type('+(number+1-i)+')','#000000'),number*10+i*10);
	}
}

function CNLit(){
	changeFill('#CN_tower-2','#00FFFF',100)();
}

function roadLit(){
	s.selectAll('#roadDataBackground path').animate({d:"M19,1925 940,1167 1000.9,1167 1909,1926"},0,mina.easeout)
	s.selectAll('#roadDataBackground path').animate({style:'fill:rgba(0,0,0,0)'},0);
	s.selectAll('#roadDataBackground path').animate({style:'fill:#00FFFF'},1000);

}




function shift(number,tobeAdded){
	return number+tobeAdded;
}

function scale(scalex,scaley,x,y){
	return "matrix("+scalex+", 0, 0,"+scaley+", "+ (x-scalex*x) +"," + (y-scaley*y) +")";
}

function strokeDanceWireOut(index,duration){
	setTimeout(draw('#hydroWires .wire' + index + ' path',duration,false,true),0);
	s.selectAll('#hydroWires .wire' + index + ' text').attr({'display':'none'});
}

function strokeDanceWireIn(index,duration){
	setTimeout(draw('#hydroWires .wire' + index + ' path',duration,false,false),0);
	s.selectAll('#hydroWires .wire' + index + ' text').attr({'display':'block'});
}


function hydroPolesWiresOut(duration){
	for(var i=1;i<6;i++){
		setTimeoutFixed(strokeDanceWireOut,i,duration,(i-1)*duration);
	}
}
function hydroPolesWiresIn(duration){
	for(var i=1;i<6;i++){
		setTimeoutFixed(strokeDanceWireIn,i,duration,(i-1)*duration);
	}
}






var step1 = 0;
// road starting time: 0-600 
// diff : 600

setTimeout(fadeFill('#road-3',1,500),shift(100,step1));
setTimeout(slide('#road-3',485.22,74.02,500),shift(100,step1));
setTimeout(fadeFill('#road rect',1,500),shift(100,step1));
setTimeout(slide('#road rect',0,0,500),shift(100,step1));	
setTimeout(show('#roadDataMask'),shift(600,step1));	
var step2 = 600 ;
var off2 = 0;

//lane paint: 600-900
//diff: 900

setTimeout(fadeFill('#lane_paint_path',1,300),shift(0,step2));



var step3 = 900 + off2;
var off3 = 0; 
// Trees : 900-1800
// diff: 900




var step4 = 900 + off2 + off3;
// Tdott : 900-2200
//diff : 400

setTimeout(show('#skyline'),shift(0,step4));
for (var i=1;i<13;i++){
	if(i<10){
		setTimeout(slide('#skyline #group0'+i,0,-650,200),shift(i*100,step4));
	} else{
		setTimeout(slide('#skyline #group'+i,0,-650,200),shift(i*100 ,step4));
	}
}
for (var i = 1 ; i < 6 ; i++){
	setTimeout(slide('#skyline #window'+i,0,-650,200),shift(500+i*100,step4));
}
setTimeout(slide('#skyline #CN_tower-2',0,-650,200),shift(12*100,step4));

var step5 = 2300 + off2 + off3;
var off5 = 0;

// Hydro Poles and their wires : 2200-2500
//diff : 300

setTimeout(fadeFill('#hydro_poles #left_side polygon,#hydro_poles #right_side polygon',1,300),shift(0,step5));
setTimeout(fadeStroke('#wires_left path,#wires_right path',1,300),shift(0,step5));
setTimeout(function(){movingNumbers('#hydroWires text',9,160)},shift(300,step5));



var off6=5000;
var step6 = 2000 + off2 + off3 + off5;
//windows and hydropole wires : 2500-3100
// diff: 600

setTimeout(window4,shift(500,step6));
setTimeout(window3,shift(900,step6));	
setTimeout(window1,shift(1400,step6));
setTimeout(window2,shift(1000,step6));
setTimeout(CNLit,shift(2000,step6));

setTimeout(function(){hydroPolesWiresIn(400)},shift(2600,step6));
setTimeout(function(){hydroPolesWiresOut(400)},shift(4100,step6));


setTimeout(roadLit,shift(3500,step6));





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
setTimeout(fadeStroke('.constellation1,.constellation2',1,0),shift(-700,step10));
setTimeout(draw('#constellations path',0,false,true),shift(-700,step10));
setTimeout(draw('#constellations path',700,false,false),shift(300,step10));



