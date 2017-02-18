var H5ComponentBin=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);
	var canvas=null;
	var cxt=null;
	var w=0;
	var h=0;
	
	function createCanvas(){
		canvas=document.createElement("canvas");
		component.append(canvas)
		canvas.width=cfg.width*2;
		canvas.height=cfg.height*2;
		w=canvas.width;
		h=canvas.height;
		cxt=canvas.getContext("2d");
	}
	createCanvas();
	function render(color,start,end){
		cxt.beginPath();
		cxt.lineWidth=w/2;
		cxt.arc(w/2,h/2,w/4,Math.PI*start,Math.PI*end)
		cxt.strokeStyle=color;
		cxt.stroke()
	}
	function drawLine(x,y){
		cxt.beginPath();
		cxt.moveTo(w/2,h/2)
		cxt.lineWidth=1;
		cxt.strokeStyle="#fff";
		cxt.lineTo(x,y)
		cxt.stroke()
	}
	function renderText(text,x,y){
		cxt.fillStyle="#fff";
		cxt.font="30px simHei";
		cxt.textAlign="center";
		cxt.fillText(text,x,y)
	}
	var timer=null;
	function grow(){
		var item=0;
		var start=0;
		var end=0;
		var step=0.01;
		var red=10;var blue=130;var green=60;
		var color="rgb("+red+","+green+","+blue+")";
		var nowDeg=cfg.data[0][1]*2;
		timer=setInterval(function(){
			step+=0.001;
			if(end<nowDeg){
				end+=step;
				if(end>=nowDeg){
					end=nowDeg
				}
				render(color,start,end)
				start=end-0.006;
			}else{
				step=0.01;
				item++;
				var deg=(nowDeg-cfg.data[item-1][1])*Math.PI;
				x=w/2+w/4*Math.cos(deg)
				y=h/2+w/4*Math.sin(deg)
				renderText(cfg.data[item-1][0],x,y)
				if(cfg.data[item]){
					nowDeg+=cfg.data[item][1]*2;
					red+=10;green+=20;
					color="rgb("+red+","+green+","+blue+")";
				}else{
					clearInterval(timer)
				}	
			}
		},20)
	}
	
	component.on("loadAnimate",function(){
		cxt.clearRect(0,0,w,h);
		setTimeout(function(){
			grow()
		},500)
		
  	})
  	component.on("leaveAnimate",function(){
		clearInterval(timer)
  	})
	return component;
}