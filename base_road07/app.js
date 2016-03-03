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
slide('#wires-poles',225,240,100)();
s.selectAll('#Poles_left use,#Poles_right use').forEach(function(element){element.attr('display','none')});

//  adjusting buildings nd shit

setTimeout(slide('#skyline',700,1210.02,0),0);
setTimeout(hide('#skyline'),0);
setTimeout(slide('#V-shape',548,240.02,0),0);
setTimeout(slide('#window6,#window7',35,0,0),0);
draw('#wires_left path,#wires_right path',0,false,true)();


// adjusting buildings colors

s.selectAll('.skyline_Tdot-2, .skyline_Tdot-3, .skyline_Tdot-4, .skyline_Tdot-5, .skyline_Tdot-6, .skyline_Tdot-7, .skyline_Tdot-8').forEach(function(element){
	element.attr('fill','white');
	})
s.selectAll('.skyline_Tdot-2, .skyline_Tdot-4').forEach(function(element){
	element.attr('fill','#989898');
})


//	adjusting constellations

setTimeout(slide('#constellations',650,0,0),0);
setTimeout(fadeStroke('.constellation1,.constellation2',0,0),0);


// 	adjusting constellations data

setTimeout(slide('#dataConstellations',710,100,0),0);


// adjusting the Road Data
hide('#roadDataMask')();
s.selectAll('#roadDataBackground path').attr({d:"M68,1925 924,1177 1009.9,1178 1847,1926"});
s.selectAll('#roadDataBackground').attr({fill:"#676767"});
setTimeout(slide('#roadDataMask',508,1249,0),0);
setTimeout(slide('#roadBranch1',1470,1262,0),0);
setTimeout(slide('#roadBranch2',1348,1264,0),0);


// adjusting the buildings Data 


// adjusting the skyscrapers Data



// adjusting Tree Data

setTimeout(slide('#treeData',485,85,0),0);
setTimeout(changeScale('#treeDataNumbers',1,0,969,1070,0),0);

//adjusting the hydropoles Data




function pwr(a, b) {
  var c = 1;
  for (i = 0; i < b; i++) {
    c *= a;
  }
  return c;
}

function rand(n){
	return Math.floor(Math.random()*n);
}

function randGen(digits) {
	var text='';
	for(var i=0;i<digits;i++){
		text = rand(10) + text;
		if((i+1)%3==0 && i!==digits-1){
			text = ',' + text;
		}
	}
	return text;
}
function randColorGen(){
	var txt ='';
	txt+='rgb(' + (100+rand(156)) + ',' + (100+rand(156) )+ ',' + (100+rand(156)) +')';
	return txt;
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

function draw(selector,duration,reverse,out,color,easing){
	if (color == undefined) { color = '#00FFFF'};
	if (easing == undefined) { easing = mina.linear};
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
				'stroke': color 
			});
			element.animate({'stroke-dashoffset': offsetFinal }, duration,easing);
		})	
	}
}

function showHydroPoles(){
	var polesLeft = s.selectAll('#Poles_left use');
	var nLeft = polesLeft.length;
	for (var i = 0  ; i < nLeft ; i++){setTimeoutFixed(function(j){polesLeft[nLeft-j-1].attr('display','block');},i,100*i);
	}
	var polesRight = s.selectAll('#Poles_right use');
	var nRight = polesRight.length;
	for (var i = 0  ; i < nRight ; i++){setTimeoutFixed(function(j){polesRight[nRight-j-1].attr('display','block');},i,100*i);
	}
}




function window1(duration){
	var n = s.selectAll('#window7 path').length;
	var interval = duration/n;
	for (var i = 1; i <=n; i++){
		setTimeout(changeFill('#window7 path:nth-of-type('+i+')','#00FFFF',interval),interval*i);
	}
		for (var i = 1; i <=n; i++){
		setTimeout(changeFill('#window7 path:nth-of-type('+i+')','black',interval),n*interval+interval*i);
	}
}

function window2(duration){
	var n = s.selectAll('#window4 line').length;
	var interval = duration/n;
	for (var i = 1; i < n+1 ; i++){
		setTimeout(changeStroke('#window4 line:nth-of-type('+(n+1-i)+')','#00FFFF'),i*interval);
	}
	for (var i = 1; i < n+1 ; i++){
		setTimeout(changeStroke('#window4 line:nth-of-type('+(n+1-i)+')','#000000'),n*interval+i*interval);
	}
}

