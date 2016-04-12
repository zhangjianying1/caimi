var AllCtrl = angular.module('controller', []);
/**
 * 首页
 */

AllCtrl.controller('IndexController', ['$scope', '$rootScope', '$state', 'LoginService', function($scope, $rootScope, $state, LoginService){

    // 退出登录
    $scope.loginout = function(){
        LoginService.loginOut();
    }

    // 登录
    $scope.loginIn = function(){
        LoginService.loginIn();
    }

    $state.go('index.agentmanage');
    $scope.banners = [
        {
            img: '../images/1.png'
        },
        {
            img: '../images/2.png'
        }
    ];
}]);

AllCtrl.directive('swiper', function(){
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        template:'<div class="swiper"><div><a><img  src="../images/1.png"></a><a><img  src="../images/2.png"></a></div><div class="control"><ul><li class="active">1</li><li>2</li></ul></div></div>',
        link: function(scope, ele, attrs){
            var options = {
                index: 0,
                speed: 300,
                container: ele[0],
                element: ele[0].children[0],
                slides: ele[0].children[0].children,
                slidesLength:0,
                width: 0,
                deltaX: void 0,
                start: {},
                isScrolling: true
            }
            var bBtn = true;
            // 初始化设置元素样式
            function initialize(){
                var first = options.slides[0].cloneNode(true);
                first.setAttribute('key', 'first');
                var last = options.slides[options.slides.length - 1].cloneNode(true);
                last.setAttribute('key', 'last');
                options.element.insertBefore(last, options.slides[0]);

                options.element.appendChild(first);
                options.slides = options.element.children;
                var slidesLength = options.slidesLength = options.slides.length;
                options.width = 'getBoundingClientRect' in options.container ? options.container.getBoundingClientRect().width : options.container.offsetWidth;
                options.element.style.width = options.width * options.slides.length + 'px';
                while (slidesLength --) {
                    options.slides[slidesLength].style.width = options.width + 'px';
                }
            }

            initialize();
            move(1, 0);
            touchstart = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
            touchmove = 'ontouchstart' in document ? 'touchmove' : 'mousemove';
            touchup = 'ontouchstart' in document ? 'touchend' : 'mouseup';
            touchenter = 'ontouchstart' in document ? 'touchstart' : 'mouseover';
            touchleave = 'ontouchstart' in document ? 'touchleave' : 'mouseout';
            window.onresize = function(){
                initialize();
            }
            options.element.addEventListener('webkitTransitionEnd', function(){
                // 最后一张
                if (options.index >= options.slidesLength-1) {
                    move(1, 0);
                } else if (options.index <= 0) {
                    move(options.slidesLength - 2, 0);
                }
                var control = options.container.querySelectorAll('li');
                for (var i = 0; i < control.length; i ++) {
                    control[i].classList.remove('active');
                }
                control[options.index-1].classList.add('active');
            }, false)
            ele.bind(touchstart, touchStart);
            ele.bind(touchmove, touchMove)
            ele.bind(touchup, touchEnd);
            ele.bind(touchenter, touchEnter)
            ele.bind(touchleave, touchLeave)
            function getPageX(event){
                return event.touches ? event.touches[0].pageX : event.clientX;
            }
            function touchStart(event){
                options.start = {
                    pageX: getPageX(event),
                    time: Number(new Date())
                }
                // 滑动的距离
                options.deltaX = 0;
                // 滑动开始时 动画时间为0
                options.element.style.webkitTransTionDuration = 0 + 'ms';
                bBtn = false;
                event.stopPropagation();
            }
            function touchMove(event) {
                if (event.touches && event.touches.length > 1 || bBtn) return;
                options.deltaX = getPageX(event) - options.start.pageX;
                options.element.style.webkitTransform = 'translate3d(' + (options.deltaX - options.width*options.index) + 'px, 0, 0)';

                event.preventDefault();
            }
            function touchEnd(event) {
                var time;
                // 如果滑动时间小于 250毫秒 并且滑动距离大于 20px 或者 滑动距离大于banner的一半
                if ((time = Number(new Date()) - options.start.time) < 250 && Math.abs(options.deltaX) > 20 || Math.abs(options.deltaX) > options.width / 2) {

                    // 向左
                    if (options.deltaX > 0) {
                        options.index --;
                    } else if (options.deltaX < 0 ) {
                        options.index ++;
                    }
                    move(options.index, time);


                } else {
                    move(options.index)
                }

                bBtn = true;
            }
            function touchEnter(){
                options.isScrolling = false;
            }
            function touchLeave(){
                options.isScrolling = true;
            }
            function move(index, speed){

                if (!speed && speed !== 0) {
                    speed = options.speed;
                }
                options.element.style.webkitTransitionDuration = speed + 'ms';
                options.element.style.webkitTransform = 'translate3d(' + -index * options.width + 'px, 0,0)';
                options.index = index;
            }
            var timer = setInterval(function(){
                if (options.isScrolling) {
                    options.index ++;
                    move(options.index);
                }
            }, 2000)
        }
    }
})
AllCtrl.controller('SidebarCtrl', ['$scope', function($scope){
    $scope.sidebarItems = [
        {
            title: '用户管理',
            bodys: [
                {title:'代理商管理', href: '.agentmanage'},
                {title:'登录日志', href: '.loginlog'},
                {title: '代理商录入', href: '.addagent'}
            ]
        },
        {
            title: '资金管理',
            bodys: [
                {title:'代理商资金管理', href: '.agentcapital'}
            ]
        }
    ]
}])


