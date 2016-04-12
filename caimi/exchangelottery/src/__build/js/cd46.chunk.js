webpackJsonp([1],{

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Exchange = function (_React$Component) {
	    _inherits(Exchange, _React$Component);

	    function Exchange(props) {
	        _classCallCheck(this, Exchange);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Exchange).call(this, props));
	    }

	    _createClass(Exchange, [{
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "div",
	                { className: "exchange" },
	                _react2.default.createElement(
	                    "div",
	                    { className: "coupon-des" },
	                    _react2.default.createElement(
	                        "div",
	                        { className: "coupon" },
	                        _react2.default.createElement(
	                            "div",
	                            { className: "c-header" },
	                            "兑换码"
	                        ),
	                        _react2.default.createElement(
	                            "div",
	                            { className: "c-number" },
	                            "1234-1234-1234"
	                        ),
	                        _react2.default.createElement(
	                            "div",
	                            { className: "c-status c-red" },
	                            "兑换码无效"
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    "div",
	                    { className: "fixed-btns" },
	                    _react2.default.createElement(
	                        "a",
	                        { href: "", className: "btn btn-primary btn-primary-disabled" },
	                        "兑换"
	                    ),
	                    _react2.default.createElement(
	                        "a",
	                        { href: "", className: "btn btn-bor" },
	                        "取消"
	                    )
	                )
	            );
	        }
	    }]);

	    return Exchange;
	}(_react2.default.Component);

/***/ }

});