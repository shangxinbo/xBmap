/*
 * 针对百度地图2.0的封装类
 * 密钥 ： GVuY6GVT5TYhZ69f3RCNviSY
 * 作者 :  shangxinbo
 * 时间 ： 2016-3-28
 */

;(function(win) {
    'use strict';
    //加载百度地图函数库
    window.BMap_loadScriptTime = (new Date).getTime();
    document.write('<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=2.0&ak=GVuY6GVT5TYhZ69f3RCNviSY&services=&t=20160310104956"></script>');
    
    //使用该类时请注意要在 document.ready 之后

    var xBmap = function(obj){
        //obj 初始化对象参数
        //必填参数
        this.container = obj.container;         //可以是元素也可以是元素id
        this.lat = obj.lat;          //纬度
        this.lon = obj.lon;          //经度  
        this.location = obj.location; 

        //选填参数
        this.enableScroll = obj.enableScroll?obj.enableScroll:true;     //地图开启滚轮放大缩小
        this.lev = obj.lev ? obj.lev : 12;              //地图的放大级别
        this.minZoom = obj.minZoom;                     //地图的最小级别
        this.maxZoom = obj.maxZoom;                     //地图的最大级别
        this.enableMapClick = obj.enableClick;          //地图上图标是否可点击
        
        if(this.container){
            
                this.init();
            
        }else{
            console.error('container is required');
        }
    } ;

    xBmap.prototype = {
        constructor: xBmap,
        
        //初始化地图
        init : function(){
            this.map = new BMap.Map(this.container,{           // 创建Map实例
                minZoom:this.minZoom,
                maxZoom:this.maxZoom,
                enableMapClick:this.enableMapClick
            });  
            if(this.lat&&this.lon){
                this.map.centerAndZoom(new BMap.Point(this.lat, this.lon), this.lev);      // 初始化地图,设置中心点坐标和地图级别
            }else{
                this.geocorder();   
            }  
  
            if(this.enableScroll){
                this.map.enableScrollWheelZoom();                         //开启鼠标滚轮缩放，官网实例有误
            }     
        },
        setCity : function(city){
            map.centerAndZoom(city,this.lev);      // 初始化地图,用城市名设置地图中心点
        }
        /*
         * 地址编码
         */
        geocorder: function(){
            var _this = this;
            var myGeo = new BMap.Geocoder();      
            // 将地址解析结果显示在地图上，并调整地图视野    
            myGeo.getPoint(this.location, function(point){      
                if (point) {      
                    _this.map.centerAndZoom(point, _this.lev);  
                }      
            });   
        },
        /*
         * 反向地址编码
         */
        getlocation : function(point){
            var myGeo = new BMap.Geocoder();      
            // 根据坐标得到地址描述    
            myGeo.getLocation(point, function(result){      
                if (result){      
                 alert(result.address);      
                }  
            });  
        },
        /*
         * 移动地图到指定坐标
         *  
         */
        panTo : function(lat,lon){
            this.map.panTo(new BMap.Point(lat,lon));
        },
        /*
         * 缩放地图
         * @param num 地图的放大级别
         */
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

        //控件类
        //比例尺控件，默认位于地图左下方，显示地图的比例关系
        addScaleControl: function(){
            var control = new BMap.ScaleControl(/*{anchor: BMAP_ANCHOR_TOP_LEFT}*/);   // 左上角，添加比例尺
            this.map.addControl(control);   
        },
        //地图类型控件，默认位于地图右上方。
        addMaptypeControl: function(){
            this.map.addControl(new BMap.MapTypeControl());     
        },
        //地图平移缩放控件，PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能
        addNavigationControl : function(){
            var navigation = new BMap.NavigationControl();
            this.map.addControl(navigation); 
        },

        //添加信息框
        addinfoWindow:function(point,dom){
            var icon = new BMap.Icon(point.url, new BMap.Size(point.width, point.height),{
                    anchor: new BMap.Size(point.anchor.left, point.anchor.top)       // 设置图片偏移 
                });
            var newMarker = new BMap.Marker(new BMap.Point(this.lat, this.lon),{icon:icon});
            this.map.addOverlay(newMarker);
            var infoWindow = new BMap.InfoWindow(dom, { height: 150, width: 300, overflow:'auto'});
            
            newMarker.addEventListener("click", function(){    
                newMarker.openInfoWindow(infoWindow); 
            }); 
            //this.map.enableScrollWheelZoom();
        },

        /*
         * 添加中心点标记
         * param width   图标显示宽度
         * param height  图标显示高度
         * param lat,lan  图标显示坐标点
         * param anchor   图标偏移量 
         */
        addMarker : function(point,callback){
            var icon = new BMap.Icon(point.url, new BMap.Size(point.width, point.height),{
                    anchor: new BMap.Size(point.anchor.left, point.anchor.top)       // 设置图片偏移 
                });
            var marker = new BMap.Marker(new BMap.Point(point.lat, point.lon),{icon:icon});
            if(callback){
                marker.addEventListener("click", function(){    
                    callback();   
                });
            }
            this.map.addOverlay(marker);
        },

        /*
         * 添加交通图层
         */ 
        addTrafficLayer : function(){
            var traffic = new BMap.TrafficLayer();
            this.map.addTileLayer(traffic);      
        }
    };


    window.xBmap = xBmap;
})(window);


