webpackJsonp([4],{

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(5), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(15), React = __webpack_require__(68); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _controllerModule = __webpack_require__(180);

	var _controllerModule2 = _interopRequireDefault(_controllerModule);

	var _ajaxApiService = __webpack_require__(183);

	var _ajaxApiService2 = _interopRequireDefault(_ajaxApiService);

	var _loginOut = __webpack_require__(199);

	var _loginOut2 = _interopRequireDefault(_loginOut);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * 个人信息 》完善资料
	                                                                                                                                                           */

	var PrefectArchivesController = function PrefectArchivesController(AjaxApiService, LoginOut) {
	    var _this = this;

	    _classCallCheck(this, PrefectArchivesController);

	    // 加载用户信息
	    console.log(LoginOut);
	    AjaxApiService.UserArchives().then(function (data) {
	        _this.account = data;
	    });
	    //        this.loginOut = function(){
	    //            //LoginOut.loginOut();
	    //        }
	};

	PrefectArchivesController.$inject = ['AjaxApiService', 'LoginOut'];
	exports.default = PrefectArchivesController;

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(177); if (makeExportsHot(module, __webpack_require__(68))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "PrefectArchivesController.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(5), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(15), React = __webpack_require__(68); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); // 退出登录

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _module = __webpack_require__(176);

	var _module2 = _interopRequireDefault(_module);

	var _ajaxService = __webpack_require__(184);

	var _ajaxService2 = _interopRequireDefault(_ajaxService);

	var _ajaxApiService = __webpack_require__(183);

	var _ajaxApiService2 = _interopRequireDefault(_ajaxApiService);

	var _userMsgService = __webpack_require__(185);

	var _userMsgService2 = _interopRequireDefault(_userMsgService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginOut = (function () {
	    function LoginOut(UserMsg, AjaxService) {
	        _classCallCheck(this, LoginOut);

	        this.AjaxService = AjaxService;
	        this.UserMsg = UserMsg;
	    }

	    _createClass(LoginOut, [{
	        key: 'loginOut',
	        value: function loginOut() {
	            var _this = this;

	            this.AjaxService.ajax('get', '/', { userCode: this.UserMsg.userMsg.userName }).then(function (data) {
	                _this.UserMsg.setUserMsg();
	                console.log(_this.UserMsg.userMsg);
	            });
	        }
	    }]);

	    return LoginOut;
	})();

	LoginOut.$inject = ['UserMsg', 'AjaxService'];
	exports.default = _module2.default.service('LoginOut', LoginOut);

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(177); if (makeExportsHot(module, __webpack_require__(68))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "loginOut.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }

});