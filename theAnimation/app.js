var s = Snap('#sky');
document.addEventListener("DOMContentLoaded", function(event) { 
	loadStuff();
	s.attr('display','block');
	doTheAnimation();
});
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

	changeViewBox("200 500 2412.7 1435",0)();
	slide('#road-3',488.22,800.02,0)();
	slide('#road rect',0,0,0)();
	slide('#newRoads',-2869,1700,0)();
	fadeFill('#road rect',1,500)();

	slide('#wires-poles',225,245,100)();
	s.selectAll('#Poles_left use,#Poles_right use').forEach(function(element){element.attr('display','none')});

	//  adjusting buildings and windows

	slide('#skyline',700,1210.02,0)();
	hide('#skyline')();
	slide('#V-shape',548,240.02,0)();
	slide('#window6,#window7',35,0,0)();
	draw('#wires_left path,#wires_right path',0,false,true)();
	slide('#window8',1380,0,0)()


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
	s.selectAll('#roadDataBackground').attr({fill:"#676767"});


	slide('#roadDataMask',508,1249,0)();
	slide('#theCircuits',481,1262,0)();
	hide('#theCircuits ellipse')();

	// adjusting the Road Data Colors

	s.selectAll('.circuits-8').forEach(function(element){
		element.attr({'fill':'#0b5f63','stroke':'aqua','opacity':0});
	})
	s.selectAll('.circuits-10, .circuits-13, .circuits-7').forEach(function(element){
		element.attr({'opacity':0,'fill':'aqua'});
	})

	// adjusting the poles Data 


	slide('#polesData',439,245,0)();

}

