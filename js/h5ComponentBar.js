var H5ComponentBar=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);
	var base = cfg.data[0]
	$.each(cfg.data,function(idx,item){
		var bar=$('<div class="bar bar_'+idx+'">');
		var name=$('<div class="name">'+item[0]+'</div>');
		var rate=$('<div class="per">'+(item[1]*100)+'%</div>');
		var barpic=$('<div class="barpic"></div>');
		var per=item[1]*100+'%';
		var color="rgb("+parseInt(88*item[1])+","+parseInt(240*(1-item[1]))+",200)"
		barpic.width(0)
			.css("background-color",color)
		barpic.animate({width:cfg.width*item[1]*0.6},1000)
		bar.append(name);
		bar.append(barpic);
		bar.append(rate);
		component.append(bar);
		component.on("loadAnimate",function(){
			barpic.width(0)
			rate.css({"opacity":0})
			setTimeout(function(){
				barpic.animate({width:cfg.width*item[1]*0.6},600,function(){
					rate.animate({opacity:1},200)
				})
			},500)
		}) //加载时会执行;
	})
	return component;
}
