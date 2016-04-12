webpackJsonp([6],{

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(5), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(15), React = __webpack_require__(68); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _controllerModule = __webpack_require__(180);

	var _controllerModule2 = _interopRequireDefault(_controllerModule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 个人信息 》实名信息绑定
	 */

	var BindRealNameController = (function () {
	    function BindRealNameController(AjaxApiService, HintService, $state) {
	        _classCallCheck(this, BindRealNameController);

	        this.AjaxApiService = AjaxApiService;
	        this.HintService = HintService;
	        this.$state = $state;
	    }

	    _createClass(BindRealNameController, [{
	        key: 'subBindRealName',
	        value: function subBindRealName(name, id) {
	            var _this = this;

	            this.AjaxApiService.BindRealName({ name: name, id: id }).then(function (data) {
	                if (data.code === '0000') {
	                    _this.HintService.hint({ title: '您的实名信息绑定成功', hintFn: function hintFn() {
	                            _this.$state.go('prefactarchives');
	                        } });
	                } else if (data.code === '2014') {}
	            });
	        }
	    }]);

	    return BindRealNameController;
	})();

	BindRealNameController.$inject = ['AjaxApiService', 'HintService', '$state'];
	exports.default = _controllerModule2.default.controller('BindRealNameController', BindRealNameController);

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(177); if (makeExportsHot(module, __webpack_require__(68))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "BindRealNameController.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }

});