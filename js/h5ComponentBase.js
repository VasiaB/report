H5ComponentBase = function (name,cfg) {

	var cfg=cfg || {};
	var component=$("<div class='h5_component'></div>")
	cfg.text && $(component).text(cfg.text);
	cfg.type && $(component).addClass("h5_component_"+cfg.type);
	name && $(component).addClass("h5_component_base_"+name);
	cfg.width  && $(component).width(cfg.width);
	cfg.height && $(component).css('height',cfg.height)
	cfg.center && $(component).css({
		left:"50%",
		top:"50%",
		"marginTop":-component.height()/2,
		"marginLeft":-component.width()/2
	});
	cfg.css  && $(component).css(cfg.css);
	//所有的其他组件基于它来创建,这个文件会让他拥有基本的名字宽高等通用属性；
	cfg.animateIn  && $(component).on("into",function(){
		cfg.animateIn && component.animate(cfg.animateIn)
		component.trigger("loadAnimate")
	})
	cfg.animateOut && $(component).on("out",function(){
		cfg.animateOut && component.animate(cfg.animateOut)
		component.trigger("leaveAnimate")
	})
	return component;
	
}