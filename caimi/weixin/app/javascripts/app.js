import angular from 'angular';
import uiRouter from 'angular-ui-router';
import oclazyload from 'oclazyload';
import appService from './services/module';
import appController from './controllers/controllerModule';
import appDirective from './directives/directiveModule';
import appFilter from './filters/filterModule';

import ExchangelotteryController from './controllers/exchangelottery/ExchangelotteryController';

//import BindMobileController from './controllers/prefectarchives/BindMobileController';
//import BindRealNameController from './controllers/prefectarchives/BindRealNameController';
//import RealNameController from './controllers/prefectarchives/RealNameController';
//import AccountCenterController from './controllers/accountcenter/AccountCenterController';
import AjaxApiService from './services/ajaxApiService';
import LoadingService from './services/loadingService';

//, 'app.hintcontroller', 'app.service', 'app.hintservice', 'app.directive', 'app.filter'
var app = angular.module('myApp', [uiRouter, appController.name , oclazyload, appService.name, appDirective.name, appFilter.name]);

app.run(['$rootScope', 'LoadingService', function($rootScope, loadingService){
    $rootScope.$on('showloading', function(){
        loadingService.showLoading();
    })
    $rootScope.$on('hideloading', function(){
        loadingService.hideLoading();
    })
    $rootScope.$on('$routeChangeStart', function($evt, $next, $curr){

    });
    $rootScope.$on('$routeChangeSuccess', function($evt, $next){
        console.log($evt)
    });
}]);


app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', function($stateProvider, $urlRouterProvider, $controllerProvider){

  $urlRouterProvider.otherwise('/');
  $stateProvider
      .state('verfifcationlottery', {
          url: '/',
          templateUrl: './js/exchangelottery.html?vre',
          controller: 'ExchangelotteryController as vm',
          resolve: {
              loadHomeController: ($q, $ocLazyLoad) => {
                  return $q((resolve) => {
                      require.ensure([], () => {

                        let module = require('./controllers/exchangelottery/ExchangelotteryController');
                        require('./directives/verificationcode/verificationCode');
                        $ocLazyLoad.load({name: 'app.controller'});
                        $ocLazyLoad.load({name: 'app.service'});
                        resolve(module.default.controller);
                    });
                })

            }
        }
      })
      .state('entry', {
          url: '/entry',
          templateUrl: './js/index.html',
          controller: 'IndexController',
          controllerAs: 'vm',
          resolve: {
              loadController: function ($q) {
                  return $q(function(resolve){
                      require.ensure([], function(require){
                          require(['./controllers/index/IndexController'], function(o){
                              resolve(o.default);
                              $controllerProvider.register('IndexController', o.default);
                          });

                      });

                  })
              }
          }
      })
      .state('viewexchangedetail', {
          url: '/viewexchangedetail',
          templateUrl: './js/viewexchangedetail.html',
          controller: 'ViewExchangeDetailController',
          controllerAs: 'vm',
          resolve: {
              loadController: function ($q) {
                  return $q(function(resolve){
                      require.ensure([], function(require){
                          require(['./controllers/viewexchangedetail/ViewExchangeDetailController'], function(o){
                              resolve(o.default);
                              $controllerProvider.register('ViewExchangeDetailController', o.default);
                          });

                      });

                  })
              }
          }
      })
      .state('prefactarchives', {
          url: '/prefectarchives',
          templateUrl: './js/prefectarchives.html',
          controller: 'PrefectArchivesController',
          controllerAs: 'vm',
          resolve: {
              loadController: function ($q) {
                  return $q(function(resolve){
                      require.ensure([], function(require){
                          require(['./controllers/prefectarchives/PrefectArchivesController'], function(o){
                              resolve(o.default);
                              $controllerProvider.register('PrefectArchivesController', o.default);
                          });

                      });

                  })
              }
          }
      })
      .state('bindmobile', {
          url: '/bindmobile',
          templateUrl: './js/bindmobile.html',
          controller: 'BindMobileController',
          controllerAs: 'vm',
          resolve: {
              loadController: function ($q) {
                  return $q(function(resolve){
                      require.ensure([], function(require){
                          require(['./controllers/prefectarchives/BindMobileController'], function(o){
                              resolve(o.default);
                              $controllerProvider.register('BindMobileController', o.default);
                          });

                      });

                  })
              }
          }
      })
      .state('bindrealname', {
          url: '/bindrealname',
          templateUrl: './js/bindrealname.html',
          controller: 'BindRealNameController',
          controllerAs: 'vm',
          resolve: {
              loadController: function ($q) {
                  return $q(function(resolve){
                      require.ensure([], function(require){
                          require(['./controllers/prefectarchives/BindRealNameController'], function(o){
                              resolve(o.default);
                              $controllerProvider.register('BindRealNameController', o.default);
                          });

                      });

                  })
              }
          }
      })
      .state('realname', {
          url: '/realname',
          templateUrl: './js/realname.html',
          controller: 'RealNameController',
          controllerAs: 'vm',
          resolve: {
              loadController: function ($q) {
                  return $q(function(resolve){
                      require.ensure([], function(require){
                          require(['./controllers/prefectarchives/RealNameController'], function(o){
                              resolve(o.default);
                              $controllerProvider.register('RealNameController', o.default);
                          });

                      });

                  })
              }
          }
      })
      .state('accountcenter', {
          url: '/accountcenter',
          templateUrl: './js/accountcenter.html',
          controller: 'AccountCenterController',
          controllerAs: 'vm',
          resolve: {
              loadController: function ($q) {
                  return $q(function(resolve){
                      require.ensure([], function(require){
                          require(['./controllers/accountcenter/AccountCenterController'], function(o){
                              resolve(o.default);
                              $controllerProvider.register('AccountCenterController', o.default);
                          });

                      });

                  })
              }
          }
      })



}]);