function doTheAnimation(){		

	var step1 = 0;
	// road starting time: 0-600 
	// diff : 700

	setTimeout(fadeFill('#road-3',1,200),shift(100,step1));
	setTimeout(slide('#road-3',485.22,74.02,200),shift(100,step1));
	setTimeout(slide('#newRoads',-2869,1211,200),shift(100,step1));

	setTimeout(show('#roadDataMask'),shift(700,step1));	
	var step2 = 700 ;
	var off2 = 0;

	//lane paint: 600-900
	//diff: 900

	setTimeout(fadeFill('#lane_paint_path',1,300),shift(0,step2));
	setTimeout(fadeFill('#newRoads path',1,300),shift(0,step2));

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
	setTimeout(slide('#window8',1380,-250,200),shift(12*100,step3));



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
	setTimeoutFixed(window8,500,shift(500,step7));
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
	setTimeout(function(){polesData(1500)},shift(step7,2500));
	setTimeout(draw('#wires_data_01 path,#wires_left_data-3 path',2000,false,false,undefined,mina.easeout),shift(step7,3500));
	setTimeout(function(){roadCircuit()},shift(step7,3100));
	setTimeout(draw('#wires_data_02 path,#wires_left_data-2 path',1000,false,true,undefined,mina.easeout),shift(step7,5600));
	setTimeout(draw('#wires_data_01 path,#wires_left_data-3 path',1000,false,true,undefined,mina.easeout),shift(step7,5600));
	setTimeout(function(){polesData(1000,true)},shift(step7,5600));

	setTimeout(changeFill('#roadDataBackground','#0A8888',1000),shift(3900,step7));
	setTimeout(changeFill('#roadDataBackground','#676767',500),shift(4500,step7));


	var step8=9000 + off2  + off4 + off5 + off7;
	var off8=800; 





	var off9 = 0;
	var step9 = 9100 + off2  + off4 + off5 + off7;
	// change point of view : 3100-3600
	// diff : 500

	setTimeout(changeViewBox("300 0 2312.7 1370",500),shift(0,step9));
	setTimeout(dataPiecesMove,shift(0,step9));




	var step10 = 8600 + off2  + off4 + off5 + off9 + off7;
	//appearance of dem constellations : 7000-
	//diff : who cares? it's looking awesome! 

	setTimeout(function(){s.selectAll('radialGradient stop')[2].animate({stopOpacity:0.1},500)},shift(0,step10));
	setTimeout(function(){s.selectAll('radialGradient stop')[4].animate({stopOpacity:0.1},500)},shift(0,step10));
	setTimeout(function(){s.selectAll('radialGradient stop')[6].animate({stopOpacity:0.1},500)},shift(0,step10));

	setTimeout(function(){s.selectAll('radialGradient stop')[8].animate({stopOpacity:1},500)},shift(500,step10));
	setTimeout(fadeStroke('.constellation1,.constellation2',1,0),shift(-1200,step10));
	setTimeout(draw('#constellations path',0,false,true),shift(-1200,step10));
	setTimeout(draw('#constellations path',700,false,false),shift(1200,step10));
	setTimeout(changeOpacity('#dataConstellations path',1,300),shift(1900,step10));
	setTimeout(draw('#dataConstellations path',400,false,false),shift(2200,step10));

	setTimeout(shapingTheLogo,shift(2600,step10));

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

function changeOpacity(selector,alpha,duration){
	return function(){
		s.selectAll(selector).animate({
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

	setTimeout(function(){drawCircuit('#roadCircuit1Left',300)},0);
	setTimeout(function(){drawCircuit('#roadCircuit1Right',300)},0);
	setTimeout(function(){drawCircuit('#roadCircuit2Left',300)},300);
	setTimeout(function(){drawCircuit('#roadCircuit2Right',300)},300);

	setTimeout(changeOpacity('#dataObject1_base polygon',0.5,800),500);

	setTimeout(function(){drawCircuit('#roadCircuit2Right2',300)},600);
	setTimeout(function(){drawCircuit('#roadCircuit3Left',300)},600);
	setTimeout(function(){drawCircuit('#roadCircuit3Right',300)},600);
	setTimeout(function(){drawCircuit('#roadCircuit3Left2',300)},700);

	setTimeout(changeOpacity('#dataObject2_base polygon',0.5,800),1000);


	setTimeout(function(){drawCircuit('#roadCircuit4Right',300)},900);
	setTimeout(function(){drawCircuit('#roadCircuit4Left',300)},900);
	setTimeout(function(){drawCircuit('#roadCircuit5Right',300)},1200);

	setTimeout(changeOpacity('#dataObject3_base polygon',0.5,800),1300);

	setTimeout(changeOpacity('#dataObject1_elements path:nth-child(1)',1,300),1300);
	setTimeout(changeOpacity('#dataObject1_elements path:nth-child(2)',1,300),1400);
	setTimeout(changeOpacity('#dataObject1_elements path:nth-child(3)',1,300),1500);
	setTimeout(changeOpacity('#dataObject1_elements path:nth-child(4)',1,300),1600);

	setTimeout(changeOpacity('#dataObject3_elements path',1,300),1700);


	setTimeout(changeOpacity('#dataObject2_elements path:nth-child(1)',1,300),1800);
	setTimeout(changeOpacity('#dataObject2_elements path:nth-child(2)',1,300),1900);
	setTimeout(changeOpacity('#dataObject2_elements path:nth-child(3)',1,300),2000);

	setTimeout(draw('#theCircuits path',600,false,true),2200);

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

function dataPiecesMove(){

	setTimeout(function(){move('#dataObject1_elements path:nth-child(1)',1000,-900,500,mina.easeinout)},0*150);
	setTimeout(function(){move('#dataObject1_elements path:nth-child(2)',900,-1000,500,mina.easeinout)},1*150);
	setTimeout(function(){move('#dataObject1_elements path:nth-child(3)',1100,-950,500,mina.easeinout)},2*150);
	setTimeout(function(){move('#dataObject1_elements path:nth-child(4)',1000,-1100,500,mina.easeinout)},3*150);

	setTimeout(function(){move('#dataObject2_elements path:nth-child(1)',-900,-1000,500,mina.easeinout)},4*150);
	setTimeout(function(){changeShape('#dataObject2_elements path:nth-child(1)','M796.28 363.38L 860.11 320.72L 737.77 315.04Z',500)},6*150);

	setTimeout(function(){move('#dataObject2_elements path:nth-child(2)',-1000,-1400,500,mina.easeinout)},5*150);
	setTimeout(function(){changeShape('#dataObject2_elements path:nth-child(2)','M903.96 650.62 L1077.59 650.63 L951.82 574.62Z',500)},6*150);

	setTimeout(function(){move('#dataObject2_elements path:nth-child(3)',-300,-900,500,mina.easeinout)},6*150);
	setTimeout(function(){changeShape('#dataObject2_elements path:nth-child(3)','M355.68 650.62 L417.94 640.88L 294.97 554.45Z',500)},6*150);


	setTimeout(function(){move('#dataObject3_elements path:nth-child(1)',-1300,-500,500,mina.easeinout)},7*150);
	setTimeout(function(){changeShape('#dataObject3_elements path:nth-child(1)','M1408.75 354.65 L 1474.94 287.2 L 1357.76 260.23Z',500)},6*150);

	setTimeout(draw('#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path',300),8*150);

}

function changeShape(selector,pts,duration){
	s.selectAll(selector).animate({d:pts},duration);
}
function changeShapeElement(element,pts,duration,easing){
	if (easing==undefined) easing = mina.linear; 
	element.animate({d:pts},duration,easing);
}

var finalPoints =[
	"M207.47 320 L207.38 204.23 L265.32 262.16Z",
	"M428.75 228.44 L347.00 146.47 L346.95 228.4Z",
	"M428.71 228.67 L347.04 310.73 L346.91 228.8Z",
	"M265.75 146.94 L346.92 229.5 L347.55 147.57Z",
	"M347.44 228.6 L265.88 310.78 L347.81 310.4Z",
	"M381.79 377.73 L266.02 377.78 L324.02 435.64Z",
	"M265.23 378.34 L265.32 262.57 L207.38 320.5Z",
	"M265.23 146.03 L265.32 261.81 L207.38 203.88Z",
	"M576.59 59.2 L577.08 174.98 L634.72 116.75",
	"M577.18 175.74 L577.67 291.51 L635.31 233.28Z",
	"M577.45 255.08 L495.41 173.38 L577.34 173.28Z",
	"M496.81 407.32 L577.72 324.51 L578.6 406.43Z",
	"M494.79 172.72 L495.46 288.5 L437.24 230.86Z",
	"M438.34 232.69 L438.84 348.46 L496.48 290.24Z",
	"M496.39 290.55 L497.06 406.32 L438.84 348.68Z",
	"M634.05 0.57 L634.72 116.35 L576.5 58.71Z",
	"M635.22 232.88 L634.73 117.11 L577.09 175.33Z",
	"M577.77 292.23 L578.26 408.00 L635.9 349.78Z",
	"M635.81 349.37 L635.31 233.6 L577.67 291.82Z",
	"M140.71 372.14 L140.62 256.36 L198.55 314.29Z",
	"M140.58 292.79 L58.96 374.9 L140.89 374.59Z",
	"M59.17 140.96 L140.5 223.36 L140.97 141.44Z",
	"M58.34 375.56 L58.43 259.79 L0.49 317.72Z",
	"M1.59 315.89 L1.5 200.11 L59.43 258.05Z",
	"M59.34 257.73 L59.43 141.96 L1.5 199.89Z",
	"M140.71 255.64 L140.62 139.87 L198.55 197.8Z",
	"M198.46 198.21 L198.55 313.98 L140.62 256.05Z",
	"M140.71 488.67 L140.62 372.89 L198.55 430.83Z",
	"M315.03 546.4 L199.25 546.45 L257.26 604.31Z",
	"M198.46 547.01 L198.55 431.23 L140.62 489.17Z",
	"M198.46 314.7 L198.55 430.48 L140.62 372.54Z",
]
function shapingTheLogo(){
	var selector = '#dataConstellations path,#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path';
	var elements = s.selectAll(selector);

	s.selectAll('#dataObject1_elements path,#dataObject2_elements path,#dataObject3_elements path').animate({transform:Translate(0,0)},600,mina.easeinout);
	slide('#dataConstellations',1103,107,600,mina.easeinout)();
	slide('#theCircuits',1103,140,600,mina.easeinout)();


	s.selectAll('#scale').animate({transform:scale(1.1,1.1,1200,360)},600,mina.easeinout);

	elements.forEach(function(element,index){
		setTimeoutFixed(changeShapeElement,element,finalPoints[index],600,mina.easeinout,0);
	})
	setTimeout(draw(selector,1000),1000);

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