function window3(duration){
	var n = s.selectAll('#window6 rect').length;
	var interval = duration/n;
	for (var i = 1; i <=n; i++){
		setTimeout(changeFill('#window6 rect:nth-of-type('+i+')','#00FFFF',interval),interval*i);
	}
		for (var i = 1; i <=n; i++){
		setTimeout(changeFill('#window6 rect:nth-of-type('+i+')','black',interval),n*interval+interval*i);
	}
}

function window4(duration){
	var n = s.selectAll('#window3 line').length;
	var interval = duration/n;	
	for (var i = 1; i < n+1 ; i++){
		setTimeout(changeStroke('#window3 line:nth-of-type('+i+')','#00FFFF'),i*interval);
	}
	for (var i = 1; i < n+1 ; i++){
		setTimeout(changeStroke('#window3 line:nth-of-type('+i+')','#000000'),n*interval+i*interval);
	}
}

function window5(duration){
	var n = 8;
	var interval = duration/n;
	for (var i = 1; i < 9 ; i++){
		setTimeout(changeFill('#_'+i+'-2','#00FFFF',100),i*interval);
	}
	for (var i = 1; i < 9 ; i++){
		setTimeout(changeFill('#_'+i+'-2','black',100),interval*n+i*interval);
	}
}

function window6(){
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

function window7(duration){
	var n = 6;
	interval = duration/n;
	for (var i = 1; i < n+1 ; i++){
		setTimeout(changeFill('#vShape_0'+i+' rect','#00FFFF',100),interval*i);
	} 
	for (var i = 1; i < n+1 ; i++){
		setTimeout(changeFill('#vShape_0'+i+' rect','black',100),n*interval + interval*i);
	}

}



function CNLit(){
	var i = 0
	setInterval(function(){
		var colors = ['#ff6666','#0066ff','#00cc00','#ff33cc','#ffff00'];
		s.selectAll('#CN_tower-2').animate({fill:colors[i]},800);
		i++;
		if(i>4){i=0};
	},1000)
}


function buildingsColor(duration){
	s.selectAll('.skyline_Tdot-2, .skyline_Tdot-3, .skyline_Tdot-4, .skyline_Tdot-5, .skyline_Tdot-6, .skyline_Tdot-7, .skyline_Tdot-8').forEach(function(element){
		element.animate({'fill':'#121E2F'},duration)
	})
	s.selectAll('.skyline_Tdot-2, .skyline_Tdot-4').forEach(function(element){
		element.animate({'fill':'#2D2D2D'},duration)
	})
	
}



function shift(number,tobeAdded){
	return number+tobeAdded;
}

function scale(scalex,scaley,x,y){
	return "matrix("+scalex+", 0, 0,"+scaley+", "+ (x-scalex*x) +"," + (y-scaley*y) +")";
}




var step1 = 0;
// road starting time: 0-600 
// diff : 700

setTimeout(fadeFill('#road rect',1,0),shift(0,step1));
setTimeout(slide('#road rect',0,0,0),shift(0,step1));

setTimeout(fadeFill('#road-3',1,500),shift(100,step1));
setTimeout(slide('#road-3',485.22,74.02,500),shift(100,step1));
setTimeout(show('#roadDataMask'),shift(700,step1));	
var step2 = 700 ;
var off2 = 0;

//lane paint: 600-900
//diff: 900

setTimeout(fadeFill('#lane_paint_path',1,300),shift(0,step2));

var step3 = 900 + off2 ;
// Tdott : 900-2200
//diff : 400

setTimeout(show('#skyline'),shift(0,step3));
for (var i=1;i<13;i++){
	if(i<10){
		setTimeout(slide('#skyline #group0'+i,0,-650,200),shift(i*100,step3));
	} else{
		setTimeout(slide('#skyline #group'+i,0,-650,200),shift(i*100 ,step3));
	}
}
for (var i = 1 ; i < 6 ; i++){
	setTimeout(slide('#skyline #window'+i,0,-650,200),shift(500+i*100,step3));
}
setTimeout(slide('#skyline #CN_tower-2',0,-650,200),shift(12*100,step3));
setTimeout(slide('#window6,#window7',35,-245.02,200),shift(12*100,step3));

var step4 = 2300 + off2 ;
var off4 = 2000;

// Hydro Poles and their wires : 2200-2500
//diff : 300

setTimeout(showHydroPoles,shift(step4,0));
setTimeout(draw('#wires path',1000,false,false,'black'),shift(step4,0));



var off5=3000;
var step5 = 2000 + off2  + off4;
//sunset : 2500-3100
// diff: 600


setTimeout(changeFill('#theSky','#F55320',1000),shift(0,step5));
setTimeout(slide('#cloud_pattern',-1200,-1200,4000),shift(-1800,step5)); 
setTimeout(fadeFill('#cloud_pattern',0.8,1900),shift(-1300,step5));
setTimeout(changeFill('#theSky','#0E2842',2000),shift(1000,step5));
setTimeout(slide('#cloud_pattern',900,900,4000),shift(1200,step5)); 
setTimeout(fadeFill('#cloud_pattern',0.3,1000),shift(300,step5)); 
setTimeout(fadeFill('#cloud_pattern',0,400),shift(1300,step5));

setTimeoutFixed(buildingsColor,2000,shift(1000,step5));

// appearance of the stars 


var off6 = 0;
var step6 = 2500 + off2  + off4 + off5;

setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:1},1000)},shift(-1000,step6));
setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:1},500)},shift(500,step6));
setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:1},500)},shift(1300,step6));
setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:1},500)},1000)},shift(1000,step6));
setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:0},500)},1000)},shift(1500,step6));







