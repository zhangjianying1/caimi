webpackJsonp([8],{

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(5), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(15), React = __webpack_require__(68); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _controllerModule = __webpack_require__(180);

	var _controllerModule2 = _interopRequireDefault(_controllerModule);

	var _userMsgService = __webpack_require__(185);

	var _userMsgService2 = _interopRequireDefault(_userMsgService);

	var _ajaxApiService = __webpack_require__(183);

	var _ajaxApiService2 = _interopRequireDefault(_ajaxApiService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 个人中心
	 */

	var AccountCenterController = function AccountCenterController(UserMsg, AjaxApiService) {
	    var _this = this;

	    _classCallCheck(this, AccountCenterController);

	    this.user = UserMsg.userMsg.userName ? UserMsg.userMsg : AjaxApiService.UserArchives().then(function (data) {
	        _this.user = data;
	    });
	};

	AccountCenterController.$inject = ['UserMsg', 'AjaxApiService'];
	exports.default = AccountCenterController;

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(177); if (makeExportsHot(module, __webpack_require__(68))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "AccountCenterController.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }

});