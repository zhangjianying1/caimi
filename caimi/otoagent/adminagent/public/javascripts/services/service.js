angular.module('service', [])
.service('AjaxService', ['$http', '$q', function($http, $q){
    return {
        ajax: function(method, url, param) {
            var deferred = $q.defer();
            $http[method](url, param).success(function(data){
                deferred.resolve(data);
            }).error(function(reason){
                deferred.reject(reason)
            });
            return deferred.promise;
        }
    }
}])
.service('SessionService', ['$rootScope', function($rootScope){
    return {
        createSession: function(sessionId, userId, role) {
            this.sessionId = sessionId;
            this.userId = userId;
            this.role = role;
            $rootScope.user = userId;
        },
        distory: function(){
            this.sessionId = null;
            this.userId = null;
            this.role = null;
            $rootScope.user = '';
        }
    }
}])
    // 获取session （判断用户是否登录）
.service('AuthorizedService',  ['SessionService', 'AjaxService', function(SessionService, AjaxService){
    return {
        // 用户刷新页面的时候再次获取session
        isLogin: function () {
            AjaxService.ajax('get', '/adminController/session').then(function(data){
                if (data.code === '0000') {
                    if (data.result) {
                        SessionService.createSession(data.result.id, data.result.name, data.result.role);
                    }
                }
            })
        },
        isAuthorized: function(){
            return !!SessionService.userId;
        }

    }

}])
.service('LoginService', ['$rootScope', 'SessionService', 'AjaxService', function($rootScope, SessionService, AjaxService){
        return {
            loginOut: function(){
                AjaxService.ajax('get', '/adminController/loginout').then(function(data){
                    if (data.code === '0000') {
                        SessionService.distory();
                    }
                });
            },
            loginIn: function(){
                $rootScope.$broadcast('show');
            }
        }
    }])
/**
 *  更改代理商状态
 *  @params {Object} scope
 *  @params {String} 代理商sid
 */
.service('ChangeUserStautsService', ['$http', 'AjaxService', function($http, AjaxService){
        return {
            loadUserDetail: function(scope, param){
                AjaxService.ajax('get', '/adminController/agentdetail?id=' + param).then(function(data){
                    if (data.code === '0000') {
                        handleDate(data.result);
                    }
                })
                /**
                 * 设置修改状态的文字
                 * @param obj
                 */
                function handleDate(data) {
                    var temporaryObj = {};
                    scope.data = temporaryObj =  data;
                    if (temporaryObj.userstatus == '锁定') {
                        temporaryObj.changeText = '解锁'
                    } else if (temporaryObj.userstatus == '活动') {
                        temporaryObj.changeText = '锁定'
                    }
                }
            },
            changeTo: function(scope, param){
                if (scope.data.userstatus == '活动') {
                    AjaxService.ajax('get', '/adminController/changeuserstatus/lock/' + param).then(function(data){
                        if (data.code === '0000') {
                            scope.data.changeText = '解锁';
                            scope.data.userstatus = '锁定';
                        }
                    })
                } else if (scope.data.userstatus == '锁定'){
                    AjaxService.ajax('get', '/adminController/changeuserstatus/action/' + param).then(function(data){
                        if (data.code === '0000') {
                            scope.data.changeText = '锁定';
                            scope.data.userstatus = '活动';
                        }
                    })
                }
            }
        }
    }])