var step7 =  4000 + off5;
var off7 = 0 ; 

// windows
setTimeoutFixed(window1,500,shift(500,step7));
setTimeoutFixed(window2,500,shift(900,step7));
setTimeoutFixed(window3,500,shift(1000,step7));
setTimeoutFixed(window4,500,shift(1400,step7));
setTimeoutFixed(window5,500,shift(1700,step7));
setTimeout(window6,shift(2000,step7));
setTimeoutFixed(window7,500,shift(2300,step7));
setTimeout(CNLit,shift(2000,step7));

// road and poles 

setTimeout(draw('#wires_data_02 path,#wires_left_data-2 path',2000,false,false,undefined,mina.easeout),shift(step7,2500));
setTimeout(draw('#wires_data_01 path,#wires_left_data-3 path',2000,false,false,undefined,mina.easeout),shift(step7,3500));

setTimeout(draw('#wires_data_02 path,#wires_left_data-2 path',1000,false,true,undefined,mina.easeout),shift(step7,5600));
setTimeout(draw('#wires_data_01 path,#wires_left_data-3 path',1000,false,true,undefined,mina.easeout),shift(step7,5600));

setTimeout(draw('#roadBranch1 path',600,false,false),shift(3600,step7));
setTimeout(draw('#roadBranch1 ellipse',0,false,false),shift(4200,step7));

setTimeout(draw('#roadBranch2 path',600,false,false),shift(3600,step7));
setTimeout(draw('#roadBranch2 ellipse',0,false,false),shift(4200,step7));

setTimeout(changeFill('#roadDataBackground','#0A8888',1000),shift(4100,step7));



var off8 = 0;
var step8 = 8100 + off2  + off4 + off5 + off7;
// change point of view : 3100-3600
// diff : 500

setTimeout(changeViewBox("300 0 2312.7 1370",500),shift(0,step8));



var step9 = 8600 + off2  + off4 + off5 + off8 + off7;
//appearance of dem constellations : 7000-
//diff : who cares? it's looking awesome! 

setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:0.1},500)},shift(0,step9));
setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:0.1},500)},shift(0,step9));
setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:0.1},500)},shift(0,step9));

setTimeout(function(){s.selectAll('radialGradient stop')[8].animate({stopOpacity:1},500)},shift(500,step9));
setTimeout(fadeStroke('.constellation1,.constellation2',1,0),shift(-1200,step9));
setTimeout(draw('#constellations path',0,false,true),shift(-1200,step9));
setTimeout(draw('#constellations path',700,false,false),shift(1200,step9));
// setTimeout(changeFill('#dataConstellations text','rgba(0,255,255,1)',1000),shift(1000,step9));
// setTimeout(changeFill('#dataConstellations text','#0E2842',500),shift(2000,step9));



