var app = angular.module('myApp', ['ui.router', 'indexCtrl', 'ngAnimate', 'service']);
//app.animation('.fade-in', function(){
//    return {
//        enter: function(ele) {
//            ele.css('opacity',.3);
//        },
//        leave: function(ele){
//            ele.css('opacity',.6);
//        }
//    }
//})
app.run(['$rootScope', function($rootScope){
    $rootScope.$on('$routeChangeStart', function($evt, $next, $curr){

    });
    $rootScope.$on('$routeChangeSuccess', function($evt, $next){
        console.log($evt)
    });
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
      .state('index', {
          url: '/',
          templateUrl: '/views/index/index.html',
          controller: 'IndexCtrl'
      })
      .state('login', {
          url: '/login',
          templateUrl: '/views/entry/login.html',
          controller: 'LoginCtrl'
	  })
      .state('register', {
          url: '/register',
          templateUrl: '/views/entry/register.html',
          controller: 'RegisterCtrl'
      })
      .state('myusers', {
          url: '/myusers',
          templateUrl: '/views/myusers/users-index.html',
          controller: 'MyusersCtrl',
          resolve: {
              data: function(){
                  return 1;
              }
          }
      })
      .state('myusers.usersearch', {
          url: '/usersearch',
          templateUrl: '/views/myusers/include-search.html'
      })
      .state('myusers.sendmsg', {
          url: '/sendmsg',
          templateUrl: '/views/myusers/include-sendmsg.html'
      })
      .state('myusers.cluster', {
          url: '/cluser',
          templateUrl: '/views/myusers/include-cluster.html'
      })
      .state('userlist', {
          url: '/userlist/:id',
          templateUrl: '/views/myusers/users-list.html',
          controller: 'UserlistCtrl'
      })
      .state('userdetial', {
          url: '/userdetail/:id',
          templateUrl: '/views/myusers/user-detail.html',
          controller: 'UserdeatilCtrl'
      })
      .state('agentrecharge', {
          url: '/agentrecharge',
          templateUrl: '/views/agent-recharge/agent-recharge.html'
      })
      .state('account', {
          url: '/account',
          templateUrl: '/views/account/account-index.html?3'
      })
      .state('morefn', {
          url: '/morefn',
          templateUrl: '/views/morefn/morefn-index.html'
      })
}]);
