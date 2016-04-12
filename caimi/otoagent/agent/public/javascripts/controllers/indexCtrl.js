var ctrl = angular.module('indexCtrl', []);
/**
 * 代理商登录
 */
ctrl.controller('LoginCtrl',  ['$scope','AjaxService', '$state', function($scope, AjaxService, $state){
	$scope.login = function(){
        AjaxService.ajax('post', '/controller/login', {name: $scope.name, password: $scope.password}).then(function(data){
            console.log(data)
            if (data.code === '0000') {
                $state.go('index')
            }
        })
	}
}])
/**
 * 代理商注册
 */
ctrl.controller('RegisterCtrl',  ['$scope','AjaxService', '$state', function($scope, AjaxService, $state){
    $scope.login = function(){
        AjaxService.ajax('post', '/controller/register', {name: $scope.name, password: $scope.password}).then(function(data){
            console.log(data)
            if (data.code === '0000') {
                $state.go('login')
            }
        })
    }
}])
/**
 * 代理商首页
 */
ctrl.controller('IndexCtrl', ['$scope', function($scope){

}])

/**
 * 我的用户首页
 */
ctrl.controller('MyusersCtrl', ['$scope', function($scope){

}])
/**
 * 用户列表
 */
ctrl.controller('UserlistCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
   $scope.users = {
        result:[
            {
                id: '123',
                mobile: 13454333345,
                bettingAmount: "34.33",
                registerTime: '2015-4-5 11:30:30',
                LatsRechargeTime: '2015-5-5 12:12:12'
            },
            {
                id: '123',
                mobile: 13454333345,
                bettingAmount: "34.33",
                registerTime: '2015-4-5 11:30:30',
                LatsRechargeTime: '2015-5-5 12:12:12'
            },
            {
                id: '123',
                mobile: 13454333345,
                bettingAmount: "34.33",
                registerTime: '2015-4-5 11:30:30',
                LatsRechargeTime: '2015-5-5 12:12:12'
            },
            {
                id: '123',
                mobile: 13454333345,
                bettingAmount: "34.33",
                registerTime: '2015-4-5 11:30:30',
                LatsRechargeTime: '2015-5-5 12:12:12'
            }
        ]
   }
}])
/**
 * 用户详情
 */
