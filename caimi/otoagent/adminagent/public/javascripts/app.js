
var entry = angular.module('adminApp', ['ui.router', 'ngSanitize', 'controller', 'service', 'directive'], function(){})
//entry.config(['$httpProvider', function($httpProvider){
//    $httpProvider.defaults.transformRequest = function(data) {
//        console.log(data)
//    }
//}]);
entry.run(['$rootScope', 'AuthorizedService', '$templateCache', '$cacheFactory', function($rootScope, AuthorizedService, $templateCache, $cacheFactory){
    $rootScope.$on('$stateChangeStart', function(event, next){
        AuthorizedService.isLogin();
        if (!AuthorizedService.isAuthorized()) {
            $rootScope.$broadcast('show');
        }

    });
    var aa = $cacheFactory('bb', {capacity: 2});
    aa.put('aa', 'test');
    aa.put('bb', 'test');
    aa.put('cc', 'test');
    var cacheFn = $cacheFactory.get('bb');
    console.log(cacheFn.get('aa'))
    console.log(cacheFn.get('bb'))
    console.log(cacheFn.get('cc'))

}]);

entry.config(['$httpProvider', function($httpProvider){

//    $httpProvider.defaults.headers.put['X-Postd-By'] = 'fdff';
//    $httpProvider.defaults.transformResponse = function(data){
//        console.log(data)
//        return data;
//    }
//    $httpProvider.defaults.transformRequest = function(data){
//        var arr = [];
//        for (var i in data) {
//            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
//        }
//        console.log(arr)
//        return arr.join('&');
//    }
//    console.log($httpProvider.defaults )

    $httpProvider.interceptors.push(['$q', '$rootScope', function($q, $rootScope){
        return {
            response: function(data) {
                return data;
            },
            responseError: function(response) {

                if (response.status === 401) {
                    $rootScope.$broadcast('show');
                }
                return $q.reject(response);

            }
        }
    }])
}])
entry.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',  function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/')
    $stateProvider.state('index',{
        url: '/',
        templateUrl: '/views/index.html',
        controller: 'IndexController',
        data: {
            authorizedRole: [333]
        }
    })
    .state('index.agentmanage', {
        url: '/agentmanage',
        templateUrl: '/views/usermanage/agentmanage.html',
        controller: 'AgentManageController'
    })
    .state('index.loginlog', {
        url: '/loginlog/:id',
        templateUrl: '/views/usermanage/loginlog.html',
        controller: 'LoginLogController'
    })
    .state('index.addagent', {
        url: '/addagent',
        templateUrl: '/views/usermanage/addagent.html',
        controller: 'AddagentController'
    })
    .state('index.agentdetail', {
            url: '/agentdetail/:id',
            templateUrl: '/views/usermanage/agentdetail.html',
            controller: 'AgentDetailController'
    })
    .state('index.agentcapital', {
        url: '/capital',
        template: 'capital'
        })
    .state('register', {
            url: '/register',
            templateUrl: '/views/entry/register.html'
     })
  //  $locationProvider.html5Mode(true)
}])

//entry.config(['$locationProvider', function($locationProvider){
//    $locationProvider.html5Mode(function(){
//        return true;
//    });
//    console.log($locationProvider)
//}])