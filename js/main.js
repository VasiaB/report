$(function(){
	//设置点图数据
	var pointCfg={
		type:"point",
		width:150,
		height:150,
		css:{opacity:0,left:"100%",top:"53%"},
		data:[
			['A项',1,'#35a',"20%","0%"],
			['B项',0.4,'#27e',0,"-45%"],
			['C项',0.6,'#3cc',"55%","-70%"],
			['D项',0.4,'#3a4',"65%","110%"],
			['E项',0.3,'#39e',"15%","130%"],
			['F项',0.3,'#5ac',"-15%","100%"]
		],
		animateIn:{ left:"50%",opacity:1},
		animateOut:{left:"100%",opacity:0},
		center:true,
	}

	//设置进度条数据
	var barCfg={
		type:"bar",
		width:300,
		height:400,
		css:{opacity:0,left:"-100%",top:"60%"},
		data:[
			['html5',1],
			['css3',0.4],
			['javascript',0.86],
			['bootstrap',1],
			['jquery',0.22],
			['angular',0.37],
			['php',0.59],
			['mysql',0.72],
			['nodeJs',0.15]
		],
		animateIn:{ left:"50%",opacity:1},
		animateOut:{left:"-100%",opacity:0},
		center:true,
	}

	//设置竖直进度条数据
	var vbarCfg={
		type:"vbar",
		width:300,
		height:300,
		css:{opacity:0,top:"0%"},
		data:[
			['html5',1],
			['css3',0.4],
			['jquery',0.22],
			['php',0.59],
			['mysql',0.72],
			['nodeJs',0.15]
		],
		animateIn:{ top:"50%",opacity:1},
		animateOut:{top:"0%",opacity:0},
		center:true,
	}

	//设置折线图数据
	var polylineCfg={
		type:"polyline",
		width:310,
		height:300,
		css:{opacity:0,width:0,height:0,top:"56%"},
		data:[
			['html5',0.43],
			['css3',0.11],
			['js',0.86],
			['jq',0.69],
			['ng',0.69]
		],
		animateIn:{width:310,height:300,opacity:1},
		animateOut:{width:0,height:0,opacity:0},
		center:true
	}

	//设置环图数据
	var rollCfg={
		type:"roll",
		width:280,
		height:400,
		css:{opacity:0,top:"0%"},
		data:[
			['html5',0.43,30,50,60],
			['css3',0.21,60,170,90],
			['js',0.73,90,120,280],
		],//分别指label 数据值 大小 位置X 位置Y
		animateIn:{ top:"50%",opacity:1},
		animateOut:{top:"0%",opacity:0},
		center:true
	}
	//设置饼状图数据;
	var binCfg={
		type:"bin",
		width:280,
		height:400,
		css:{opacity:0,top:"50%"},
		data:[
			['html5',0.1],
			['css3',0.2],
			['js',0.5],
			['html5',0.1],
			['css3',0.1],
		],
		animateIn:{ top:"50%",opacity:1},
		animateOut:{top:"0%",opacity:0},
		center:true
	}
	//设置载入载出触发
	var fullPage={
		onLeave:function(index,nextIndex,direction){
			$(this).find(".h5_component").trigger("out")
		},
		afterLoad:function(){
			$(this).find(".h5_component").trigger("into")
		}
	}
	//首页内容
	var topImgCfg={
		type:"base",
		width:310,
		height:100,
		css:{
			background:"url(imgs/face_logo_img.png) no-repeat 13% center",
			backgroundSize:"60px",
			top:"-20%"
		},
		animateIn:{width:310,height:400,opacity:1},
		animateOut:{width:0,height:0,opacity:0},
		center:true,
		animateIn:{ top:"20%",opacity:1},
		animateOut:{top:"0%",opacity:0},
	};
	var topTextCfg={
		type:"base",
		width:310,
		height:100,
		css:{
			background:"url(imgs/face_logo_text.png) no-repeat 80% center",
			backgroundSize:"180px",
			top:"-20%",
			position:"absolute"
		},
		animateIn:{ top:"20%",opacity:1},
		animateOut:{top:"0%",opacity:0},
		center:true
	};
	var rightCfg={
		type:"base",
		width:"100%",
		height:250,
		css:{
			background:"url(imgs/face_img_right.png) no-repeat right bottom",
			backgroundSize:"150px",
			bottom:0,
			right:-100,
			position:"absolute"
		},
		animateIn:{right:0,opacity:1},
		animateOut:{right:-100,opacity:0},
	};
	var leftCfg={
		type:"base",
		width:"100%",
		height:250,
		css:{
			left:-100,
			opacity:0.5,
			background:"url(imgs/face_img_left.png) no-repeat left bottom",
			backgroundSize:"180px",
			bottom:0,
			position:"absolute"
		},
		animateIn:{ left:0,opacity:1},
		animateOut:{left:-100,opacity:0}
	}
	var byeCfg={
		type:"base",
		width:"100%",
		css:{
			position:"absolute",
			top:0,
			left:0,
			bottom:0,
			background:"url('imgs/face_logo_img.png') no-repeat 54% center" 
		}
	}

	var toTopCfg={
		type:"base",
		width:50,
		height:50,
		css:{
			position:"absolute",
			background:"url('imgs/tail_back.png') right bottom no-repeat",
			bottom:20,
			right:20
		}
	}
	var toTopCfg2={
		type:"base",
		width:50,
		height:50,
		css:{
			position:"absolute",
			background:"url('imgs/tail_back_2.png') right bottom no-repeat",
			bottom:20,
			right:20
		}
	}
	//设置页面加载
	var h5=new H5();
	h5.addPage("first")
		.addComponent("base",topImgCfg)
		.addComponent("base",topTextCfg)
		.addComponent("base",rightCfg)
		.addComponent("base",leftCfg)
	  .addPage("Bin")
	    .addComponent('title',{type:"base",text:"bin"})
	    .addComponent("bin",binCfg)
	    .addComponent('toTop',toTopCfg)
	  .addPage("roll")
	 	.addComponent('title',{type:"base",text:"roll"})
	  	.addComponent("roll",rollCfg)
	  	.addComponent('toTop',toTopCfg)
	  .addPage("welcome")
	  	.addComponent('title',{type:"base",text:"progress"})
	  	.addComponent("bar",barCfg)
	  	.addComponent('toTop',toTopCfg)
	  .addPage("welcome3")
	   	.addComponent('title',{type:"base",text:"polyLine"})
	  	.addComponent("polyline",polylineCfg)
	  	.addComponent('toTop',toTopCfg)
	  .addPage("welcome")
	    .addComponent('title',{type:"base",text:"barPro"})
		.addComponent("vbar",vbarCfg)
		.addComponent('toTop',toTopCfg)
	  .addPage("welcome2")
	    .addComponent('title',{type:"base",text:"point"})
	  	.addComponent("point",pointCfg)
	  	.addComponent('toTop',toTopCfg)
	  .addPage("byebye")
	  	.addComponent('bye',byeCfg)
	  	.addComponent('toTop',toTopCfg2)
	  .loader(fullPage);
	  $(".h5_page_first .h5_component").trigger("into")
})