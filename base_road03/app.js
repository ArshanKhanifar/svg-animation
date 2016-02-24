var s = Snap('#Layer_12');

var defaultStyleColors=['url(#radial-gradient)','#29abe2','#333','#666','#999','#4d4d4d','#b3b3b3','gray','#fff'];
function loadStuff(){
	defaultStyleColors.forEach(function(element,index){
		s.selectAll('.cls-'+(index+1)).animate({
			fillOpacity:1,
			fill:element
		},0);
	})
	s.selectAll('.cls-10').animate({
		fillOpacity:0,
		stroke:'#333',
		strokeMiterlimit:'10',
		strokeWidth:'2px'
	},0);
}
// loadStuff();

// s.select('#road-3').animate({
// 	fillOpacity:0,
// 	transform: Translate(488.22,800),
// },0);

// makin em dissappear 


setTimeout(fade('#road-3',0,0),0);
setTimeout(fade('#lane_paint_path',0,0),0);
setTimeout(fade('#road rect',0,0),0);
setTimeout(slide('#road-3',488.22,800.02,0),0);
setTimeout(slide('#road rect',0,800.02,0),0);
setTimeout(fade('#_1st_row path',0,0),0);
setTimeout(fade('#_2nd_row path',0,0),0);
setTimeout(fade('#_3rd_row path',0,0),0);
setTimeout(fade('#buildings1 rect',0,0),0);
setTimeout(fade('#buildings2 rect',0,0),0);
setTimeout(slide('#buildings2 rect',0,400,0),0);
setTimeout(fade('#skyscrapers_front rect',0,0),0);
setTimeout(fade('#skyscrapers_middle rect',0,0),0);
setTimeout(fade('#skyscrapers_back rect',0,0),0);
setTimeout(slide('#skyscrapers_front rect',0,300,0),0);
setTimeout(slide('#skyscrapers_middle rect',0,300,0),0);
setTimeout(slide('#skyscrapers_back rect',0,300,0),0);






function Translate(x,y){
	return 'matrix(1,0,0,1,'+ x +',' + y + ')';
}

function fade(selector,alpha,duration){
	return function(){
		s.selectAll(selector).animate({
			fillOpacity:alpha,
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



setTimeout(fade('#road-3',1,500),100);
setTimeout(slide('#road-3',488.22,25.02,500),100);
setTimeout(fade('#road rect',1,500),100);
setTimeout(slide('#road rect',0,0,500),100);
setTimeout(fade('#lane_paint_path',1,300),600);
setTimeout(fade('#_1st_row path',1,300),900);
setTimeout(fade('#_2nd_row path',1,300),1200);
setTimeout(fade('#_3rd_row path',1,300),1500);
setTimeout(fade('#buildings1 rect',1,200),1800);
setTimeout(fade('#buildings2 rect',1,200),2000);
setTimeout(slide('#buildings2 rect',0,0,200),2000);
setTimeout(fade('#skyscrapers_front rect',1,200),2200);
setTimeout(slide('#skyscrapers_front rect',0,0,200),2200);
setTimeout(fade('#skyscrapers_middle rect',1,200),2400);
setTimeout(slide('#skyscrapers_middle rect',0,0,200),2400);
setTimeout(fade('#skyscrapers_back rect',1,200),2600);
setTimeout(slide('#skyscrapers_back rect',0,0,200),2600);




function roadBackgroundFadeIn(){
	s.select('#road rect').animate({
		fillOpacity:0,
	},0);
}

