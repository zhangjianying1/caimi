import direcitveModule from '../directiveModule';
import AjaxService from '../../services/ajaxService';
require('./verificationcode.css');
let ajaxServer = new WeakMap();
let timeout = new WeakMap();
let oA = function(){};

class VerificationCode{
    constructor(AjaxService, $timeout) {

        this.restrice = 'AE';
        this.transclude = true;
        this.templateUrl = './js/verificationcode.html';

        ajaxServer.set(oA, AjaxService)
        timeout.set(oA, $timeout)

    }
    link(scope, ele, attrs) {
        
        let $timeout = timeout.get(oA);
        let AjaxServer = ajaxServer.get(oA);

        scope.defaultData = scope.vm.defaults;
        scope.subFn = () => scope.vm.subFn(scope.tele, scope.verificationCode);
        
        scope.getCode = function (val) {

            if (scope.defaultData.disabled && !val) {
                scope.defaultData.btnText = '获取中...';
                scope.defaultData.disabled = false;
                AjaxServer.ajax('get', '/', {mobile: scope.tele}).then(function(data){
                    data = {};
                    data = {name: 'agent'};
                    if (data.name === 'agent') {
                        scope.defaultData.btnText = '10'
                        setIntervalTime();
                    }
                }, function(err){
                    alert(3)
                })

            }

        }

        function setIntervalTime() {
            $timeout(function () {
                scope.defaultData.btnText--;
                if (scope.defaultData.btnText > 0) {
                    setIntervalTime()
                } else {
                    scope.defaultData.btnText = '获取验证码';
                    scope.defaultData.disabled = true;
                    $timeout.cancel();
                }
            }, 1000)
        }
    }
}

//VerificationCode.$inject = ['AjaxService', '$timeout', '$parse']
export default direcitveModule.directive('verificationCode', (AjaxService, $timeout) => new VerificationCode(AjaxService, $timeout));