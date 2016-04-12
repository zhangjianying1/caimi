angular.module('service', [])
.service('AjaxService', ['$http', '$q', function($http, $q){
        return {
            ajax: function(method, url, param){
                console.log(url)
                console.log(param)
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