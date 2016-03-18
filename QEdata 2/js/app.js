var animation = true;
if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	$('svg').remove();
	animation = false;
}




var s = Snap('#sky');


// for making sure the animation starts once the whole document is loaded and it looks nice... (the svg doesn't display untill everything's positioned and the animation is ready to start.) 

document.addEventListener("DOMContentLoaded", function(event) { 
	if(animation){
		loadStuff();
		s.attr('display','block');
		doTheAnimation();
		setTimeout(fixHeaderHeight,1);
	}

});


var defaultStyleColors=['url(#radial-gradient)','#29abe2','#333','#666','rgb(2,34,60)','rgb(2,34,60)','rgb(2,34,60)','gray','#fff'];


function loadStuff(){
	defaultStyleColors.forEach(function(element,index){
		if(index!=1){
			s.selectAll('.cls-'+(index+1)).attr({
				fillOpacity:0,  // filling other stuff
				fill:element
			},0);
		}else{s.selectAll('.cls-'+(index+1)).attr({fill:element},0);}

	})

	fadeFill('#newRoads path',0,0)();

	s.selectAll('.cls-10').attr({
		fillOpacity:0,
		stroke:'#333',																	// Wires
		strokeMiterlimit:'10',
		strokeWidth:'2px'
	},0);
	s.selectAll('radialGradient').forEach(function(element){
		element.selectAll('stop')[0].attr({
			stopOpacity:0																// makin em stars dissappear
		},0)
	})
	s.selectAll("#cloud_pattern").attr({transform:Translate(-3300,-3300),fillOpacity:0}) // dem clouds
	// makin em dissappear 

	changeViewBox("230 500 2392.7 1423",0)();
	$('header').height($('#sky').height());

	slide('#road-3',488.22,800.02,0)();
	slide('#road rect',0,0,0)();
	slide('#newRoads',-2869,1700,0)();
	fadeFill('#road rect',1,500)();

	slide('#wires-poles',225,245,100)();
	slide('#NewPoles',44,9,0)();

	s.selectAll('#newPoles_left g,#newPoles_right > g').forEach(function(element){element.attr('display','none')});

	//  adjusting buildings and windows

	slide('#skyline',700,1210.02,0)();
	hide('#skyline')();
	slide('#V-shape',548,240.02,0)();
	slide('#window6,#window7',35,0,0)();
	draw('#wires_left path,#wires_right path',0,false,true)();
	slide('#window8',1380,0,0)()
	slide('#extraBuildings',-300,0,0)();
	slide('#buildings_right',+300,0,0)();
	slide('#buildings_left',-170,0,0)();

	// adjusting buildings colors

	s.selectAll('.skyline_Tdot-2, .skyline_Tdot-3, .skyline_Tdot-4, .skyline_Tdot-5, .skyline_Tdot-6, .skyline_Tdot-7, .skyline_Tdot-8').forEach(function(element){
		element.attr('fill','white');
		})
	s.selectAll('.skyline_Tdot-2, .skyline_Tdot-4').forEach(function(element){
		element.attr('fill','#989898');
	})


	//	adjusting constellations

	slide('#constellations',650,0,0)();
	fadeStroke('.constellation1,.constellation2',0,0)();


	// 	adjusting constellations data

	slide('#dataConstellations',803,107,0)();
	changeOpacity('#dataConstellations path',0,0)();

	// adjusting the Road Data
	hide('#roadDataMask')();
	s.selectAll('#roadDataBackground path').attr({d:"M68,1925 924,1177 1009.9,1178 1847,1926"});
	s.selectAll('#roadDataBackground').attr({fill:"rgb(2,34,60)"});


	// road Data colors: 

	s.selectAll('.extraPieces-3').animate({'fill':'#0b5f63'},0);


	slide('#roadDataMask',508,1249,0)();
	slide('#theCircuits',481,1262,0)();
	hide('#theCircuits ellipse')();


	slide('#extraPieces',433,-42,0)();

	// adjusting the Road Data Colors

	s.selectAll('.circuits-8').forEach(function(element){
		element.attr({'fill':'#0b5f63','stroke':'aqua','opacity':0});
	})
	s.selectAll('.circuits-10, .circuits-13, .circuits-7').forEach(function(element){
		element.attr({'opacity':0,'fill':'aqua'});
	})

	// adjusting the poles Data 
	slide('#polesData',439,245,0)();

	$('.blurpContainer').fadeOut(0);

	slide('#hydroShadows',286,992,0)();
	changeOpacity('.hydroShadows',0,0)();

}