ctrl.controller('UserdeatilCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
    console.log($stateParams)
}])
ctrl.factory('hintServ', function($http, $document, $rootScope, $compile){
    $rootScope.bb = 44;
    return {
        hint: function(param, url){
            $http.get(url || '../../views/modal/alert.html').then(function(data){
                var hint = angular.element(data.data);
                var mask = angular.element('<div id="mask"></div>');

                if ($document.find('#alert')){
                    $document.find('body').prepend(hint)
                    $document.find('body').prepend(mask)
                }

                var scope = angular.extend($rootScope.$new(),
                    param,
                    {confirm: function(){
                        hint.remove();
                        mask.remove();
                    }
                    });
                $compile(hint)(scope)
            })
        }
    }
});
ctrl.service('DialogServ', function($http, $rootScope, $document, $compile){
    var dialogMap = {};
    return {
        modal: function(param, data){
           $http.get(param.url).then(function(result){
                var confirm = angular.element(result.data);
                var mask = angular.element('<div id="mask"></div>');
                var newScope = $rootScope.$new();
                angular.extend(newScope, data);
               $document.find('body').append(confirm);
               $document.find('body').append(mask);
               $compile(confirm)(newScope);
               dialogMap[param.key] = param;

               dialogMap[param.key].confirm = confirm;
               dialogMap[param.key].mask = mask;
           });
        },
        accept: function(key, result){
            this.dismiss(key);
            if (dialogMap[key].accept) {
                dialogMap[key].accept(result);
            }
        },
        dismiss: function(key){
            dialogMap[key].confirm.remove();
            dialogMap[key].mask.remove();
        }
    }
})
ctrl.controller('alertCtrl', ['$scope', 'hintServ', function($scope, hintServ){
    $scope.opactions = '输入结果';
    $scope.hint = function(){
        hintServ.hint({title: $scope.opactions});
    }
    $scope.$on('bb', function(str){
        $scope.opactions = 'fdfsdf';
        console.log(str)
    })
}]);
ctrl.controller('TestdialogCtrl', ['$scope', 'DialogServ', function($scope, DialogServ){
    $scope.result = '';
    $scope.dialog = function(){
        $scope.$broadcast('bb', '33')
        DialogServ.modal({
            key: 'ng.confirm',
            url: '../../views/modal/confirm.html',
            accept: function(result){
                $scope.result = result;
            }
        }, {name: '输入'})
    }

}]);
ctrl.controller('DialogCtrl', ['$scope', 'DialogServ', function($scope, DialogServ){
    $scope.name = '';
    $scope.accept = function(){
        DialogServ.accept('ng.confirm', $scope.name);
    }
    $scope.cancel = function(){
        DialogServ.dismiss('ng.confirm');
    }
    $scope.close = function(){
        DialogServ.dismiss('ng.confirm');
    }
}])
ctrl.controller('TestListCtrl', ['$scope', function($scope){
    $scope.students = [
        {name: "Tom",age:15, gender: 'man'},
        {name: "lily",age:15, gender: 'woman'},
        {name: "Meik",age:15, gender: 'man'}
    ];
    $scope.itemMenu = function(student){
        var arrMenu = [
            {
                title: 'greet',
                action: function(){
                    alert('I am' + student.name)
                }
            },
            {
                title: 'smoke',
                action: function(){
                    alert('I am' + student.name + ', I can smoke');
                }
            }
        ];

        if (student.name == 'Meik') {
            arrMenu.push({
                title: 'make up',
                action: function(){
                    alert('I am a girl, am i beautiful')
                }
            })
        }
        return arrMenu;
    }
}]);
ctrl.directive('contextMenu', function($http, $compile, $rootScope, $document){
    var contextMenu;

    return {
        restrict: 'AE',
        link: function(scope, ele, attrs){
            $http.get('../../views/modal/menu.html').then(function(result){
                var menu = angular.element(result.data);
                $compile(menu)(angular.extend($rootScope.$new(),{
                    items: scope.$eval(attrs['contextMenu'])
                }));

                ele.on('contextmenu', function(evt){
                    var target = evt.target;

                    $document.find('body').append(menu);

                    var top = evt.clientY + 'px';
                    var left = evt.clientX + 'px';

                    menu.css({ left: left, top: top, display: 'block'})
                    if (contextMenu && contextMenu != menu) {
                        contextMenu.css('display', 'none');
                    }
                    contextMenu = menu;
                    evt.preventDefault();
                    evt.stopPropagation();
                })
                $document.on('click', function(){
                    menu.css('display', 'none')
                })
            })

        }
    }
})
ctrl.controller('StepCtrl', ['$scope', function($scope){
    $scope.$on('changePos', function(evt, val){
        $scope.step = val;
    })

}])
ctrl.directive('stepper', function($document){
    return {
        restrict: 'AE',
        template: '<style>.stepper-box{width:600px;height:20px;background:#f5f5f5;text-align:left;}.step-progress{float:left;height:20px;background:blue}.step-progress ~ button{padding:10px;position:absolute}</style><div class="stepper-box">' +
            '<div class="step-progress" ng-style="currentPos()"></div><button ng-click="currentPos()"></button></div>',
        controller: function($scope){
            $scope.currentStep = 0;
            $scope.maxStep = 0;

            $scope.changePos = function(val) {
                if (val >= 0 && val <= $scope.maxStep && val !== $scope.currentStep) {
                    $scope.currentStep = val;
                    $scope.$emit('changePos', val);
                }
            }
        },
        link: function(scope, ele, attrs){

            scope.maxStep = attrs['maxstep'] || 10;

            var allWidth = ele.children()[1].offsetWidth;
            attrs.$observe('currentstep', function(val){
                scope.currentStep = val || 10;

            })
            scope.currentPos = function(val){
                return {width: scope.currentStep * 100 / scope.maxStep + '%'};
            }
            scope.currentStep = 2;
            ele.on('click', function(evt){
                var targer = evt.target;
                if (targer.nodeName.toLowerCase() == 'button') return;
                var clickL = evt.offsetX || evt.layerX;

                scope.$apply(function(){
                    scope.changePos(Math.round(clickL / allWidth * scope.maxStep))
                })

            })
            var oButton = ele.find('button');
            var oProgress = ele.children().find('div');
            var value;
            var dragging;
            oButton.on('mousedown', function(evt){
                dragging = true;
                ele.on('mousemove', function(evt){
                    if (dragging) {
                        var mouseL = evt.clientX - ele[0].getBoundingClientRect().left;
                        var temp = Math.round(mouseL / allWidth * scope.maxStep);

                        if (temp >= 0 && temp <= scope.maxStep) {
                            oProgress.css('width', mouseL + 'px');
                            value = temp;
                        }
                    }
                });
                $document.on('mouseup', function(){
                    if (dragging) {
                        scope.changePos(value);
                        scope.$digest();
                    }
                    dragging = false;
                })
                evt.preventDefault();
            })
        }
    }
})
ctrl.controller('PageCtrl', ['$scope', function($scope){
    $scope.showPage = function(val, args){
        $scope.text = args;
        console.log(args)
    }
    $scope.$on('pagechage', $scope.showPage);
}]);
ctrl.directive('observe', function(){
    return {
        restrice: 'EA',
        controller: function($scope, pagerConfig){
            // 共多少条
            $scope.totalItems = 0;
            $scope.page = [];
            // 偏移数
            $scope.offsetPage = 0;
            // 一页多少条
            $scope.itemsPerpage = 0;
            // 一个多少页
            $scope.totalPages = 0;
            $scope.currentPage = 0;

            $scope.$watch('totalItems', function(){
                $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerpage);

                resetPageList();
                if ($scope.page[$scope.currentPage]) {
                    $scope.page[$scope.currentPage].active = true;
                }
            });

            var resetPageList = function(){
                $scope.page = [];

                var last = Math.min(Number($scope.offsetPage) + Number($scope.listSizes), $scope.totalPages);

                for (var i = $scope.offsetPage; i < last; i ++) {
                    $scope.page.push({
                        text: i,
                        indexPage: i,
                        active: false
                    })
                }

            }
            var getOffset = function(index){
                var offset = Math.min(index, $scope.totalPages - $scope.listSizes);
                if (offset <= 0) {
                    offset = 0;
                }
                return offset;
            };
            $scope.selectPage = function(index){
                if (index < 0 || index >= $scope.totalPages) {
                    return;
                }
                if ($scope.page[$scope.currentPage-$scope.offsetPage]) {
                    $scope.page[$scope.currentPage-$scope.offsetPage].active = false;
                }
                $scope.currentPage = index;
                // 如果currentPage 小于 offsetPage 或者 currentPage 大于 offsetPage加listsizes

                if ($scope.currentPage < $scope.offsetPage || $scope.currentPage >= $scope.offsetPage + $scope.page.length) {

                    $scope.offsetPage = getOffset(index)

                    resetPageList();
                }

                if ($scope.page[$scope.currentPage-$scope.offsetPage]) {
                    $scope.page[$scope.currentPage-$scope.offsetPage].active = true;
                }
                $scope.$emit('pagechage', $scope.currentPage);
            };
            $scope.next = function(){
                if ($scope.isLast()) {
                    return;
                }
                $scope.selectPage($scope.currentPage + 1);
            };
            $scope.provie = function(){
                if ($scope.isFirst()) return
                $scope.selectPage($scope.currentPage - 1);
            }
            $scope.first = function(){
                $scope.selectPage(0);
            }
            $scope.last = function(){
                $scope.selectPage($scope.totalPages - 1);
            }
            $scope.isFirst = function(){
                return $scope.currentPage <= 0;
            };
            $scope.isLast = function(){
                return $scope.currentPage >= $scope.totalPages - 1;
            }
            $scope.getText = function(key) {
                return pagerConfig.text[key];
            };


        },
        link: function(scope, ele, attrs){

            scope.itemsPerpage = attrs.itemsperpage || 1;
            scope.listSizes = attrs.listsizes;
            attrs.$observe('totalitems', function(val){
                scope.totalItems = val;
            })
        },
        templateUrl: '../../views/modal/page.html'
    }
}).constant('pagerConfig', {
        text: {
            'first': '首页',
            'provie': '上一页',
            'next': '下一页',
            'last': '尾页',
        }
    }
)