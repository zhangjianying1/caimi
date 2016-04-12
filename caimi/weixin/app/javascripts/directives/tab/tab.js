import direcitveModule from '../directiveModule';
import tabpanel from './tabpane';

class Tab{
    constructor(){
        this.restrice = 'AE';
        this.transclude = true;
        this.replace = true;
        this.template = '<div class="tab"><ul><li ng-repeat="i in panels" ng-click="toggle(i)" ng-class="{active: i.select}">{{ i.title }}</li></ul><div ng-transclude></div></div>';


    }
    controller($scope){
        let panels = [];

        $scope.panels = panels;
        this.push = function(scope) {

            if (panels.length == 0) {
                scope.select = true
            }

            panels.push(scope);
        }
        $scope.toggle = function(scope) {

            angular.forEach(panels, function(scope){
                scope.select = false;
            })
            scope.select = true;
        }
    }
}

export default direcitveModule.directive('tab', () => new Tab());