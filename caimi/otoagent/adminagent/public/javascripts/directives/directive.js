angular.module('directive', [])
.directive('sidebar', function(){
        return {
            restrict: 'AE',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            controller: ['$scope', function($scope){
                var panes = []
                $scope.panes = panes;
                this.push = function(pane){
                    if (panes.length == 0) {
                        pane.selected = true;
                    }
                    $scope.panes.push(pane);
                }
                this.select = function(pane) {
                    angular.forEach(panes, function(pane){
                        pane.selected = false;
                    })
                    pane.selected = true;
                }
            }]
        }
    })
.directive('pane', function(){
        return {
            restrict: 'AE',
            transclude: true,
            require: '^sidebar',
            scope: {
                title: '@title'
            },
            template: '<h4 ng-click="toggle()"><a href="">{{ title }}</a></h4><div ng-transclude ng-show="selected"></div>',
            link: function(scope, ele, attrs, TabsController){
                scope.toggle = function(){
                    TabsController.select(scope);
                }
                TabsController.push(scope);
            }
        }
    })
//.directive('dropdown', ['$document', function($document){
//        return {
//            restrict: 'AE',
//            transclude: true,
//            scope: true,
//            replace: true,
//            controller: ['$scope', function($scope){
//                $scope.cont = '';
//                this.push = function(option){
//                    option.selected = false;
//                    $scope.cont = option;
//
//                }
//                $scope.toggle = function(){
//                    $scope.cont.selected = !$scope.cont.selected;
//                }
//                this.createInput = function(val){
//
//                }
//
//            }],
//            template: '<div ><input type="hidden"><button class="btn btn-default dropdown-toggle" type="button" ng-click="toggle()"> {{ cont.title }}' +
//            '<span class="caret"></span></button><div ng-transclude></div></div>'
//
//        }
//    }])
//.directive('option', ['$document', function($document){
//        return {
//            restrict: 'A',
//            transclude: true,
//            replace: true,
//            require: '^dropdown',
//            template: '<ul class="dropdown-menu" ng-show="selected" ng-transclude></ul>',
//            link: function(scope, ele, attrs, DropdownCtrl){
//                scope.title = attrs.title;
//                scope.select = function(val) {
//                    scope.selected = !scope.selected;
//                    scope.title = val;
//                    scope.$emit('select', attrs.name, val);
//                }
//                DropdownCtrl.push(scope);
//            }
//
//        }
//    }])
.directive('citySelect', ['AjaxService', function(AjaxService) {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            controller: ['$scope', function ($scope) {
                $scope.oProvince;
                $scope.oCity;
                $scope.oArea;
                $scope.province;
                $scope.city;
                $scope.area;
                $scope.change = function(val, soure){

                    // 查询市
                    if (soure === 'city') {
                        AjaxService.ajax('get', '/adminController/city?sid=' + val).then(function(data){
                            if (data.code === '0000') {
                                $scope.oCity = data.result;
                                $scope.province = val;
                            }
                        })
                    } else if (soure === 'area'){
                        AjaxService.ajax('get', '/adminController/area?sid=' + val).then(function(data){
                            if (data.code === '0000') {
                                $scope.oArea = data.result;
                                $scope.city = val;
                            }
                        })
                    } else {
                        $scope.area = val;
                        console.log($scope.area)
                    }

                };

                AjaxService.ajax('get', '/adminController/province').then(function(data){
                    if (data.code === '0000') {
                        $scope.oProvince = data.result;
                    }
                })

            }],
            template: '<div ng-transclude></div>'
        }
    }])
.directive('pages', function(){
        return {
            restrict: 'AE',
            controller: ['$scope', function($scope){
                // 一共多少条
                 $scope.itemtotal;
                // 显示多少页码
                 $scope.listsize;
                // 一页多少条数据
                 $scope.itempage;
                // 一共多少页
                $scope.pagetotal;
                 $scope.pages = [];
                 $scope.currentPage = 0;
                 $scope.offsetPage = 0;
                 var page = 0;
                $scope.$watch('itemtotal', function(val){

                    // 一共多少页
                    $scope.pagetotal = Math.ceil($scope.itemtotal / $scope.itempage);
                    //
                    setList();
                   if ($scope.pages[$scope.currentPage - $scope.offsetPage]) {
                       $scope.pages[$scope.currentPage - $scope.offsetPage].active = true;
                   }
                })
                function setList(){
                    $scope.pages = [];
                    page = Math.min($scope.offsetPage + parseInt($scope.listsize), $scope.pagetotal )

                    for (var i = $scope.offsetPage; i < page; i ++) {
                        $scope.pages.push({
                            index: i,
                            text: i+1,
                            active: false
                        });

                    }
                }
                function getOffset(val){
                    var offset = Math.min(val, $scope.pagetotal - $scope.listsize);
                    if (offset < 0) offset = 0;
                    return offset;

                }
                $scope.selectPage = function(val){
                    var offset = 0;
                    if (val < 0 || val >= $scope.pagetotal) return;

                    if ($scope.pages[$scope.currentPage - $scope.offsetPage]) {
                        $scope.pages[$scope.currentPage - $scope.offsetPage].active = false;
                    }

                    if (val < $scope.offsetPage || val >= $scope.offsetPage + $scope.pages.length) {
                        offset = getOffset(val);
                        if (offset != $scope.offsetPage) {
                            $scope.offsetPage = offset;
                            setList();
                        }
                    }
                    $scope.currentPage = val;

                    if ($scope.pages[$scope.currentPage - $scope.offsetPage]) {
                        $scope.pages[$scope.currentPage - $scope.offsetPage].active = true;
                    }
                    $scope.$emit('changePage', $scope.currentPage);
                }
                $scope.isFirst = function(){
                    if ($scope.currentPage <= 0) {
                        return true;
                    }
                    return false;
                }
                $scope.isLast = function(){
                    if ($scope.currentPage == ($scope.pagetotal-1)) {
                        return true;
                    }
                    return false;
                }
                $scope.previous = function(){
                    if (!$scope.isFirst()) {
                        $scope.selectPage($scope.currentPage-1)
                    }
                }
                $scope.next = function(){
                    if (!$scope.isLast()) {
                        $scope.selectPage($scope.currentPage+1)
                    }
                }
            }],
            transclude: true,
            template: '<nav ng-transclude></nav>',
            link: function(scope, ele, attrs){
               attrs.$observe('itemtotal', function(val){
                    scope.itemtotal = val;
                })
                scope.itempage = attrs.itempage;
                scope.listsize = attrs.listsize;

            }
        }
    })
.directive('login', function($rootScope){
        return {
            restricit: 'AE',
            transclude: true,
            controller: ['$scope', function($scope){
                $scope.login = false;
                $scope.$on('show', function(){
                    $scope.login = true;
                })
                $scope.$on('hide', function(){
                    $scope.login = false;
                });
            }],
            templateUrl: '../../views/entry/login.html',

        }
    })