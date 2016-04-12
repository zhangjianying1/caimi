import direcitveModule from '../directiveModule';
class TabPane{
    constructor(){
        this.restrice = "AE";
        this.transclude = true;
        this.require = '^tab';
        this.scope = {
            title: '@title'
        }
        this.template = '<div class="tab-item" ng-transclude ng-class="{active: select}"></div>'
    }
    link(scope, ele, attrs, TabController) {
        TabController.push(scope);
        console.log(scope)
    }
}
export default direcitveModule.directive('tabpane', () => new TabPane());