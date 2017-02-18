var H5ComponentVBar=function(name,cfg){
	var component=new H5ComponentBase(name,cfg);
	var base = cfg.data[0]
	$.each(cfg.data,function(idx,item){
		var vbar=$('<div class="vbar vbar_'+idx+'">');
		//width的宽度要变;高度为100%;
		var width=cfg.width/cfg.data.length
		var height=cfg.height*item[1]*0.6
		vbar.width(width)

		var name=$('<div class="name">'+item[0]+'</div>');
		name.css({top:cfg.height+10}).width(width)
		var rate=$('<div class="per">'+(item[1]*100)+'%</div>');
		rate.css({"bottom":height,"margin-left":width/4})
		var barpic=$('<div class="barpic"></div>');
		var per=item[1]*100+'%';
		//获得color
		var color="rgb("+parseInt(88*item[1])+","+parseInt(240*(1-item[1]))+",200)"
		//高度归零
		barpic.height(0).width(width/2).css({"background-color":color,"margin-left":width/4})
		vbar.append(name);
		vbar.append(barpic);
		vbar.append(rate);
		component.append(vbar);
		component.on("loadAnimate",function(){
			barpic.height(0)
			rate.css({"opacity":0})
			setTimeout(function(){
				barpic.animate({height:height},600,function(){
					rate.animate({opacity:1},200)
				})
			},600)	
		}) //加载时会执行;
	})
	return component;
}