/**
 * 代理商管理
 */
AllCtrl.controller('AgentManageController', ['$scope', 'AjaxService', function($scope, AjaxService, testService, $q){

    $scope.bodys = {};
    $scope.bodys.page = [];
    $scope.userMsg = [];
    $scope.suerSearch = function(){
        $scope.bodys.page = [];
        AjaxService.ajax('get', '/adminController/usersearch?province=' + $scope.province + '&city=' + $scope.city + '&area=' + $scope.area + '&channeltype=' + $scope.channeltype
            + '&registerchannel=' + $scope.registerchannel +'&agentname='+ $scope.agentname + '&mobile=' + $scope.mobile).then(function(data){
            if (data.code === '0000') {
                $scope.bodys.body = data.result;
                $scope.bodys.page.push(data.result[0]);
                $scope.bodys.size = data.result.length;
            } else {
            }
        })
    }
    AjaxService.ajax('get', '/adminController/userstatistics').then(function(data){

        if (data.code === '0000') {
            $scope.userMsg = data.result;
        }
    });
    $scope.$on('changePage', function(scope, val){
        $scope.bodys.page = []
        $scope.bodys.page.push($scope.bodys.body[val])
    })
}])

/**
 * 代理商录入
 */
AllCtrl.controller('AddagentController', ['$scope', 'AjaxService', '$state', function($scope, AjaxService, $state){
    $scope.agentSub = function(){
        AjaxService.ajax('post', 'adminController/addagent',
            {name: $scope.name,
                mobile: $scope.mobile,
                province: $scope.province,
                city: $scope.city,
                area: $scope.area,
                userlevel: $scope.userlevel,
                usertype: $scope.usertype,
                channeltype: $scope.channeltype
            }).then(function(data){
                if (data.code === '0000') {
                    $state.go('index.manageagent');
                }
            }, function(data){
                if (data.code === '2001') {
                    scope.errr = data.msg;
                }
            })
    };
    $scope.$on('select', function(scope, key, val){
        $scope[key] = val;
    })
}])
/**
 * 用户详细信息
 */
AllCtrl.controller('AgentDetailController', ['$scope', 'AjaxService', 'ChangeUserStautsService', '$state', function($scope, AjaxService, ChangeUserStautsService, $state){
    $scope.data = {};
    // 修改用户状态
    $scope.changeStatus = function(param){
        ChangeUserStautsService.changeTo($scope, param);
    };
    // 如果有params 查询该代理商详细信息
    if ($state.params && $state.params.id) {
        ChangeUserStautsService.loadUserDetail($scope, $state.params.id);
    }



}])
/**
 * 登录日志
 */
AllCtrl.controller('LoginLogController', ['$scope', 'AjaxService', '$state', function($scope, AjaxService, $state){
    $scope.bodys = {};
    $scope.bodys.page = []
    var param = $state.params.id ? {agentid: $state.params.id } : '';
    // 如果 param 存在查询 该代理商登录日志

    getLoginlog(param)

    /**
     * 查询登录日志
     */
    $scope.searchLoginLog = function(){
        getLoginlog({agentid: param, starttime: $scope.startime, endtime: $scope.endtime});
    }
    /**
     * 分页
     */
    $scope.$on('changePage', function(scope, val){
        $scope.bodys.page = []
        $scope.bodys.page.push($scope.bodys.body[val])
    })
    /**
     * 查询登录信息日志
     * @param arg
     */
    function getLoginlog (arg) {
        var obj = extend({}, arg);
        AjaxService.ajax('get', '/adminController/loginlog', {params: obj}).then(function(data){
            if (data.code === '0000') {
                $scope.bodys.body = data.result;
                $scope.bodys.page[0] = data.result[0];
            }
        })
    }

    /**
     *  合并对象
     * @param oldObj 源对象
     * @param newObj 要合并的对象
     * @returns {*}
     */
    function extend(oldObj, newObj) {
        for (var i in  newObj) {
            if (newObj.hasOwnProperty(i)) {
                if (newObj[i]) {
                    oldObj[i] = newObj[i];
                }
            }
        }
        return oldObj;
    }
}]);
AllCtrl.controller('LoginCtrl', ['$scope', '$rootScope', 'AjaxService', '$state', 'SessionService', function($scope, $rootScope, AjaxService, $state, SessionService){
    $scope.result = {};
    $scope.isSubmit = false;
    $scope.login = function(){
        $scope.isSubmit = true;

        AjaxService.ajax('post', 'adminController/login', {name: $scope.name, password: $scope.password})
            .then(function(data){

                if (data.code === '0000') {
                    SessionService.createSession(data.result.sessionid, data.result.user, data.result.role);
                    $rootScope.$broadcast('hide')
                    $state.go('index.agentmanage');
                } else {
                    $scope.result.error = data.msg;
                }
            })
    }
}])

