/*
 * 针对百度地图2.0的封装类
 * 密钥 ： GVuY6GVT5TYhZ69f3RCNviSY
 */
var lsBmap = function(obj){
    //obj 初始化对象参数
    //必填参数
    this.id =  obj.id ;
    this.lat = obj.lat;     //纬度
    this.lon = obj.lon;     //经度   
    this.cityName = obj.city;                 //显示地图城市

    this.icon = new BMap.Icon("http://f4.lashouimg.com/static/pics/deal/marker.png", new BMap.Size(18, 28));


    //选填参数
    this.typeControl = obj.typeControl;       //开启地图控件
    this.enableScroll = obj.enableScroll;     //地图开启滚轮放大缩小
    this.lev = obj.lev ? obj.lev : 11;        //地图的放大级别
    this.minZoom = obj.minZoom;               //地图的最小级别
    this.maxZoom = obj.maxZoom;               //地图的最大级别
    this.enableMapClick = obj.enableClick;    //地图上图标是否可点击


    this.map = new BMap.Map(this.id,{           // 创建Map实例
        minZoom:this.minZoom,
        maxZoom:this.maxZoom,
        enableMapClick:this.enableMapClick
    });    

    this.map.centerAndZoom(new BMap.Point(this.lat, this.lon), this.lev);      // 初始化地图,设置中心点坐标和地图级别
    
    if(this.typeControl==true){                                     //添加地图类型控件
        this.map.addControl(new BMap.MapTypeControl());               
    }
    
    this.map.setCurrentCity(this.cityName);                         // 设置地图显示的城市 此项是必须设置的
    this.map.enableScrollWheelZoom(this.enableScroll);              //开启鼠标滚轮缩放
} 

lsBmap.prototype = {

    //移动地图
    //@param lat 经度
    //@param lon 纬度
    panTo : function(lat,lon){
        this.map.panTo(new BMap.Point(lat,lon));
    },
    //缩放地图
    //@param num 地图的放大级别
    setZoom : function(num){
        this.map.setZoom(num);  
    },

    //是否可拖拽
    disableDragging:function(){
        this.map.disableDragging(); 
    },
    enableDragging:function(){
        this.map.enableDragging(); 
    },

    //添加地图比例尺
    addScaleControl: function(){
        var control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
        this.map.addControl(control);   
    },
    //添加控制大小组件
    navigationControl : function(){
        var navigation = new BMap.NavigationControl();
        this.map.addControl(navigation); 
    },

    //添加商家信息
    addPlaces:function(obj){
        var newMarker = new BMap.Marker(new BMap.Point(this.lat, this.lon),{icon:this.icon,title:obj.title});
        this.map.addOverlay(newMarker);
        var infoDom = '<div style="overflow-y:auto;width:300px;height:150px;"><h4><em>' + obj.title + '</em></h4>';
        if(obj.address){
            infoDom += '<p style="color:#787878;line-height:1.5em; margin:3px 0px;">地址：' + obj.address +'</p>';
        }
        if(obj.hours){
            infoDom += '<p style="color:#787878;line-height:1.5em;margin:3px 0px;">营业时间：' + obj.hours +'</p>';
        }
        if(obj.phone){
            infoDom += '<p style="color:#787878;line-height:1.5em;margin:3px 0px;">电话：' + obj.phone +'</p>';
        }
        if(obj.bus){
            infoDom += '<p style="color:#787878;line-height:1.5em;margin:3px 0px;">交通指南：' + obj.bus +'</p>';
        }
        infoDom += '</div>';
        infoWindow = new BMap.InfoWindow(infoDom, { height: 150, width: 300, overflow:'auto',enableMessage:false });
    
        newMarker.openInfoWindow(infoWindow); 
        this.map.enableScrollWheelZoom();
    },

    //添加中心点
    addCoin : function(){
        var newMarker = new BMap.Marker(new BMap.Point(this.lat, this.lon),{icon:this.icon});
        this.map.addOverlay(newMarker);
    } 
}

/*
 * 地图图层的显示
 */
var map_pop = function(id,width,height,title){
    var dom = '<div class="pop" id="full-map" style="display:block;width:'+ width+'px;margin-top:-'+ height/2+'px;">\
                    <a href="javascript:void(0);" class="pop-close"></a>\
                    <div class="pop-border"></div>\
                    <div class="pop-main" >\
                        <div class="pop-title">'+ title +'</div>\
                        <div class="cl">\
                            <div id="'+ id +'" style="width:'+ width +'px;height:'+ height +'px;">\
                            </div>\
                        </div>\
                    </div>\
                </div>';
    $(dom).appendTo('body');
    $('body').append('<div id="shadowlayer" style="display:block;"></div>')
    var _This = this;
    $('#full-map .pop-close').bind('click',{_This:_This},function(event) {
        _This.close();
    });


    this.close = function(){
        $('#full-map').remove();
        $('#shadowlayer').remove();
    }


    //修改地图标题title
    this.changeTitle = function(text){
        if($('#full-map').length>0){
            $('#full-map .pop-title').html(text);
        }else{
            console.log('不存在地图dom，请先初始化地图');
        }
    }
} 

