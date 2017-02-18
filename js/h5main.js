var H5=function(){
	this.id="h5_main";
	this.el=$("<div class='h5' id='"+this.id+"'></div>")
	$('body').append(this.el);
	this.page=[];
	/**
	 * 新增一个页面 *
	 *[addPage descripttioon]
	 *@param {string} name 组件的名称，会加入到className当中
	 *@param {string} text 页面的默认文本
	*/
	this.addPage=function(name,text,dom){
		var page=$("<div class='h5_page section'>");
		name && page.addClass('h5_page_'+name)
		text && page.text(text);
		dom  && page.append(dom)
		this.page.push(page)
		$(this.el).append(page)
		return this
	}
	this.addComponent=function(name , cfg){
		var cfg = cfg || {};
		$.extend({
			type:'base'
		},cfg);
		switch( cfg.type ){
			case 'base':
				var component=new H5ComponentBase(name,cfg);
				break;
			case 'point':
				var component=new H5ComponentPoint(name,cfg);
				break;
			case 'bar':
				var component=new H5ComponentBar(name,cfg);
			break;
			case 'polyline':
				var component=new H5ComponentPolyline(name,cfg);
			break;
			case 'vbar':
				var component=new H5ComponentVBar(name,cfg);
			break;
			case 'roll':
				var component=new H5ComponentRoll(name,cfg);
			break;
			case 'bin':
				var component=new H5ComponentBin(name,cfg);
			break;
			case 'title':
				var component=new H5ComponentTitle(name,cfg);
			break;
		}

		$(this.page.slice(-1)[0]).append(component)
		return this
	}
	this.loader=function(ctrl){
		this.el.fullpage(ctrl)
	}
	return this
}