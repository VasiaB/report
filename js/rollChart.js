function RollProgress(){
	this.txt=null;
	this.w=0;
	this.h=0;
	this.score=0;
	this.num=0;
	this.color={
		"outer":"#fcc",
		"inner":"#39f",
		"num":"#39c"
	};
	this.set=function(elem,num,color,gap){
		this.txt=elem.getContext("2d");
		this.w=elem.width;
		this.h=elem.height;
		this.score=num/50;
		if(color){
			this.color['num']=color['num'];
			this.color['outer']=color['outer'];
			this.color['inner']=color['inner']
		}
		var start=0;           //定义初始值
		var end=0;				//定义初始结束值
		var v=(this.score-end)/30       //定义初始速度值;
		if(!gap){
			var timer=setInterval(function(){
				this.txt.clearRect(0,0,this.w,this.h);
				this.createRoll();
				v=(this.score-end)/30;
				if(v<=0.005){v=0.005}
				end=end+v;
				this.num=parseInt(end*50);
				if(end>=this.score){
					clearInterval(timer)
				}
				this.createTxt()
				this.createProgress(start,end);
			}.bind(this),30)
		}else{							
			var timer=setInterval(function(){
				var start=0;
				this.num=parseInt(end*50);
				end=end+v;
				v=(this.score-end)/30;
				if(v<=0.001){v=0.001}
				this.txt.clearRect(0,0,this.w,this.h);
				this.createRoll();
				this.createTxt()
				for(var i=0;i<this.num;i++){
					this.createProgress(start,start+0.015);
					start+=0.02;
				}
				if(this.num>=num){
					clearInterval(timer)
				}
			}.bind(this),30)
		}
	};
	this.createRoll=function(){
		this.txt.beginPath();
		this.txt.arc(this.w/2,this.h/2,this.h/3,0,Math.PI*2)
		this.txt.closePath();
		this.txt.strokeStyle=this.color["outer"]
		this.txt.lineWidth=this.h/10;
		this.txt.stroke()
	};
	this.createProgress=function(start,end){
		this.txt.beginPath();
		this.txt.arc(this.w/2,this.h/2,this.h/3,Math.PI*start,Math.PI*end)
		this.txt.strokeStyle=this.color["inner"]
		this.txt.lineWidth=this.h/16;
		this.txt.stroke()
	};
	this.createTxt=function(){
		this.txt.font=this.h/5+"px 黑体";
		this.txt.fillStyle=this.color["num"];
		if(this.num<100){
			this.txt.fillText(this.num,this.w/2-this.h/10,this.h/2+this.h/17)
		}
		if(this.num==100){
			this.txt.fillText(this.num,this.w/2-this.h/6.5,this.h/2+this.h/17)
		}
	}
}




