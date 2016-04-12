webpackJsonp([7],{

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(236);
	var reduce = __webpack_require__(237);

	/**
	 * Root reference for iframes.
	 */

	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  root = this;
	}

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return obj === Object(obj);
	}

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pushEncodedKeyValuePair(pairs, key, obj[key]);
	        }
	      }
	  return pairs.join('&');
	}

	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */

	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (Array.isArray(val)) {
	    return val.forEach(function(v) {
	      pushEncodedKeyValuePair(pairs, key, v);
	    });
	  }
	  pairs.push(encodeURIComponent(key)
	    + '=' + encodeURIComponent(val));
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */

	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }

	  var type = status / 100 | 0;

	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  Emitter.call(this);
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this._header = {};
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      return self.callback(err);
	    }

	    self.emit('response', res);

	    if (err) {
	      return self.callback(err, res);
	    }

	    if (res.status >= 200 && res.status < 300) {
	      return self.callback(err, res);
	    }

	    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	    new_err.original = err;
	    new_err.response = res;
	    new_err.status = res.status;

	    self.callback(new_err, res);
	  });
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Allow for extension
	 */

	Request.prototype.use = function(fn) {
	  fn(this);
	  return this;
	}

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.clearTimeout = function(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */

	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Get case-insensitive header `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 */

	Request.prototype.getHeader = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Force given parser
	 *
	 * Sets the body parser no matter type.
	 *
	 * @param {Function}
	 * @api public
	 */

	Request.prototype.parse = function(fn){
	  this._parser = fn;
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass){
	  var str = btoa(user + ':' + pass);
	  this.set('Authorization', 'Basic ' + str);
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.field = function(name, val){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(name, val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(field, file, filename);
	  return this;
	};

	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // querystring
	 *       request.get('/search')
	 *         .end(callback)
	 *
	 *       // multiple data "writes"
	 *       request.get('/search')
	 *         .send({ search: 'query' })
	 *         .send({ range: '1..5' })
	 *         .send({ order: 'desc' })
	 *         .end(callback)
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this.getHeader('Content-Type');

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this.getHeader('Content-Type');
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj || isHost(data)) return this;
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;

	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;

	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }

	    if (0 == status) {
	      if (self.timedout) return self.timeoutError();
	      if (self.aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }

	  // initiate request
	  xhr.open(this.method, this.url, true);

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var contentType = this.getHeader('Content-Type');
	    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  // send stuff
	  this.emit('request', this);

	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};

	/**
	 * Faux promise support
	 *
	 * @param {Function} fulfill
	 * @param {Function} reject
	 * @return {Request}
	 */

	Request.prototype.then = function (fulfill, reject) {
	  return this.end(function(err, res) {
	    err ? reject(err) : fulfill(res);
	  });
	}

	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }

	  return new Request(method, url);
	}

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	request.del = del;
	request.delete = del;

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * Expose `request`.
	 */

	module.exports = request;


/***/ },

/***/ 236:
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },

/***/ 237:
/***/ function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */

	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];

	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ },

/***/ 241:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(160);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _dom = __webpack_require__(246);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ScrollLoad = function (_React$Component) {
	    _inherits(ScrollLoad, _React$Component);

	    function ScrollLoad(props) {
	        _classCallCheck(this, ScrollLoad);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollLoad).call(this, props));

	        _this.state = {
	            loadText: '',
	            bBtn: true
	        };

	        return _this;
	    }

	    _createClass(ScrollLoad, [{
	        key: 'loadImg',
	        value: function loadImg() {
	            var imgs = document.querySelectorAll('.img'),
	                winH = document.documentElement.clientHeight;

	            var _loop = function _loop() {
	                var img = imgs[i];

	                if (img.getBoundingClientRect().top < winH) {
	                    (function () {
	                        var imgUrl = img.getAttribute('id');

	                        if (imgUrl) {
	                            var oImg = new Image();
	                            oImg.onload = function () {
	                                if (img.tagName.toLowerCase() == 'img') img.src = imgUrl;else img.style.backgroundImage = 'url(' + imgUrl + ')';
	                                oImg = null;
	                            };
	                            oImg.src = imgUrl;
	                            img.setAttribute('id', '');
	                        }
	                    })();
	                }
	            };

	            for (var i = 0; i < imgs.length; i++) {
	                _loop();
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            var oLoad = _reactDom2.default.findDOMNode(this.refs.load),
	                This = this,
	                winH = document.documentElement.clientHeight,
	                body = (0, _dom.getParentScroll)(oLoad);

	            body.onscroll = window.onscroll = null;
	            body.onscroll = window.onscroll = function () {

	                setTimeout(function () {
	                    This.loadImg();
	                    if (This.props.page != 'not') {
	                        var oLoadOffsetTop = oLoad.getBoundingClientRect().top;

	                        if (oLoadOffsetTop < winH) {
	                            This.state.loadText = '正在加载中...';
	                            This.props.loadFN();
	                        }
	                    }
	                }, 10);
	            };

	            setTimeout(function () {
	                This.loadImg();
	            }, 0);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {

	            var oLoad = _reactDom2.default.findDOMNode(this.refs.load),
	                body = (0, _dom.getParentScroll)(oLoad);

	            body.onscroll = window.onscroll = null;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { ref: 'load', className: 'scroll-loading' },
	                this.props.page != "not" ? this.state.loadText : this.props.tipsText
	            );
	        }
	    }]);

	    return ScrollLoad;
	}(_react2.default.Component);

	ScrollLoad.propTypes = {
	    loadFN: _react2.default.PropTypes.func,
	    tipsText: _react2.default.PropTypes.string
	};
	exports.default = ScrollLoad;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ScrollLoad.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 找到带有滚动条的父元素
	 * @param obj {Object} 当前元素
	 * @returns {Object} 返回的父元素没有的话就返回当前元素
	 */
	var getParentScroll = exports.getParentScroll = function getParentScroll(obj) {

	    while (obj = obj.parentNode) {

	        if (obj.className == 'body') {
	            return obj;
	        }
	    }
	    obj = {
	        scrollTop: 0
	    };
	    return obj;
	};

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "dom.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(160);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _dom = __webpack_require__(246);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//require('./dorpdown.css');

	var DorpDown = function (_React$Component) {
	    _inherits(DorpDown, _React$Component);

	    function DorpDown(porps) {
	        _classCallCheck(this, DorpDown);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DorpDown).call(this, porps));

	        _this.state = {
	            loading: '',
	            elemStyle: {},
	            loadStyle: {},
	            test: ''
	        };
	        return _this;
	    }

	    _createClass(DorpDown, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            var elem = _reactDom2.default.findDOMNode(this),
	                upStatus = _reactDom2.default.findDOMNode(this.refs.upStatus),

	            //            downStatus = ReactDOM.findDOMNode(this.refs.downStatus),
	            options = {
	                scrollY: 0,
	                scrollX: 0,
	                loadH: 68,
	                isScrollingUp: false,
	                isScrollingDown: false
	            },
	                moveH = 0,
	                reset = function reset(elem) {

	                setTimeout(function () {
	                    elem.style.WebkitTransitionDuration = '300ms';
	                    elem.style.transitionDuration = '300ms';
	                    elem.style.WebkitTransform = 'translate3d(0, 0px, 0)';
	                    elem.style.transform = 'translate3d(0, 0px, 0)';
	                    moveH = 0;
	                    this.setState({
	                        loading: ''
	                    });
	                    elem.removeEventListener('touchmove', defaults, false);
	                }.bind(_this2), 300);
	            },
	                transShow = function transShow(moveH) {

	                // 大于加载移动的数值
	                if (Math.abs(moveH) > 68) {
	                    // 下拉
	                    if (moveH > 0) {
	                        upStatus.style.WebkitTransform = 'rotate(0deg)';
	                        upStatus.style.transform = 'rotate(0deg)';
	                    } else {
	                        // 上拉
	                        // downStatus.style.WebkitTransform = 'rotate(180deg)';

	                    }
	                } else {
	                        // 下拉
	                        if (moveH > 0) {

	                            upStatus.style.WebkitTransform = 'rotate(180deg)';
	                            upStatus.style.transform = 'rotate(180deg)';
	                        } else {
	                            // 上拉
	                            //downStatus.style.WebkitTransform = 'rotate(0deg)';
	                        }
	                    }
	            },
	                release = function release(elem) {
	                elem.style.WebkitTransitionDuration = '300ms';
	                elem.style.transitionDuration = '300ms';

	                if (Math.abs(moveH) > 68) {
	                    // 下拉
	                    if (moveH > 0) {
	                        elem.style.WebkitTransform = 'translate3d(0, 68px, 0)';
	                        elem.style.transform = 'translate3d(0, 68px, 0)';
	                        _this2.props.callback(elem, reset);
	                    } else {
	                        //                        elem.style.WebkitTransform = 'translate3d(0, -68px, 0)';
	                        //
	                        //                        this.props.callback(1);
	                    }

	                    elem.addEventListener('touchmove', defaults, false);

	                    _this2.setState({
	                        loading: 'loading'
	                    });
	                } else {
	                    reset(elem);
	                }
	            };

	            function defaults(event) {
	                event.preventDefault();
	                event.stopPropagation();
	            }

	            //　如果下拉刷新有父元素是带滚动条的以父元素为滚动基准
	            var body = (0, _dom.getParentScroll)(elem);
	            elem.style.minHeight = document.documentElement.clientHeight - 50 + 'px';

	            elem.addEventListener('touchstart', function (e) {

	                // 如果body  scrollTop 大于 0 就不执行下拉加载

	                if (document.body.scrollTop <= 1 && body.scrollTop <= 1) {
	                    options.isScrollingDown = true;
	                    options.scrollY = e.targetTouches[0].pageY;
	                    options.scrollX = e.targetTouches[0].pageX;
	                }

	                //            if ((document.body.scrollHeight - document.body.scrollTop) - document.documentElement.clientHeight == 0){
	                //                options.isScrollingUp = true;
	                //                options.scrollY = e.touches[0].pageY;
	                //            }
	                return true;
	            }, false);

	            elem.addEventListener('touchmove', function (e) {

	                if (e.targetTouches.length > 0 && options.isScrollingDown) {
	                    elem.style.WebkitTransitionDuration = '0ms';
	                    var touch = e.targetTouches[0];
	                    moveH = touch.pageY - options.scrollY;

	                    // 左右滑动距离大于上下滑动距离
	                    if (Math.abs(touch.pageX - options.scrollX) > moveH) {
	                        options.isScrollingDown = false;
	                        return;
	                    }

	                    if (moveH > 0) {

	                        moveH = moveH > 80 ? moveH / (1 + moveH / (document.documentElement.clientHeight / .8)) : moveH;
	                        moveTo(e);
	                    }
	                    //                if (options.isScrollingUp && moveH < 0) {
	                    //
	                    //                    moveH = moveH < -80 ? moveH / (1 + -moveH / (document.documentElement.clientHeight /.8) ) : moveH;
	                    //                    moveTo(e);
	                    //                }
	                }
	                function moveTo(e) {
	                    transShow(moveH);
	                    elem.style.WebkitTransform = 'translate3d(0,' + moveH + 'px, 0)';

	                    elem.style.transform = 'translate3d(0,' + moveH + 'px, 0)';
	                    e.preventDefault();
	                }
	            }, false);
	            elem.addEventListener('touchend', function () {

	                if (Math.abs(moveH) > 0 && options.isScrollingDown) {
	                    release(this);
	                }
	                options.isScrollingDown = false;
	                //            options.isScrollingUp = false;
	                return true;
	            });

	            /*
	             * 解决fixed在transform定位的问题
	            */
	            function transitionEnd() {
	                if (moveH == 0) {
	                    elem.style.WebkitTransform = null;
	                    elem.style.transform = null;
	                }
	            }
	            elem.addEventListener('webkitTransitionEnd', transitionEnd, false);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'dorp-down' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'up-load' },
	                    _react2.default.createElement('span', { ref: 'upStatus', className: this.state.loading })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: '', ref: 'main' },
	                    this.props.children
	                )
	            );
	        }
	    }]);

	    return DorpDown;
	}(_react2.default.Component);

	DorpDown.propTypes = {
	    callback: _react2.default.PropTypes.func
	};
	exports.default = DorpDown;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Dorpdown.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_React$Component) {
	    _inherits(Header, _React$Component);

	    function Header() {
	        _classCallCheck(this, Header);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	    }

	    _createClass(Header, [{
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "header",
	                { id: "header", style: this.props.style },
	                _react2.default.createElement("a", { href: "javascript: history.back()", className: "go-back" }),
	                _react2.default.createElement(
	                    "h1",
	                    null,
	                    this.props.title
	                ),
	                this.props.children
	            );
	        }
	    }]);

	    return Header;
	}(_react2.default.Component);

	Header.propType = {
	    title: _react2.default.PropTypes.string
	};
	exports.default = Header;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Header.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var fullZero = exports.fullZero = function fullZero(str) {
	    str = '' + str;

	    if (str.length < 2) {
	        return '0' + str;
	    }
	    return str;
	};
	var setDate = exports.setDate = function setDate(strTime, beforeTime) {
	    var oDate = new Date();

	    var oParseDate = new Date();
	    if (typeof strTime == 'string') {
	        oParseDate.setFullYear(strTime.substring(0, 4));
	        oParseDate.setMonth(strTime.substring(5, 7) - 1);
	        oParseDate.setDate(strTime.substring(8, 10));
	        oParseDate.setHours(strTime.substring(11, 13));
	        oParseDate.setMinutes(strTime.substring(14, 16));
	    }
	    var toDay = oDate.getDate();
	    var oParseDay = oParseDate.getDate();
	    var result = oParseDate.getHours() + ':' + fullZero(oParseDate.getSeconds());

	    // 今天和昨天
	    if (toDay == oParseDay) {

	        // 小于一小时
	        if (beforeTime && oDate.getHours() == oParseDate.getHours()) {
	            result = oDate.getMinutes() - oParseDate.getMinutes();

	            if (result < 5) return '刚刚 ';else if (result < 60) return result + '分钟前';
	        }
	        return '今天 ' + result;
	    } else if (toDay - oParseDay == 1) {
	        return '昨天 ' + result;
	    } else {

	        return strTime;
	    }
	};

	var getArrDate = exports.getArrDate = function getArrDate(str) {

	    var oDate = new Date();
	    if (typeof str == 'string') {
	        oDate.setFullYear(str.substring(0, 4));
	        oDate.setMonth(str.substring(5, 7) - 1);
	        oDate.setDate(str.substring(8, 10));
	        oDate.setHours(str.substring(11, 13));
	        oDate.setMinutes(str.substring(14, 16));
	    }

	    return [oDate.getMonth() + 1, oDate.getDay()];
	};

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "date.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var isEmptyObject = exports.isEmptyObject = function isEmptyObject(obj) {
	    for (var i in obj) {
	        return false;
	    }
	    return true;
	};
	var setToFixed = exports.setToFixed = function setToFixed(number) {

	    if (number == undefined) return;

	    var result = '' + number,
	        re = /(^[0-9]*$|^[0-9]*\.[0-9]{1,2})/;

	    result = re.exec(result);
	    return result && result[0];
	};

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "object.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TopSlider = exports.Slider = undefined;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(160);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _object = __webpack_require__(263);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(271);
	__webpack_require__(273);

	var Slider = exports.Slider = function (_React$Component) {
	    _inherits(Slider, _React$Component);

	    function Slider(props) {
	        _classCallCheck(this, Slider);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

	        _this.state = {
	            autoPlay: _this.props.autoPlay,
	            loop: _this.props.loop,
	            index: 0,
	            oUlStyle: {},
	            oLiStyle: {}
	        };
	        return _this;
	    }

	    _createClass(Slider, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate() {
	            if (arguments[0].data.length == 0) return false;else return true;
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var _this2 = this;

	            if (nextProps.data.length == 0) return;
	            var ele = _reactDom2.default.findDOMNode(this),
	                defaultSpeed = 300,
	                oUl = _reactDom2.default.findDOMNode(this.refs.oUl),
	                slidesLength = nextProps.data.length,
	                width = 0,
	                deltaX = void 0,
	                deltaY = void 0,
	                start = {},
	                isScrolling = true,
	                index = nextProps.index || this.state.index;

	            // 初始化设置元素样式
	            width = 'getBoundingClientRect' in ele ? ele.getBoundingClientRect().width : ele.offsetWidth;

	            this.setState({
	                oUlStyle: {
	                    width: width * slidesLength + 'px'
	                },
	                oLiStyle: {
	                    width: width + 'px'
	                }
	            });

	            var move = function move(index, speed) {
	                if (speed == undefined) {
	                    speed = defaultSpeed;
	                }

	                oUl.style.webkitTransitionDuration = speed + 'ms';
	                oUl.style.webkitTransform = 'translate3d(' + -index * width + 'px, 0,0)';
	                _this2.setState({
	                    index: index || 0
	                });
	            };

	            // 定位到index图片的位置
	            move(nextProps.index, 0);

	            var touchS = function touchS(event) {

	                start = {
	                    pageX: event.touches ? event.touches[0].pageX : event.clientX,
	                    pageY: event.touches ? event.touches[0].pageY : event.clientY,
	                    time: Number(new Date())
	                };
	                // 滑动的距离
	                deltaX = 0;
	                // 滑动开始时 动画时间为0
	                oUl.style.webkitTransitionDuration = 0 + 'ms';
	            };
	            var touchM = function touchM(event) {

	                if (event.touches.length > 1) return;
	                deltaX = event.touches[0].pageX - start.pageX;

	                if (Math.abs(deltaX) < Math.abs(start.pageY - event.touches[0].pageY)) return;

	                // 如果第一张图片并且还向右边滑动则除数变大
	                var divisor = !index && deltaX > 0 || index == slidesLength - 1 && deltaX < 0 ? Math.abs(deltaX) / width + 1 : 1;

	                deltaX = deltaX / divisor;

	                oUl.style.webkitTransform = 'translate3d(' + (deltaX - width * index) + 'px, 0, 0)';
	                event.preventDefault();
	            };
	            var touchE = function touchE(event) {
	                // 如果滑动时间小于 250毫秒 并且滑动距离大于 20px 或者 滑动距离大于banner的一半
	                if (Number(new Date()) - start.time < 250 && Math.abs(deltaX) > 20 || Math.abs(deltaX) > width / 2) {

	                    isScrolling = index == 0 && deltaX > 0 || index == slidesLength - 1 && deltaX < 0;
	                    //                console.log(index == 0 && deltaX > 0)

	                    // 不能滑动的时候
	                    if (!isScrolling) {

	                        if (deltaX < 0) {
	                            index++;
	                        } else {
	                            index--;
	                        }
	                    }
	                }

	                move(index);
	            };
	            ele.removeEventListener('touchstrt', touchS, false);
	            ele.removeEventListener('touchmove', touchM, false);
	            ele.removeEventListener('touchend', touchE, false);
	            ele.addEventListener('touchstart', touchS, false);
	            ele.addEventListener('touchmove', touchM, false);
	            ele.addEventListener('touchend', touchE, false);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            return _react2.default.createElement(
	                'div',
	                { className: 'silder-img' },
	                _react2.default.createElement(
	                    'ul',
	                    { ref: 'oUl', style: this.state.oUlStyle },
	                    this.props.data.map(function (val, index) {
	                        return _react2.default.createElement(
	                            'li',
	                            { key: index, style: _this3.state.oLiStyle },
	                            _react2.default.createElement('img', { src: val })
	                        );
	                    })
	                ),
	                _react2.default.createElement(
	                    'ol',
	                    null,
	                    this.props.data.map(function (val, index) {
	                        return _react2.default.createElement('li', { className: index == _this3.state.index ? 'active' : '', key: index });
	                    })
	                )
	            );
	        }
	    }]);

	    return Slider;
	}(_react2.default.Component);

	Slider.propTypes = {
	    data: _react2.default.PropTypes.array.isRequired
	};

	var TopSlider = exports.TopSlider = function (_React$Component2) {
	    _inherits(TopSlider, _React$Component2);

	    function TopSlider() {
	        _classCallCheck(this, TopSlider);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(TopSlider).apply(this, arguments));
	    }

	    _createClass(TopSlider, [{
	        key: 'default',

	        //    constructor(props){
	        //        super(props);
	        //        this.state = {
	        //            autoPlay: this.props.autoPlay,
	        //            loop: this.props.loop,
	        //            index: 0,
	        //            oUlStyle: {},
	        //            oLiStyle: {}
	        //        }
	        //    }
	        //
	        value: function _default(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {

	            // 阻止body滚动事件
	            if (nextProps.style.display == 'block') {
	                document.addEventListener('touchmove', this.default, false);
	            } else {
	                document.removeEventListener('touchmove', this.default, false);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'top-silder', style: this.props.style, onClick: this.props.onClick },
	                this.props.children
	            );
	        }
	    }]);

	    return TopSlider;
	}(_react2.default.Component);

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Slider.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(272);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(242)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./topslider.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./topslider.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(241)();
	// imports


	// module
	exports.push([module.id, ".top-silder {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 999;\n  background: #000;\n  overflow: hidden; }\n  .top-silder .silder-img {\n    position: absolute;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%); }\n    .top-silder .silder-img li {\n      position: relative; }\n    .top-silder .silder-img img {\n      position: absolute;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n      transform: translateY(-50%); }\n", ""]);

	// exports


/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(274);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(242)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./slider.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./slider.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(241)();
	// imports


	// module
	exports.push([module.id, ".silder-img {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden; }\n  .silder-img ul {\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    transition-name: all; }\n    .silder-img ul li {\n      height: 100%;\n      float: left;\n      overflow: hidden; }\n      .silder-img ul li img {\n        width: 100%; }\n  .silder-img ol {\n    width: 100%;\n    position: absolute;\n    bottom: .04rem;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    z-index: 2; }\n    .silder-img ol li {\n      width: 10px;\n      height: 10px;\n      border-radius: 10px;\n      margin-left: .1rem;\n      background: #878787; }\n  .silder-img .active {\n    background: #d91e39; }\n", ""]);

	// exports


/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Prompt = function (_React$Component) {
	    _inherits(Prompt, _React$Component);

	    function Prompt() {
	        _classCallCheck(this, Prompt);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Prompt).apply(this, arguments));
	    }

	    _createClass(Prompt, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var _this2 = this;

	            if (nextProps.prompt == true) {
	                setTimeout(function () {
	                    if (_this2.props.hide) {
	                        _this2.props.hide('prompt');
	                    }
	                }, 500);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            return _react2.default.createElement(
	                'div',
	                { style: { display: this.props.prompt ? 'block' : 'none' } },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'view-error', style: {
	                            padding: '.1rem',
	                            position: 'fixed', 'zIndex': 99,
	                            background: '#d8d8d8', 'fontSize': '.14rem',
	                            'lineHeight': '.3rem',
	                            left: '50%',
	                            top: '50%',
	                            borderRadius: '.01rem',
	                            color: '#fff',
	                            'WebkitTransform': 'translate(-50%, -50%)',
	                            transform: 'translate(-50%, -50%)',
	                            'whiteSpace': 'nowrap'
	                        } },
	                    this.props.msg
	                )
	            );
	        }
	    }]);

	    return Prompt;
	}(_react2.default.Component);

	exports.default = Prompt;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Prompt.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 318:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(160);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(161);

	var _reactRedux = __webpack_require__(219);

	var _action = __webpack_require__(232);

	var _superagent = __webpack_require__(235);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _date = __webpack_require__(261);

	var _Header = __webpack_require__(260);

	var _Header2 = _interopRequireDefault(_Header);

	var _Dorpdown = __webpack_require__(249);

	var _Dorpdown2 = _interopRequireDefault(_Dorpdown);

	var _Comment = __webpack_require__(319);

	var _Comment2 = _interopRequireDefault(_Comment);

	var _Prompt = __webpack_require__(297);

	var _Prompt2 = _interopRequireDefault(_Prompt);

	var _SldTemp = __webpack_require__(323);

	var _SldTemp2 = _interopRequireDefault(_SldTemp);

	var _Slider = __webpack_require__(270);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var bBtn = true;

	__webpack_require__(324);

	var ShareLotteryList = function (_React$Component) {
	    _inherits(ShareLotteryList, _React$Component);

	    function ShareLotteryList(props) {
	        _classCallCheck(this, ShareLotteryList);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShareLotteryList).call(this, props));

	        _this.state = {
	            slideData: [],
	            sliderStyle: { display: 'none' },
	            index: 0,
	            shareLotteryDetailList: [], // 中奖信息
	            lotteryId: 0,
	            placeholder: '说点儿什么吧',
	            sendData: {},
	            commentData: [],
	            sendNotice: false,
	            prompt: false,
	            bodyStyle: {
	                overflowY: 'scroll',
	                position: 'absolute',
	                bottom: '.45rem'
	            },
	            fixedbottomStyle: {
	                position: 'absolute'
	            },
	            headerStyle: {
	                position: 'absolute'
	            }
	        };
	        return _this;
	    }

	    _createClass(ShareLotteryList, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            var _this2 = this;

	            var _props = this.props;
	            var dispatch = _props.dispatch;
	            var sharelotteryData = _props.sharelotteryData;

	            // 读取 store 的信息

	            sharelotteryData && sharelotteryData.map(function (val) {
	                if (val.shareId == _this2.props.params.lotteryId) {
	                    _this2.setState({
	                        shareLotteryDetailList: [val]

	                    });
	                }
	            });

	            this.loadFN();
	        }
	    }, {
	        key: 'default',
	        value: function _default(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var body = _reactDom2.default.findDOMNode(this.refs.body),
	                header = _reactDom2.default.findDOMNode(this.refs.header),
	                fixedbottom = _reactDom2.default.findDOMNode(this.refs.fixedbottom);
	            document.body.style.overflow = 'hidden';
	            document.documentElement.style.overflow = 'hidden';
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            document.body.style.overflow = 'auto';
	            document.documentElement.style.overflow = 'auto';
	        }
	    }, {
	        key: 'loadFN',
	        value: function loadFN(elem, reset) {
	            var _this3 = this;

	            var dispatch = this.props.dispatch;
	            //

	            if (bBtn) {
	                bBtn = false;
	                // 显示加载
	                dispatch((0, _action.loading)(true));

	                // 下拉刷新
	                if (elem != null) {
	                    // this.state 这种方式可以不触发子组件componentWillReceiveProps方法
	                    this.state.placeholder = '说点儿什么吧';
	                    this.setState({
	                        sendNotice: true
	                    });
	                }
	                _superagent2.default.get('#/glodController/sharelotterydetail').set('Accept', 'application/json').query({ lotteryId: this.props.params.lotteryId, issue: this.props.params.issue, shareId: this.props.params.shareId }).then(function (res) {
	                    // 有返回信息
	                    res = {
	                        ok: true,
	                        body: {
	                            code: '0000',
	                            result: {
	                                arrayList: [{
	                                    shareId: '1',
	                                    lotteryName: 'iphone6s 64G',
	                                    userPhoto: './images/2.png',
	                                    userName: '134***449',
	                                    shareMsg: '中奖真不易，终于中了iphone6s 34G',
	                                    shareImg: ['./images/1.png', './images/2.png'],
	                                    shareTime: '2016-01-21 11:11:11',
	                                    partakeCount: '10',
	                                    allPartakeCount: '8000',
	                                    luckyNumber: 10000234,
	                                    commentCount: 2,
	                                    praiseCount: 3
	                                }]
	                            },
	                            msg: '中奖信息'
	                        }
	                    };

	                    if (res.ok) {
	                        var body = res.body;

	                        if (body.code === '0000') {

	                            if (elem != null) {
	                                reset(elem);
	                                body.result.arrayList[0].shareImg.unshift('./images/3.png');
	                            }

	                            _this3.setState({
	                                shareLotteryDetailList: body.result.arrayList,
	                                sendNotice: false
	                            });

	                            // 打开开关变量
	                            bBtn = true;
	                            dispatch((0, _action.loading)(false));
	                        }
	                    }
	                });
	            }
	        }
	        // 点击图片放大

	    }, {
	        key: 'clickImg',
	        value: function clickImg(e, shareId, index) {
	            e.preventDefault();
	            e.stopPropagation();
	            var slideData = [];
	            this.state.shareLotteryDetailList.map(function (val) {
	                // 找到imges

	                if (val.shareId == shareId) {
	                    slideData = val.shareImg;
	                }
	            });

	            // 延迟一下显示图片
	            setTimeout(function () {
	                this.setState({
	                    slideData: slideData,
	                    sliderStyle: {
	                        display: 'block'
	                    },
	                    index: index
	                });
	            }.bind(this), 100);
	        }
	    }, {
	        key: 'hideSlider',
	        value: function hideSlider() {
	            this.setState({
	                sliderStyle: {
	                    display: 'none'
	                }
	            });
	        }
	        //点赞

	    }, {
	        key: 'clickPraise',
	        value: function clickPraise(e, shareId) {
	            var _this4 = this;

	            e.preventDefault();
	            e.stopPropagation();
	            var data = this.state.shareLotteryDetailList;

	            _superagent2.default.get('#/glodController/praise').set('Accept', 'application/json').query({ lotteryId: this.props.params.lotteryId, issue: this.props.params.issue, shareId: shareId }).then(function (res) {
	                // praise 0 => 取消赞 1 =》点击成功
	                res = {
	                    ok: true,
	                    body: {
	                        code: '0000',
	                        result: {
	                            praise: '1'
	                        },
	                        msg: 'ok'
	                    }
	                };

	                if (res.ok) {
	                    (function () {
	                        var body = res.body;

	                        if (body.code === '0000') {

	                            data.map(function (val) {
	                                if (val.shareId == shareId) {

	                                    if (body.result.praise == 0) {
	                                        val.praiseCount--;
	                                        val.style = {
	                                            WebkitTransform: 'scale(1)',
	                                            transform: 'scale(1)'
	                                        };
	                                    } else {
	                                        val.praiseCount++;
	                                        val.style = {
	                                            WebkitTransform: 'scale(1.2)',
	                                            transform: 'scale(1.2)'
	                                        };
	                                    }
	                                }
	                            });

	                            _this4.setState({
	                                shareLotteryDetailList: data,
	                                sendNotice: false });
	                        }
	                    })();
	                }
	            });
	        }
	    }, {
	        key: 'replyHandle',
	        // 阻止子组件的更新
	        value: function replyHandle(comment) {
	            this.setState({
	                placeholder: '回复' + comment.userName,
	                sendData: {
	                    replyUser: comment.userCode, // 要回复人的uerCode
	                    commentMsg: comment.commentMsg },
	                // 要回复人发表的内容
	                commentData: [], // 清空上一次评论
	                sendNotice: false });
	            // 阻止子组件的更新

	            var textarea = _reactDom2.default.findDOMNode(this.refs.textarea);
	            textarea.focus();
	        }
	    }, {
	        key: 'clickComment',
	        value: function clickComment(e, shareId) {

	            this.setState({
	                placeholder: '说点儿什么吧',
	                sendNotice: false, // 阻止子组件的更新
	                sendData: {}

	            });
	            var textarea = _reactDom2.default.findDOMNode(this.refs.textarea);
	            textarea.focus();
	        }
	    }, {
	        key: 'releaseHandle',
	        value: function releaseHandle(e) {
	            var _this5 = this;

	            e.stopPropagation();
	            e.preventDefault();
	            var textarea = _reactDom2.default.findDOMNode(this.refs.textarea),
	                sendValue = textarea.value;
	            /**
	             * 回复和评论一个接口，（回复只带有要回复人的id和回复人的发表内容）
	             * @type {{ok: boolean, body: {code: string, result: {praise: string}, msg: string}}}
	             */

	            if (sendValue) {

	                _superagent2.default.get('#/glodController/releasecomment').set('Accept', 'application/json').query({ lotteryId: this.props.params.lotteryId, issue: this.props.params.issue, shareId: this.props.params.shareId, msg: textarea.value }).query(this.state.sendData).then(function (res) {
	                    res = {
	                        ok: true,
	                        body: {
	                            code: '0000',
	                            result: {
	                                arrayList: [{
	                                    commentId: '3',
	                                    userCode: '123456',
	                                    userPhoto: './images/2.png',
	                                    userName: '134***449',
	                                    replyUser: '134***449',
	                                    replyMsg: '中奖了吗？',
	                                    commentMsg: '中奖真不易，终于中了iphone6s 34G',
	                                    commentTime: '2016-01-21 11:11:11'
	                                }]
	                            },
	                            msg: 'ok'
	                        }
	                    };

	                    if (res.ok) {
	                        var body = res.body;

	                        if (body.code === '0000') {
	                            _this5.setState({
	                                placeholder: '说的儿什么吧',
	                                prompt: true,
	                                sendData: {},
	                                commentData: body.result.arrayList
	                            });
	                            textarea.value = '';
	                        }
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.setState({
	                prompt: false,
	                commentData: []
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this6 = this;

	            var shareLotteryDetailList = this.state.shareLotteryDetailList;

	            return _react2.default.createElement(
	                'div',
	                { className: 'share-lottery-detail-cont' },
	                _react2.default.createElement(_Header2.default, { title: '中奖晒单', style: this.state.headerStyle }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'body', style: this.state.bodyStyle },
	                    _react2.default.createElement(
	                        _Dorpdown2.default,
	                        { callback: function callback(elem, reset) {
	                                return _this6.loadFN(elem, reset);
	                            } },
	                        _react2.default.createElement(_SldTemp2.default, {
	                            clickComment: function clickComment(e, shareId) {
	                                return _this6.clickComment(e, shareId);
	                            },
	                            clickPraise: function clickPraise(e, shareId) {
	                                return _this6.clickPraise(e, shareId);
	                            },
	                            clickImg: function clickImg(e, shareId, index) {
	                                return _this6.clickImg(e, shareId, index);
	                            },
	                            shareLotteryDetailList: this.state.shareLotteryDetailList
	                        }),
	                        _react2.default.createElement(_Comment2.default, {
	                            lotteryId: this.props.params.lotteryId,
	                            issue: this.props.params.issue,
	                            shareId: this.props.params.shareId,
	                            replyHandle: function replyHandle(comment) {
	                                return _this6.replyHandle(comment);
	                            },
	                            userName: shareLotteryDetailList[0] && shareLotteryDetailList[0].userName,
	                            sendNotice: this.state.sendNotice, commentData: this.state.commentData
	                        })
	                    )
	                ),
	                _react2.default.createElement(
	                    'form',
	                    { onSubmit: function onSubmit(e) {
	                            return _this6.releaseHandle(e);
	                        } },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'fixed-bottom', style: this.state.fixedbottomStyle },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'relsease-box' },
	                            _react2.default.createElement('textarea', { ref: 'textarea', placeholder: this.state.placeholder, name: 'send-text' }),
	                            _react2.default.createElement(
	                                'button',
	                                { type: 'submit' },
	                                '发送'
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    _Slider.TopSlider,
	                    { style: this.state.sliderStyle, onClick: function onClick() {
	                            return _this6.hideSlider();
	                        } },
	                    _react2.default.createElement(_Slider.Slider, { data: this.state.slideData, index: this.state.index })
	                ),
	                _react2.default.createElement(_Prompt2.default, { msg: '表发成功', prompt: this.state.prompt, hide: function hide(arg) {
	                        return _this6.hide(arg);
	                    } })
	            );
	        }
	    }]);

	    return ShareLotteryList;
	}(_react2.default.Component);

	var init = function init(store) {
	    return {
	        sharelotteryData: store.sharelottery
	    };
	};
	exports.default = (0, _reactRedux.connect)(init)(ShareLotteryList);

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ShareLotteryDetail.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(219);

	var _action = __webpack_require__(232);

	var _superagent = __webpack_require__(235);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _CmTemp = __webpack_require__(320);

	var _CmTemp2 = _interopRequireDefault(_CmTemp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var bBtn = true;

	__webpack_require__(321);

	var Commont = function (_React$Component) {
	    _inherits(Commont, _React$Component);

	    function Commont(props) {
	        _classCallCheck(this, Commont);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Commont).call(this, props));

	        _this.state = {
	            commentList: [],
	            page: 0
	        };
	        return _this;
	    }

	    //    shouldComponentUpdate(nextProps, nextState) {
	    //
	    //        if (nextProps.lotteryId) {
	    //            return true;
	    //        } else {
	    //            return false;
	    //
	    //        }
	    //    }

	    _createClass(Commont, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            console.log(nextProps);
	            if (nextProps.sendNotice) {
	                this.state.page = 0;
	                this.loadFN();
	            }
	            console.log(nextProps.commentData.length);
	            if (nextProps.commentData.length) {
	                this.setState({
	                    commentList: this.state.commentList.concat(nextProps.commentData)
	                });
	            }
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.loadFN();
	        }
	    }, {
	        key: 'loadFN',
	        value: function loadFN(arg) {
	            var _this2 = this;

	            var _props = this.props;
	            var dispatch = _props.dispatch;
	            var commentData = _props.commentData;
	            //

	            if (bBtn) {
	                bBtn = false;
	                // 显示加载
	                dispatch((0, _action.loading)(true));
	                this.state.page++;

	                _superagent2.default.get('#/glodController/sharelotterycommont').set('Accept', 'application/json').query({ lotteryId: this.props.lotteryId, issue: this.props.issue, shareId: this.props.shareId, page: this.state.page }).then(function (res) {

	                    // 有返回信息
	                    res = {
	                        ok: true,
	                        body: {
	                            code: '0000',
	                            result: {
	                                arrayList: [{
	                                    commentId: '3',
	                                    userCode: '123456',
	                                    userPhoto: './images/2.png',
	                                    userName: '134***432',
	                                    commentMsg: '中奖真不易，终于中了iphone6s 34G',
	                                    commentTime: '2016-01-25 14:25:11',
	                                    replyList: ''
	                                }, {
	                                    commentId: '3',
	                                    userCode: '123456',
	                                    userPhoto: './images/2.png',
	                                    userName: '134***456',
	                                    commentMsg: '中奖真不易，终于中了iphone6s 34G',
	                                    commentTime: '2016-01-21 11:11:11'
	                                }, {
	                                    commentId: '3',
	                                    userCode: '123456',
	                                    userPhoto: './images/2.png',
	                                    userName: '134***449',

	                                    commentMsg: '中奖真不易，终于中了iphone6s 34G',
	                                    commentTime: '2016-01-21 11:11:11',
	                                    replyList: [{
	                                        replyUser: '134***449',
	                                        replyMsg: '中奖了吗？'
	                                    }]
	                                }]
	                            },

	                            msg: '评论信息'
	                        }
	                    };

	                    if (res.ok) {
	                        var body = res.body;

	                        if (body.code === '0000') {

	                            if (_this2.state.page == 3) {
	                                _this2.setState({
	                                    page: 'not'
	                                });
	                            } else {

	                                _this2.setState({
	                                    commentList: _this2.state.commentList.concat(body.result.arrayList)
	                                });
	                            }

	                            // 打开开关变量
	                            bBtn = true;

	                            dispatch((0, _action.loading)(false));
	                        }
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            return _react2.default.createElement(_CmTemp2.default, _extends({}, this.props, { commentList: this.state.commentList, loadFN: function loadFN() {
	                    return _this3.loadFN();
	                }, page: this.state.page }));
	        }
	    }]);

	    return Commont;
	}(_react2.default.Component);

	exports.default = (0, _reactRedux.connect)()(Commont);

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Comment.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _ScrollLoad = __webpack_require__(245);

	var _ScrollLoad2 = _interopRequireDefault(_ScrollLoad);

	var _date = __webpack_require__(261);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CmTemp = function CmTemp(props) {
	    return _react2.default.createElement(
	        'div',
	        { className: 'share-lottery-comment' },
	        _react2.default.createElement(
	            'h3',
	            { className: 'comment-header text-orange' },
	            '共',
	            _react2.default.createElement(
	                'span',
	                null,
	                props.commentList.length
	            ),
	            '条评论'
	        ),
	        _react2.default.createElement(
	            'ul',
	            null,
	            props.commentList.map(function (val, index) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: index, onClick: function onClick() {
	                            return props.replyHandle(val);
	                        } },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'comd-cont share-lottery-comd share-detail-user' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'comd-left' },
	                            _react2.default.createElement('div', { className: 'c-l-img img', id: val.userPhoto, style: { backgroundImage: "./images/photo.png" } })
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'comd-right' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'share-username' },
	                                _react2.default.createElement(
	                                    'h3',
	                                    { className: 'text-blue' },
	                                    _react2.default.createElement(
	                                        'span',
	                                        { className: 'comment-floor' },
	                                        index + 1,
	                                        '楼'
	                                    ),
	                                    val.userName,
	                                    val.userName == props.userName ? _react2.default.createElement(
	                                        'span',
	                                        { className: 'floor-master' },
	                                        '楼主'
	                                    ) : null
	                                ),
	                                _react2.default.createElement(
	                                    'time',
	                                    null,
	                                    (0, _date.setDate)(val.commentTime, true)
	                                ),
	                                val.replyList ? val.replyList.map(function (val, index) {
	                                    return _react2.default.createElement(
	                                        'div',
	                                        { className: 'comment-reply', key: index },
	                                        _react2.default.createElement(
	                                            'h4',
	                                            { className: 'to-user' },
	                                            val.replyUser,
	                                            ':'
	                                        ),
	                                        _react2.default.createElement(
	                                            'p',
	                                            null,
	                                            val.replyMsg
	                                        )
	                                    );
	                                }) : null,
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: 'comment-msg' },
	                                    val.commentMsg
	                                )
	                            )
	                        )
	                    )
	                );
	            })
	        ),
	        _react2.default.createElement(_ScrollLoad2.default, { loadFN: function loadFN() {
	                return props.loadFN();
	            }, page: props.page })
	    );
	};
	exports.default = CmTemp;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "CmTemp.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(322);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(242)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./comment.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./comment.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(241)();
	// imports


	// module
	exports.push([module.id, ".share-lottery-comment {\n  border-top: 1px solid #e5e5e5;\n  background: #efefef; }\n  .share-lottery-comment .comd-right {\n    margin: -.02rem .15rem 0 0; }\n\n.comment-header {\n  padding-left: .1rem;\n  line-height: .31rem; }\n\n.comment-floor {\n  float: right;\n  font-size: .11rem;\n  color: #a7a7a7; }\n\n.floor-master {\n  display: inline-block;\n  padding: 0 .04rem;\n  margin-left: .05rem;\n  border-radius: .02rem;\n  height: .14rem;\n  line-height: .14rem;\n  background: #55a6e5;\n  font-size: .09rem;\n  color: #fff;\n  vertical-align: middle; }\n\n.comment-reply {\n  padding: .05rem;\n  margin: .05rem 0;\n  background: #e5e5e5;\n  line-height: .18rem;\n  color: #a7a7a7;\n  font-size: .11rem; }\n", ""]);

	// exports


/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _object = __webpack_require__(263);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SldTemp = function SldTemp(props) {
	    return _react2.default.createElement(
	        'div',
	        null,
	        props.shareLotteryDetailList.map(function (val, index) {
	            return _react2.default.createElement(
	                'div',
	                { className: 'share-lottery-detail', key: index },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'comd-cont share-lottery-comd share-detail-user' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'comd-left' },
	                        _react2.default.createElement('div', { className: 'c-l-img img', style: { backgroundImage: 'url(' + val.userPhoto + ')' } })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'comd-right' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'share-username' },
	                            _react2.default.createElement(
	                                'h3',
	                                { className: 'text-blue' },
	                                val.userName
	                            ),
	                            _react2.default.createElement(
	                                'time',
	                                null,
	                                val.shareTime
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'share-detial-cont' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'share-des' },
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            '获得奖品：',
	                            val.lotteryName
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            '参与人次：',
	                            val.partakeCount
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            '回报率：',
	                            (0, _object.setToFixed)(val.allPartakeCount / val.partakeCount),
	                            '倍'
	                        ),
	                        _react2.default.createElement(
	                            'p',
	                            null,
	                            '幸运号码：',
	                            val.luckyNumber
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'share-msg' },
	                        val.shareImg.map(function (image, index) {
	                            return _react2.default.createElement('img', { key: index, id: image, onClick: function onClick(e) {
	                                    return props.clickImg(e, val.shareId, index);
	                                }, className: 'img' });
	                        })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'share-hot' },
	                    _react2.default.createElement(
	                        'p',
	                        { className: 'share-hot-show' },
	                        _react2.default.createElement(
	                            'strong',
	                            { onClick: function onClick(e) {
	                                    return props.clickPraise(e, val.shareId);
	                                } },
	                            _react2.default.createElement('i', { className: 'icon icon-praise', style: val.style }),
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                val.praiseCount
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'strong',
	                            { onClick: function onClick(e) {
	                                    return props.clickComment(e, val.shareId);
	                                } },
	                            _react2.default.createElement('i', { className: 'icon icon-comment' }),
	                            val.commentCount
	                        )
	                    )
	                )
	            );
	        })
	    );
	};
	exports.default = SldTemp;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("D:\\project\\happyshopping\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "SldTemp.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(325);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(242)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./sharelotterydetail.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./sharelotterydetail.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(241)();
	// imports


	// module
	exports.push([module.id, ".share-lottery-detail-cont {\n  height: 100%; }\n\n.share-lottery-detail {\n  background: #efefef; }\n\n.share-lottery-comd .comd-left {\n  width: .42rem;\n  -webkit-box-align: start;\n  box-align: start; }\n  .share-lottery-comd .comd-left .c-l-img {\n    width: .42rem;\n    height: .42rem; }\n\n.share-detail-user {\n  padding: .08rem 0 .11rem .1rem;\n  border-bottom: 1px solid #e5e5e5; }\n  .share-detail-user .comd-left {\n    -webkit-pack-align: center;\n    pack-align: center;\n    margin-right: .12rem; }\n  .share-detail-user .share-username {\n    padding-top: .03rem;\n    line-height: .2rem; }\n    .share-detail-user .share-username time {\n      font-size: .11rem;\n      color: #a7a7a7; }\n\n.share-des {\n  padding: .07rem .1rem;\n  color: #666;\n  line-height: .29rem;\n  border-bottom: 1px solid #e5e5e5; }\n\n.share-msg {\n  padding: .12rem .1rem 0;\n  font-size: .13rem;\n  line-height: .26rem; }\n  .share-msg img {\n    margin-top: .1rem; }\n\n.relsease-box {\n  height: .44rem;\n  padding: 0 .15rem;\n  background: #fff;\n  display: -webkit-box;\n  display: box;\n  -webkit-box-align: center;\n  box-align: center; }\n  .relsease-box textarea {\n    display: block;\n    resize: none;\n    -webkit-box-flex: 1;\n    box-flex: 1;\n    height: .34rem;\n    padding: .1rem .1rem 0;\n    border: 1px solid #e2e2e2;\n    background: #efefef;\n    color: #333;\n    overflow: hidden;\n    outline: none;\n    font-size: .13rem; }\n  .relsease-box button {\n    display: block;\n    width: 30%;\n    height: .34rem;\n    line-height: .34rem;\n    border: none;\n    font-size: .15rem;\n    color: #fff;\n    background: #ff5500;\n    margin-left: .1rem; }\n", ""]);

	// exports


/***/ }

});