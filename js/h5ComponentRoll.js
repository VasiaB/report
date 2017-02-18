/* 柱图组件对象 */
var H5ComponentRoll=function(name,cfg){
  //获取数据
  var renderColor={"out":"#37c","inner":"#225"}
  var component=new H5ComponentBase(name,cfg);
  //创建画布
  var canvas=document.createElement("canvas");
  canvas.className="roll"
  canvas.width=cfg.width*2
  canvas.height=cfg.height*2
  component.append($(canvas))
  var cxt=canvas.getContext("2d")
  //渲染基层
  $.each(cfg.data,function(idx,item){
    var color = item[5] ? item[5] : renderColor["out"];
    cxt.beginPath();
    cxt.arc(item[3]*2,item[4]*2,item[2]*2,0,Math.PI*2);
    cxt.lineWidth=item[2]*0.4
    cxt.strokeStyle=color;
    cxt.closePath()
    cxt.stroke()
  })
  //渲染文字
  function renderText(i){
    $.each(cfg.data,function(idx,item){
      if(i==idx){}
      var color = item[5] ? item[5] : renderColor["out"];
      cxt.beginPath();
      cxt.textAlign="center";
      cxt.fillStyle=renderColor["out"]
      cxt.font=item[2]*0.3*2+"px simHei"
      cxt.fillText(item[0],item[3]*2,item[4]*2-item[2]*2*0.1);
      cxt.beginPath();
      cxt.textAlign="center";
      cxt.fillStyle="#333"
      cxt.font=item[2]*0.4*2+"px simHei"
      cxt.fillText(item[1],item[3]*2,item[4]*2+item[2]*2*0.3);
    })
  }
  renderText()
  //渲染数据
  var dataCanvas=document.createElement("canvas");
  dataCanvas.className="roll"
  dataCanvas.width=cfg.width*2
  dataCanvas.height=cfg.height*2
  component.append($(dataCanvas))
  var cxt=dataCanvas.getContext("2d")
  function render(i){
    $.each(cfg.data,function(idx,item){
      var color = renderColor["inner"]
      cxt.beginPath();
      if(i<=item[1]){
        cxt.arc(item[3]*2,item[4]*2,item[2]*2,Math.PI*-0.5,Math.PI*(i*2-0.5));
      }else{
        cxt.arc(item[3]*2,item[4]*2,item[2]*2,Math.PI*-0.5,Math.PI*(item[1]*2-0.5));
      }
      cxt.lineWidth=item[2]*0.25
      cxt.strokeStyle=color;
      cxt.stroke()
    })
  }

  function getMax(){
    var max=0;
    for(var i=0;i<cfg.data.length;i++){
      if(max<cfg.data[i][1]){
        max=cfg.data[i][1];
      }
    }
    return max;
  }
  function draw(){
    var i=0;
    var timer=setInterval(function(){
      cxt.clearRect(0,0,canvas.width,canvas.height)
      render(i)
      i+=0.01;
      if(i>=getMax()){
        clearInterval(timer);
      }
    },30)
  }
  //加载动画
  component.on("loadAnimate",function(){
    cxt.clearRect(0,0,1000,1000)
    setTimeout(function(){
      draw()
    },500)
  })

  component.on("leaveAnimate",function(){
    
  })

  return component;
}