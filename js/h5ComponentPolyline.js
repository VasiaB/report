/* 柱图组件对象 */
var H5ComponentPolyline=function(name,cfg){
  var component=new H5ComponentBase(name,cfg);
  // 创建网格画布
  var canvas=document.createElement('canvas')
    canvas.width=cfg.width*2;
    canvas.height=cfg.height*2;
    var w=canvas.width-10;
    var h=canvas.height-40;
    canvas.className="canvas lowerCanvas";
    component.append(canvas);
    var cxt=canvas.getContext("2d");

    //获取画布
    //开始绘制网格
    var step=10;  //精确度
    var dataCount=cfg.data.length;   //数据数
    var color="#38a";  //数据色;
    var lineColor="#aaa"  //底层色

    //竖向绘制
    cxt.beginPath(); 
    for(var i=0;i<step+1;i++){
      cxt.moveTo(5,i*(h/step)+5);
      cxt.lineTo(w+5,i*(h/step)+5);
    }

    //横向绘制;
    for(var i=0;i<dataCount+2;i++){
      cxt.moveTo(i*(w/(dataCount+1))+5,5);
      cxt.lineTo(i*(w/(dataCount+1))+5,h+5);
    }
    cxt.strokeStyle=lineColor;
    cxt.strokeWidth=1;
    cxt.stroke()
    cxt.closePath()

  //绘制label画布;
  var textCanvas=document.createElement('canvas');
  textCanvas.width=cfg.width*2;
  textCanvas.height=cfg.height*2;
  textCanvas.className="canvas textCanvas";
  component.append(textCanvas);
  var cxt=textCanvas.getContext("2d");
  cxt.beginPath();
  cxt.fillStyle="#666"
  cxt.font="25px Arial";
  cxt.textAlign="center"
  $.each(cfg.data,function(idx,item){
    cxt.fillText(item[0],(idx+1)*(w/(dataCount+1))+5,h+30);
  })

  //加入数据画布;
  var dataCanvas=document.createElement('canvas');
  dataCanvas.width=cfg.width*2;
  dataCanvas.height=cfg.height*2;
  dataCanvas.className="canvas dataCanvas";
  component.append(dataCanvas);  //加入数据层;
  var cxt=dataCanvas.getContext("2d")
  cxt.beginPath();
  function dataRender(data){
    cxt.clearRect(0,0,w+5,h+5);
    var goal=[(w/(dataCount+1))+5,(h-data[0]*h)] //获得第一个点的位置;
    $.each(data,function(idx,item){
    //依据每一个数据绘制点;
      var x=(idx+1)*(w/(dataCount+1))+5;
      var y=(1-item)*h;
      cxt.beginPath()
      cxt.arc(x,y,5,0,Math.PI*2)
      cxt.fillStyle=color;
      cxt.fill();
      cxt.closePath()
      //绘制连接线;
      cxt.beginPath()
      cxt.moveTo(goal[0],goal[1])
      goal=[x,y]
      cxt.lineTo(x,y) 
      cxt.strokeStyle=color;
      cxt.closePath()
      cxt.stroke()
    })
    //绘制阴影
    cxt.beginPath()
    cxt.moveTo((w/(dataCount+1))+5,h+5)
    for(var i=0;i<data.length;i++){
      var x=(i+1)*(w/(dataCount+1))+5;
      var y=(1-data[i])*h;
      cxt.lineTo(x,y)
    }
    cxt.lineTo((w/(dataCount+1))*dataCount+5,h+5);
    cxt.closePath();
    cxt.fillStyle="rgba(69,124,244,0.6)";
    cxt.fill()
  }
  
  function drawLine(){
    //绘制生长,首先我们需要做一个保存当前数据的数组;
    var dataCopy=[];
    var dataIsMax=[];
    for(var i=0;i<cfg.data.length;i++){
      dataCopy.push(0);
      dataIsMax.push(false);
    } //这下我就有了Length个0了;

    var timer=setInterval(function(){
      dataRender(dataCopy);
      for(var i=0;i<dataCopy.length;i++){
        if(dataCopy[i]<cfg.data[i][1]){
          var v= (cfg.data[i][1]-dataCopy[i])/20>0.005 ? (cfg.data[i][1]-dataCopy[i])/20 : 0.005
          dataCopy[i]=dataCopy[i]+v;  //每次都载入数据
        }else{
          dataIsMax[i]=true;
        }
      }

      if(isOk(dataIsMax)){
        clearInterval(timer)
      }

    },30) //写个timer

    function isOk(bool){
      for(var i=0;i<bool.length;i++){
         if(!dataIsMax[i]){
            return false;
         }
      }
      return true
    }//写一个是否全部都是true的函数;
  }

  component.on("loadAnimate",function(){
    cxt.clearRect(0,0,1000,1000)  
    setTimeout(function(){
      drawLine()
    },700)
  })

  component.on("leaveAnimate",function(){
    cxt.clearRect(0,0,1000,1000)
  })

  return component;
}