// helper functions

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

function changeOpacity(selector,alpha,duration,easing){
	easing = easing ? easing : mina.linear;
	return function(){
		s.selectAll(selector).animate({
			opacity: alpha
		},duration);
	}
}

function changeOpacityElement(element,alpha,duration,easing){
	easing = easing ? easing : mina.linear;
	return function(){
		element.animate({
			opacity: alpha
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



function drawElement(element,duration,reverse,out,color,easing){
	if (color == undefined) { color = '#00FFFF'};
	if (easing == undefined) { easing = mina.linear};
	if (reverse == undefined) { reverse = false};
	if (out == undefined) { out = false};
	return function(){
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
	}
}

function showHydroPoles(){
	var polesLeft = s.selectAll('#newPoles_left g');
	var nLeft = polesLeft.length;
	for (var i = 0  ; i < nLeft ; i++){setTimeoutFixed(function(j){polesLeft[nLeft-j-1].attr('display','block');},i,100*i);
	}
	var polesRight = s.selectAll('#newPoles_right > g');
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
		setTimeout(changeFill('#window7 path:nth-of-type('+i+')','black',interval),n*interval+interval*i/3);
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
		setTimeout(changeStroke('#window3 line:nth-of-type('+i+')','#000000'),n*interval+i*interval/3);
	}
}

function window5(duration){
	var n = 8;
	var interval = duration/n;
	for (var i = 1; i < 9 ; i++){
		setTimeout(changeFill('#_'+i+'-2','#00FFFF',100),i*interval);
	}
	for (var i = 1; i < 9 ; i++){
		setTimeout(changeFill('#_'+i+'-2','black',100),interval*n+i*interval/3);
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

function window8(duration){
	var n = s.selectAll('#window8 rect').length;
	interval = duration/n;
	for (var i = 1; i < n+1 ; i++){
		setTimeout(changeFill('#window8 rect:nth-child('+i+')','#00FFFF',100),interval*i);
	} 
	for (var i = 1; i < n+1 ; i++){
		setTimeout(changeFill('#window8 rect:nth-child('+i+')','black',100),n*interval + interval*i);
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


function drawCircuit(selector,duration,reverse,out,color,easing){
	if (color == undefined) { color = '#00FFFF'};
	if (easing == undefined) { easing = mina.linear};
	if (reverse == undefined) { reverse = false};
	if (out == undefined) { out = false};

	var elements = s.selectAll(selector + ' path');
	var n = elements.length;
	var interval = duration/n;
	elements.forEach(function(element,index){
		setTimeout(drawElement(element,interval,reverse,out),index*interval);
	})
}


function polesData(duration,out){
	if (out == undefined) out = false;
	var n = 6
	interval = duration/n;
	for (var i = 1; i < n+1 ; i++){
		setTimeout(draw('#poles_0'+i+' path',interval,false,out),i*interval-interval);
	}
}




function roadCircuit(){

	setTimeout(function(){drawCircuit('#roadCircuit1Left',300,null,null,null,mina.easeinout)},0);
	setTimeout(function(){drawCircuit('#roadCircuit1Right',300,null,null,null,mina.easeinout)},0);
	setTimeout(function(){drawCircuit('#roadCircuit2Left',300,null,null,null,mina.easeinout)},300);
	setTimeout(function(){drawCircuit('#roadCircuit2Right',300,null,null,null,mina.easeinout)},300);

	setTimeout(changeOpacity('#dataObject1_base polygon',0.5,800),500);

	setTimeout(function(){drawCircuit('#roadCircuit2Right2',300,null,null,null,mina.easeinout)},600);
	setTimeout(function(){drawCircuit('#roadCircuit3Left',300,null,null,null,mina.easeinout)},600);
	setTimeout(function(){drawCircuit('#roadCircuit3Right',300,null,null,null,mina.easeinout)},600);
	setTimeout(function(){drawCircuit('#roadCircuit3Left2',300,null,null,null,mina.easeinout)},700);

	setTimeout(changeOpacity('#dataObject2_base polygon',0.5,800),1000);


	setTimeout(function(){drawCircuit('#roadCircuit4Right',300,null,null,null,mina.easeinout)},900);
	setTimeout(function(){drawCircuit('#roadCircuit4Left',300,null,null,null,mina.easeinout)},900);
	setTimeout(function(){drawCircuit('#roadCircuit5Right',300,null,null,null,mina.easeinout)},1200);

	setTimeout(changeOpacity('#dataObject3_base polygon',0.5,800),1300);

	setTimeout(changeOpacity('#dataObject1_elements path:nth-child(1)',1,300),1300);
	setTimeout(changeOpacity('#dataObject1_elements path:nth-child(2)',1,300),1400);
	setTimeout(changeOpacity('#dataObject1_elements path:nth-child(3)',1,300),1500);
	setTimeout(changeOpacity('#dataObject1_elements path:nth-child(4)',1,300),1600);

	setTimeout(changeOpacity('#dataObject3_elements path',1,300),1700);


	setTimeout(changeOpacity('#dataObject2_elements path:nth-child(1)',1,300),1800);
	setTimeout(changeOpacity('#dataObject2_elements path:nth-child(2)',1,300),1900);
	setTimeout(changeOpacity('#dataObject2_elements path:nth-child(3)',1,300),2000);

	setTimeout(function(){extraPieces(1,1000)},2000)

	setTimeout(draw('#roadCircuit1Left path,#roadCircuit1Right path,#roadCircuit2Left path,#roadCircuit2Right2 path,#roadCircuit2Right path,#roadCircuit3Right path,#roadCircuit3Left path,#roadCircuit3Left2 path,#roadCircuit4Left path,#roadCircuit4Right path,#roadCircuit5Right path',1000,false,true,null,mina.easeinout),2100);

	setTimeout(changeOpacity('#dataObject1_base polygon',0,800),2500);
	setTimeout(changeOpacity('#dataObject2_base polygon',0,800),2500);
	setTimeout(changeOpacity('#dataObject3_base',0,800),2500);

}
var hoverBool = true;
function hover(selector,bool){
	s.selectAll(selector).animate({transform:Translate(0,-30)},500,mina.easeinout);
	setTimeout(function(){s.selectAll(selector).animate({transform:Translate(0,0)},500,mina.easeinout,function(){
			if(bool){hover(selector,hoverBool)}})
		},500);
}

function dataPiecesMove(interval){

	setTimeout(function(){move('#dataObject1_elements path:nth-child(1)',1000,-900,500,mina.easeinout)},0*interval);
	setTimeout(function(){move('#dataObject1_elements path:nth-child(2)',900,-1000,500,mina.easeinout)},1*interval);
	setTimeout(function(){move('#dataObject1_elements path:nth-child(3)',1100,-950,500,mina.easeinout)},2*interval);
	setTimeout(function(){move('#dataObject1_elements path:nth-child(4)',1000,-1100,500,mina.easeinout)},3*interval);

	setTimeout(function(){move('#dataObject2_elements path:nth-child(1)',-900,-1000,500,mina.easeinout)},4*interval);
	setTimeout(function(){changeShape('#dataObject2_elements path:nth-child(1)','M796.28 363.38L 860.11 320.72L 737.77 315.04Z',500)},6*interval);

	setTimeout(function(){move('#dataObject2_elements path:nth-child(2)',-1000,-1400,500,mina.easeinout)},5*interval);
	setTimeout(function(){changeShape('#dataObject2_elements path:nth-child(2)','M903.96 650.62 L1077.59 650.63 L951.82 574.62Z',500)},6*interval);

	setTimeout(function(){move('#dataObject2_elements path:nth-child(3)',-300,-900,500,mina.easeinout)},6*interval);
	setTimeout(function(){changeShape('#dataObject2_elements path:nth-child(3)','M355.68 650.62 L417.94 640.88L 294.97 554.45Z',500)},6*interval);


	setTimeout(function(){move('#dataObject3_elements path:nth-child(1)',-1300,-500,500,mina.easeinout)},7*interval);
	setTimeout(function(){changeShape('#dataObject3_elements path:nth-child(1)','M1408.75 354.65 L 1474.94 287.2 L 1357.76 260.23Z',500)},6*interval);

	setTimeout(draw('#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path',300),8*interval);

}

function changeShape(selector,pts,duration){
	s.selectAll(selector).animate({d:pts},duration);
}
function changeShapeElement(element,pts,duration,easing){
	if (easing==undefined) easing = mina.linear; 
	element.animate({d:pts},duration,easing);
}

var finalPoints =[
	// "M207.47 320 L207.38 204.23 L265.32 262.16Z",
	// "M428.75 228.44 L347.00 146.47 L346.95 228.4Z",
	// "M428.71 228.67 L347.04 310.73 L346.91 228.8Z",
	// "M265.75 146.94 L346.92 229.5 L347.55 147.57Z",
	// "M347.44 228.6 L265.88 310.78 L347.81 310.4Z",
	// "M381.79 377.73 L266.02 377.78 L324.02 435.64Z",
	// "M265.23 378.34 L265.32 262.57 L207.38 320.5Z",
	// "M265.23 146.03 L265.32 261.81 L207.38 203.88Z",
	// "M576.59 59.2 L577.08 174.98 L634.72 116.75",
	// "M577.18 175.74 L577.67 291.51 L635.31 233.28Z",
	// "M577.45 255.08 L495.41 173.38 L577.34 173.28Z",
	// "M496.81 407.32 L577.72 324.51 L578.6 406.43Z",
	// "M494.79 172.72 L495.46 288.5 L437.24 230.86Z",
	// "M438.34 232.69 L438.84 348.46 L496.48 290.24Z",
	// "M496.39 290.55 L497.06 406.32 L438.84 348.68Z",
	// "M634.05 0.57 L634.72 116.35 L576.5 58.71Z",
	// "M635.22 232.88 L634.73 117.11 L577.09 175.33Z",
	// "M577.77 292.23 L578.26 408.00 L635.9 349.78Z",
	// "M635.81 349.37 L635.31 233.6 L577.67 291.82Z",
	// "M140.71 372.14 L140.62 256.36 L198.55 314.29Z",
	// "M140.58 292.79 L58.96 374.9 L140.89 374.59Z",
	// "M59.17 140.96 L140.5 223.36 L140.97 141.44Z",
	// "M58.34 375.56 L58.43 259.79 L0.49 317.72Z",
	// "M1.59 315.89 L1.5 200.11 L59.43 258.05Z",
	// "M59.34 257.73 L59.43 141.96 L1.5 199.89Z",
	// "M140.71 255.64 L140.62 139.87 L198.55 197.8Z",
	// "M198.46 198.21 L198.55 313.98 L140.62 256.05Z",
	// "M140.71 488.67 L140.62 372.89 L198.55 430.83Z",
	// "M315.03 546.4 L199.25 546.45 L257.26 604.31Z",
	// "M198.46 547.01 L198.55 431.23 L140.62 489.17Z",
	// "M198.46 314.7 L198.55 430.48 L140.62 372.54Z",


	"M531.9,59.5l-0.1-115.8l57.9,57.9L531.9,59.5",
	"M753.2-32l-81.8-82l0,81.9L753.2-32",
	"M753.1-31.8l-81.7,82.1l-0.1-81.9L753.1-31.8",
	"M590.2-113.5L671.3-31l0.6-81.9L590.2-113.5",
	"M671.9-31.9l-81.6,82.2l81.9-0.4L671.9-31.9",
	"M706.2,117.3l-115.8,0l58,57.9L706.2,117.3",
	"M589.6,117.9l0.1-115.8L531.8,60L589.6,117.9",
	"M589.6-114.4l0.1,115.8l-57.9-57.9L589.6-114.4",
	"M911.7-214.6l0.5,115.8l57.6-58.2l0,0",
	"M912.3-98l0.5,115.8l57.6-58.2L912.3-98",
	"M912.6-18.7l-82-81.7l81.9-0.1L912.6-18.7",
	"M832,133.6l80.9-82.8l0.9,81.9L832,133.6",
	"M829.9-101l0.7,115.8l-58.2-57.6L829.9-101",
	"M773.5-41.1L774,74.7l57.6-58.2L773.5-41.1",
	"M831.5,16.8l0.7,115.8L774,74.9L831.5,16.8",
	"M969.2-273.2l0.7,115.8l-58.2-57.6L969.2-273.2",
	"M970.4-40.9l-0.5-115.8l-57.6,58.2L970.4-40.9",
	"M912.9,18.5l0.5,115.8L971,76L912.9,18.5",
	"M971,75.6l-0.5-115.8l-57.6,58.2L971,75.6",
	"M410,107.2L409.9-8.5l57.9,57.9L410,107.2",
	"M409.8,27.9L328.2,110l81.9-0.3L409.8,27.9",
	"M328.4-123.9l81.3,82.4l0.5-81.9L328.4-123.9",
	"M327.6,110.7l0.1-115.8l-57.9,57.9L327.6,110.7",
	"M1372.8,157.4l-0.1-115.8l57.9,57.9L1372.8,157.4",
	"M1430.6,99.2l0.1-115.8l-57.9,57.9L1430.6,99.2",
	"M1512,97.1l-0.1-115.8l57.9,57.9L1512,97.1",
	"M1569.7,39.7l0.1,115.8l-57.9-57.9L1569.7,39.7",
	"M1512,330.2l-0.1-115.8l57.9,57.9L1512,330.2",
	"M1686.3,387.9l-115.8,0l58,57.9L1686.3,387.9",
	"M1569.7,388.5l0.1-115.8l-57.9,57.9L1569.7,388.5",
	"M1569.7,156.2l0.1,115.8l-57.9-57.9L1569.7,156.2",

]

function shapingTheLogo(){
	var selector = '#dataConstellations path,#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path';
	var elements = s.selectAll(selector);

	s.selectAll('#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path').animate({transform:Translate(0,0)},500,mina.easeinout);
	slide('#dataConstellations',783,370,500,mina.easeinout)();
	slide('#theCircuits',-350,265,500,mina.easeinout)();

	s.selectAll('#scale').animate({transform:scale(1.1,1.1,1200,360)},500,mina.easeinout);

	elements.forEach(function(element,index){
		setTimeoutFixed(changeShapeElement,element,finalPoints[index],500,mina.easeinout,0);
	})
	setTimeout(draw(selector,1000),1000);
}

function logoDisappear(argument){
	var selector = '#dataConstellations path,#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path';
	var elements = s.selectAll(selector);
	elements.animate({'opacity': argument},1000);
}

function move(selector,x,y,duration,easing){
	if(easing==undefined) easing = mina.linear;
	s.selectAll(selector).animate({transform:Translate(x,y)},duration,easing);
}

function shift(number,tobeAdded){
	return number+tobeAdded;
}

function scale(scalex,scaley,x,y){
	return "matrix("+scalex+", 0, 0,"+scaley+", "+ (x-scalex*x) +"," + (y-scaley*y) +")";
}


function blurp(content,length){
	var element = $('.blurpContainer .blurp');
	element.text(content).removeClass('left').addClass('right');
	$('.blurpContainer').fadeIn(200);
	element.removeClass('right').addClass('center');
	setTimeout(function(){element.removeClass('center').addClass('left');},length-300);
	setTimeout(function(){$('.blurpContainer').fadeOut(200);},length-200);

}

function extraPieces(alpha,duration){

	var bases = s.selectAll('#extraPiecesBase polygon');
	var objects = s.selectAll('#extraPiecesObjects polygon');
	var interval = duration/bases.length/2;	
	for (var i = 0 ; i < bases.length;i++){
		setTimeout(changeOpacityElement(bases[i],alpha,300),(i+1)*interval);
	}
	for (var i = 0 ; i < objects.length;i++){
		setTimeout(changeOpacityElement(objects[i],alpha,300),(i+1)*interval);
	}

}


function dataPiecesColorChange(){

	changeFill('#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path,#extraPiecesObjects polygon','cyan',600)();
	setTimeout(changeFill('#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path,#extraPiecesObjects polygon','#0B5F63',600),600);

}





// The animation itself: 

function doTheAnimation(){		

	var step1 = 0;
	var off1 = 0; 
	// road starting time: 0-600 

	setTimeout(fadeFill('#road-3',1,200),shift(100,step1));
	setTimeout(slide('#road-3',485.22,74.02,200),shift(100,step1));
	setTimeout(slide('#newRoads',-2869,1211,200),shift(100,step1));
	setTimeout(show('#roadDataMask'),shift(700,step1));	

	var step2 = 700 ;
	var off2 = 0;



	//lane paint: 700-1000
	//diff: 900

	setTimeout(fadeFill('#lane_paint_path',1,300),shift(0,step2));
	setTimeout(fadeFill('#newRoads path',1,300),shift(0,step2));

	var step3 = 1000 + off2;
	// Tdott : 1000-2400
	//diff : 1400
	setTimeout(slide('#extraBuildings',-300,-160,300),shift(0,step3));

	setTimeout(show('#skyline'),shift(0,step3));
	for (var i=1;i<13;i++){
		if(i<10){
			setTimeout(slide('#skyline #group0'+i,0,-640,200),shift(i*100,step3));
		} else{
			setTimeout(slide('#skyline #group'+i,0,-640,200),shift(i*100 ,step3));
		}
	}
	for (var i = 1 ; i < 6 ; i++){
		setTimeout(slide('#skyline #window'+i,0,-650,200),shift(500+i*100,step3));
	}
	setTimeout(slide('#skyline #CN_tower-2',0,-650,200),shift(12*100,step3));
	setTimeout(slide('#window6,#window7',35,-245.02,200),shift(12*100,step3));
	setTimeout(slide('#window8',1380,-250,200),shift(12*100,step3));

	var step4 = 2400 + off2 ;
	var off4 = 0;

	// Hydro Poles and their wires : 2200-2500
	//diff : 300

	setTimeout(showHydroPoles,shift(step4,0));
	setTimeout(changeOpacity('.hydroShadows',1,300),shift(step4,500));
	setTimeout(draw('#wires path',1000,false,false,'black'),shift(step4,0));

	setTimeout(function(){blurp('Customized Predictive Solutions',1800)},shift(3600,0));



	var off5=2500;
	var step5 = 5400 + off2 ;
	//sunset : 2500-3100
	// diff: 600


	setTimeout(changeFill('#theSky','#F55320',700),shift(0,step5));
	setTimeout(slide('#cloud_pattern',-0,-0,4400,mina.easeout),shift(-1500,step5)); 
	setTimeout(fadeFill('#cloud_pattern',0.8,1400),shift(-910,step5));
	setTimeout(changeFill('#theSky','rgb(0,13,41)',900),shift(700,step5));
	setTimeout(fadeFill('#cloud_pattern',0.0,800),shift(1000,step5)); 

	setTimeoutFixed(buildingsColor,2000,shift(1000,step5));

	setTimeout(function(){blurp('Models in 8-10 weeks',1900)},shift(8500,0));





	var step6 =  7500  + off5;
	var off6 = 0 ; 


	setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:1},1000)},shift(-1000,step6));
	setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:1},500)},shift(500,step6));
	setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:1},500)},shift(1300,step6));
	setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:1},500)},1000)},shift(1000,step6));
	setTimeout(function(){setInterval(function(){s.selectAll('radialGradient stop')[0].animate({stopOpacity:0},500)},1000)},shift(1500,step6));




	// windows
	setTimeoutFixed(window8,300,shift(500,step6));
	setTimeoutFixed(window1,300,shift(500,step6));
	setTimeoutFixed(window2,500,shift(700,step6));
	setTimeoutFixed(window3,500,shift(800,step6));
	setTimeoutFixed(window4,500,shift(1200,step6));
	setTimeoutFixed(window5,350,shift(1400,step6));
	setTimeout(window6,shift(1800,step6));
	setTimeoutFixed(window7,500,shift(2100,step6));
	setTimeout(CNLit,shift(1800,step6));

	// road and poles 

	setTimeout(draw('#wires_data_02 path,#wires_left_data-2 path',2000,false,false,'rgb(64,191,213)',mina.easeinout),shift(step6,2300));
	setTimeout(function(){polesData(1500)},shift(step6,2300));
	setTimeout(draw('#wires_data_01 path,#wires_left_data-3 path',2000,false,false,'rgb(64,191,213)',mina.easeinout),shift(step6,3300));
	setTimeout(function(){roadCircuit()},shift(step6,2900));
	setTimeout(draw('#wires_data_02 path,#wires_left_data-2 path',1000,false,true,'rgb(64,191,213)',mina.easeinout),shift(step6,7600));
	setTimeout(draw('#wires_data_01 path,#wires_left_data-3 path',1000,false,true,'rgb(64,191,213)',mina.easeinout),shift(step6,7600));
	setTimeout(function(){polesData(1000,true)},shift(step6,7600));


	setTimeout(function(){blurp('Rich Visual Storytelling.',2800)},shift(0,15600));


	setTimeout(changeFill('#roadDataBackground','#0A8888',1000),shift(3900,step6));
	setTimeout(changeFill('#roadDataBackground','rgb(2,34,60)',500),shift(4500,step6));



	// appearance of the stars 


	var off7 = 0;
	var step7 = 13000 + off2  + off5;

	setTimeout(dataPiecesColorChange,shift(step7,1300));




	var off8 = 0;
	var step8 = 17000 + off5;
	// change point of view : 3100-3600
	// diff : 500
	setTimeout(function(){extraPieces(0,1000)},shift(step8,-2000));

	

	setTimeout(changeViewBox("300 0 2312.7 1370",500),shift(-1000,step8));
	setTimeout(function(){dataPiecesMove(250)},shift(-1500,step8));

	// setTimeout(function(){blurp('Be an Expert in 10 Minutes!',2600)},shift(20500,0));


	var step9 = 16000 + off5 + off8;
	//appearance of dem constellations : 7000-
	//diff : who cares? it's looking awesome! 

	setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:0.1},500)},shift(0,step9));
	setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:0.1},500)},shift(0,step9));
	setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:0.1},500)},shift(0,step9));

	setTimeout(function(){s.selectAll('radialGradient stop')[8].animate({stopOpacity:1},500)},shift(500,step9));
	setTimeout(fadeStroke('.constellation1,.constellation2',1,0),shift(-1200,step9));
	setTimeout(draw('#constellations path',0,false,true),shift(-1200,step9));
	setTimeout(draw('#constellations path',700,false,false),shift(1200,step9));
	setTimeout(changeOpacity('#dataConstellations path',1,300),shift(1400,step9));
	setTimeout(draw('#dataConstellations path',400,false,false),shift(1800,step9));

	setTimeout(shapingTheLogo,shift(2100,step9));

	setTimeout(function(){
		s.addClass('blur');
		$('.form').show();
		fixHeaderHeight();
		$('.form').fadeOut(0);
		logoDisappear(0);
		$('.form').fadeIn(1500)
	},shift(5000,step9));

}




// fixing the sizing problem : 


function max(a,b){
	return a>b ? a : b ; 
}

window.onresize = function(){
	fixHeaderHeight();
}

function fixHeaderHeight(){
	if($('.form').css('display')!='none') {
		$('header').height(max($('.form').height(),$('#sky').height()));
	} else { $('header').height($('#sky').height())}
}


