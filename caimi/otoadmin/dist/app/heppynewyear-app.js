require.config({baseUrl:"../../dist",paths:{zepto:"libs/zepto.min",jquery:"libs/jquery-2.1.3.min",islogin:"utils/caimi-core-islogin",ajax:"utils/caimi-core-ajax",islogin:"utils/caimi-core-islogin",version:"utils/caimi-version",url:"utils/caimi-core-url",imgload:"utils/caimi-imgload",template:"libs/template.min"}}),require(["jquery","utils/caimi-core-ajax","utils/caimi-core-layer","utils/caimi-core-url","utils/caimi-core-form","utils/caimi-imgload","utils/caimi-core-islogin"],function(a,b,c,d,e,f,g){var h={userCode:g.getData().userCode||"",bindMobile:!0,bBtn:!0,actend:!0},i=function(){var c={init:function(){f.imgLoad(a("img[_src]").get(),function(){a(".loading").hide().next().show()}),c.getList(),c.getScore()},getList:function(){b.post(d.loginScore,{userCode:h.userCode,activityCode:"A014193899215470002"},function(b){"0000"===b.code&&(f(b.result),0===b.result.bindMobile&&(h.bindMobile=!1),0===b.result.activityStatus&&(a(".show-status a").show().eq(1).addClass("disabled").find("span").html("活动未开始"),h.actend=!1),2===b.result.activityStatus?(a(".show-status a").eq(1).show().addClass("disabled").find("span").html("活动已结束"),h.actend=!1):1===b.result.isLogin?(a(".show-status a").eq(1).show(),a(".other").show(),c(b.result.detailList)&&(a(".show-status").hide(),h.bBtn=!1)):a(".show-status a").eq(0).show())});var c=function(b){var c=!1;if(a.isArray(b))for(var d=0;d<b.length;d++)if(1===b[d].curDay&&1===b[d].status){c=!0;break}return c},e=function(a){for(var b=a.detailList,c=/\d*\-\d*\-(\d*)/,d=["除夕","初一","初二","初三","初四","初五","初六"],e=0;e<b.length;e++)b[e].day=c.exec(b[e].day)[1],b[e].CNDay=d[e];return a},f=function(b){b=e(b),require(["template"],function(c){var d=c("temp",b);a("#cont").html(d)})}},getScore:function(){a(".show-status a").eq(1).on("touchend click",function(){var e=a(this);h.actend&&(h.bindMobile?h.bBtn&&(h.bBtn=!1,e.find("span").html("领取中..."),b.post(d.receiveLoginScore,{userCode:h.userCode,activityCode:"A014193899215470002"},function(b){"0000"===b.code?"0000"===b.result.code&&(e.addClass("overdue-take").find("span").html("奖励已领取"),a(".nowdate").addClass("overdue-take").removeClass("nowdate").find("a").html("已领取"),c.toGame()):h.bBtn=!0})):require(["utils/caimi-core-layer"],function(a){a.confirmLayer({tit:"请绑定手机后参与活动",accept:{label:"去绑定",callBack:function(){this.hide(),location.href="icaimi:host:bind "}},cancel:{label:"取消",callBack:function(){}}})}))})},toGame:function(){require(["utils/caimi-core-layer"],function(a){a.confirmLayer({tit:"您已获得2000积分奖励，去积分游戏赚取更多积分",accept:{label:"现在就去",callBack:function(){this.hide(),location.href="icaimi:host:goGame"}},cancel:{label:"一会再说",callBack:function(){}}})})}};return c}();i.init()});