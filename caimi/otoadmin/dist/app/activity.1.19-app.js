require.config({baseUrl:"/h5/dist",paths:{zepto:"libs/zepto.min",jquery:"libs/jquery-2.1.3.min"}}),require(["jquery","utils/caimi-core-layer","utils/caimi-version"],function(a,b,c){a(".btn").on("touchend click",function(a){a.preventDefault(),c.android?location.href="http://fusion.qq.com/cgi-bin/qzapps/unified_jump?appid=11270323":c.weixin?(handler.addImg(),location.hash="over"):c.iphone?location.href="https://itunes.apple.com/cn/app/cai-mi-cai-piao/id946737222?mt=8":require(["utils/caimi-core-layer"],function(a){a.confirmLayer({tit:"请您选择下载彩票客户端",accept:{label:"Andorid下载",callBack:function(){this.hide(),location.href="http://help.icaimi.com/android/CaiMiLottery_80000.apk"}},cancel:{label:"Iphone下载",callBack:function(){location.href="https://itunes.apple.com/cn/app/cai-mi-cai-piao/id946737222?mt=8"}}})})});!function(){var a=location.hash;a.indexOf("over")>-1&&(sendRegister.showStatus(1),sendRegister.downloadApp(1))}()});