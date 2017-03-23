/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "rainloop/v/0.0.0/static/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/*!**********************!*\
  !*** ./dev/boot.jsx ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _window = __webpack_require__(/*! window */ 11);

	var _window2 = _interopRequireDefault(_window);

	var _LABSrc = __webpack_require__(/*! labjs/LAB.src.js */ 167);

	var _progress = __webpack_require__(/*! progress.js/src/progress.js */ 169);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(/*! json2/json2.js */ 166);
	__webpack_require__(/*! modernizr/modernizr-custom.js */ 168);
	__webpack_require__(/*! Common/Booter.jsx */ 162);

	_window2.default.$LAB = _LABSrc.$LAB;
	_window2.default.progressJs = _progress.progressJs;

/***/ },

/***/ 11:
/*!*************************!*\
  !*** external "window" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = window;

/***/ },

/***/ 14:
/*!********************************!*\
  !*** external "window.jQuery" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = window.jQuery;

/***/ },

/***/ 162:
/*!*******************************!*\
  !*** ./dev/Common/Booter.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _window = __webpack_require__(/*! window */ 11);

	var _window2 = _interopRequireDefault(_window);

	var _$ = __webpack_require__(/*! $ */ 14);

	var _$2 = _interopRequireDefault(_$);

	var _RainLoop = __webpack_require__(/*! Storage/RainLoop */ 165);

	var _RainLoop2 = _interopRequireDefault(_RainLoop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_window2.default.__rlah = function () {
		return _RainLoop2.default ? _RainLoop2.default.getHash() : null;
	};

	_window2.default.__rlah_set = function () {
		if (_RainLoop2.default) {
			_RainLoop2.default.setHash();
		}
	};

	_window2.default.__rlah_clear = function () {
		if (_RainLoop2.default) {
			_RainLoop2.default.clearHash();
		}
	};

	_window2.default.__includeScr = function (src) {
		_window2.default.document.write(unescape('%3Csc' + 'ript data-cfasync="false" type="text/jav' + 'ascr' + 'ipt" sr' + 'c="' + src + '"%3E%3C/' + 'scr' + 'ipt%3E'));
	};

	_window2.default.__includeAppScr = function (src) {
		_window2.default.__includeScr(src + (_window2.default.__rlah ? _window2.default.__rlah() || '0' : '0') + '/' + _window2.default.Math.random().toString().substr(2) + '/');
	};

	_window2.default.__includeStyle = function (styles) {
		_window2.default.document.write(unescape('%3Csty' + 'le%3E' + styles + '"%3E%3C/' + 'sty' + 'le%3E'));
	};

	_window2.default.__showError = function (additionalError) {

		var oR = _window2.default.document.getElementById('rl-loading'),
		    oL = _window2.default.document.getElementById('rl-loading-error'),
		    oLA = _window2.default.document.getElementById('rl-loading-error-additional');

		if (oR) {
			oR.style.display = 'none';
		}

		if (oL) {
			oL.style.display = 'block';
		}

		if (oLA && additionalError) {
			oLA.style.display = 'block';
			oLA.innerHTML = additionalError;
		}

		if (_window2.default.rainloopProgressJs) {
			_window2.default.rainloopProgressJs.set(100);
		}
	};

	_window2.default.__showDescription = function (description) {

		var oE = _window2.default.document.getElementById('rl-loading'),
		    oElDesc = _window2.default.document.getElementById('rl-loading-desc');

		if (oElDesc && description) {
			oElDesc.innerHTML = description;
		}

		if (oE && oE.style) {
			oE.style.opacity = 0;
			_window2.default.setTimeout(function () {
				oE.style.opacity = 1;
			}, 300);
		}
	};

	_window2.default.__runBoot = function (withError, additionalError) {
		if (_window2.default.__APP_BOOT && !withError) {
			_window2.default.__APP_BOOT(function (bV) {
				if (!bV) {
					_window2.default.__showError(additionalError);
				}
			});
		} else {
			_window2.default.__showError(additionalError);
		}
	};

	_window2.default.__runApp = function (BaseAppLibsScriptLink, BaseAppMainScriptLink, BaseAppEditorScriptLink) {

		var appData = _window2.default.rainloopAppData;

		if (_window2.default.$LAB && _window2.default.progressJs && appData && appData.TemplatesLink && appData.LangLink) {
			(function () {
				var p = _window2.default.progressJs();
				_window2.default.rainloopProgressJs = p;

				p.setOptions({ theme: 'rainloop' });
				p.start().set(5);

				_window2.default.$LAB.script(function () {
					return [{ src: BaseAppLibsScriptLink, type: 'text/javascript', charset: 'utf-8' }];
				}).wait(function () {

					p.set(20);

					if (appData.IncludeBackground && _$2.default) {
						(0, _$2.default)('#rl-bg').attr('style', 'background-image: none !important;').backstretch(appData.IncludeBackground.replace('{{USER}}', _window2.default.__rlah ? _window2.default.__rlah() || '0' : '0'), { fade: 100, centeredX: true, centeredY: true }).removeAttr('style');
					}
				}).script(function () {
					return [{ src: appData.TemplatesLink, type: 'text/javascript', charset: 'utf-8' }, { src: appData.LangLink, type: 'text/javascript', charset: 'utf-8' }];
				}).wait(function () {
					p.set(30);
				}).script(function () {
					return { src: BaseAppMainScriptLink, type: 'text/javascript', charset: 'utf-8' };
				}).wait(function () {
					p.set(50);
				}).script(function () {
					return appData.PluginsLink ? { src: appData.PluginsLink, type: 'text/javascript', charset: 'utf-8' } : null;
				}).wait(function () {
					p.set(70);
					_window2.default.__runBoot(false);
				}).script(function () {
					return { src: BaseAppEditorScriptLink, type: 'text/javascript', charset: 'utf-8' };
				}).wait(function () {
					if (_window2.default.CKEDITOR && _window2.default.__initEditor) {
						_window2.default.__initEditor();
						_window2.default.__initEditor = null;
					}
				});
			})();
		} else {
			_window2.default.__runBoot(true);
		}
	};

/***/ },

/***/ 165:
/*!**********************************!*\
  !*** ./dev/Storage/RainLoop.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _window = __webpack_require__(/*! window */ 11);

	var _window2 = _interopRequireDefault(_window);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var STORAGE_KEY = '__rlA';

	var RainLoopStorage = function () {
		function RainLoopStorage() {
			_classCallCheck(this, RainLoopStorage);

			this.s = null;
			this.t = null;

			this.s = _window2.default.sessionStorage || null;
			this.t = _window2.default.top || _window2.default;
		}

		RainLoopStorage.prototype.getHash = function getHash() {
			var result = null;
			if (this.s) {
				result = this.s.getItem(STORAGE_KEY) || null;
			} else if (this.t && JSON) {
				var data = this.t.name && '{' === this.t.name.toString().substr(0, 1) ? JSON.parse(this.t.name.toString()) : null;
				result = data ? data[STORAGE_KEY] || null : null;
			}

			return result;
		};

		RainLoopStorage.prototype.setHash = function setHash() {
			var key = 'AuthAccountHash',
			    appData = _window2.default.rainloopAppData;
			if (this.s) {
				this.s.setItem(STORAGE_KEY, appData && appData[key] ? appData[key] : '');
			} else if (this.t && JSON) {
				var data = {};
				data[STORAGE_KEY] = appData && appData[key] ? appData[key] : '';

				this.t.name = JSON.stringify(data);
			}
		};

		RainLoopStorage.prototype.clearHash = function clearHash() {
			if (this.s) {
				this.s.setItem(STORAGE_KEY, '');
			} else if (this.t) {
				this.t.name = '';
			}
		};

		return RainLoopStorage;
	}();

	module.exports = new RainLoopStorage();

/***/ },

/***/ 166:
/*!********************************!*\
  !*** ./vendors/json2/json2.js ***!
  \********************************/
/***/ function(module, exports) {

	/*
	    json2.js
	    2015-05-03

	    Public Domain.

	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

	    See http://www.JSON.org/js.html


	    This code should be minified before deployment.
	    See http://javascript.crockford.com/jsmin.html

	    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	    NOT CONTROL.


	    This file creates a global JSON object containing two methods: stringify
	    and parse. This file is provides the ES5 JSON capability to ES3 systems.
	    If a project might run on IE8 or earlier, then this file should be included.
	    This file does nothing on ES5 systems.

	        JSON.stringify(value, replacer, space)
	            value       any JavaScript value, usually an object or array.

	            replacer    an optional parameter that determines how object
	                        values are stringified for objects. It can be a
	                        function or an array of strings.

	            space       an optional parameter that specifies the indentation
	                        of nested structures. If it is omitted, the text will
	                        be packed without extra whitespace. If it is a number,
	                        it will specify the number of spaces to indent at each
	                        level. If it is a string (such as '\t' or '&nbsp;'),
	                        it contains the characters used to indent at each level.

	            This method produces a JSON text from a JavaScript value.

	            When an object value is found, if the object contains a toJSON
	            method, its toJSON method will be called and the result will be
	            stringified. A toJSON method does not serialize: it returns the
	            value represented by the name/value pair that should be serialized,
	            or undefined if nothing should be serialized. The toJSON method
	            will be passed the key associated with the value, and this will be
	            bound to the value

	            For example, this would serialize Dates as ISO strings.

	                Date.prototype.toJSON = function (key) {
	                    function f(n) {
	                        // Format integers to have at least two digits.
	                        return n < 10 
	                            ? '0' + n 
	                            : n;
	                    }

	                    return this.getUTCFullYear()   + '-' +
	                         f(this.getUTCMonth() + 1) + '-' +
	                         f(this.getUTCDate())      + 'T' +
	                         f(this.getUTCHours())     + ':' +
	                         f(this.getUTCMinutes())   + ':' +
	                         f(this.getUTCSeconds())   + 'Z';
	                };

	            You can provide an optional replacer method. It will be passed the
	            key and value of each member, with this bound to the containing
	            object. The value that is returned from your method will be
	            serialized. If your method returns undefined, then the member will
	            be excluded from the serialization.

	            If the replacer parameter is an array of strings, then it will be
	            used to select the members to be serialized. It filters the results
	            such that only members with keys listed in the replacer array are
	            stringified.

	            Values that do not have JSON representations, such as undefined or
	            functions, will not be serialized. Such values in objects will be
	            dropped; in arrays they will be replaced with null. You can use
	            a replacer function to replace those with JSON values.
	            JSON.stringify(undefined) returns undefined.

	            The optional space parameter produces a stringification of the
	            value that is filled with line breaks and indentation to make it
	            easier to read.

	            If the space parameter is a non-empty string, then that string will
	            be used for indentation. If the space parameter is a number, then
	            the indentation will be that many spaces.

	            Example:

	            text = JSON.stringify(['e', {pluribus: 'unum'}]);
	            // text is '["e",{"pluribus":"unum"}]'


	            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
	            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

	            text = JSON.stringify([new Date()], function (key, value) {
	                return this[key] instanceof Date 
	                    ? 'Date(' + this[key] + ')' 
	                    : value;
	            });
	            // text is '["Date(---current time---)"]'


	        JSON.parse(text, reviver)
	            This method parses a JSON text to produce an object or array.
	            It can throw a SyntaxError exception.

	            The optional reviver parameter is a function that can filter and
	            transform the results. It receives each of the keys and values,
	            and its return value is used instead of the original value.
	            If it returns what it received, then the structure is not modified.
	            If it returns undefined then the member is deleted.

	            Example:

	            // Parse the text. Values that look like ISO date strings will
	            // be converted to Date objects.

	            myData = JSON.parse(text, function (key, value) {
	                var a;
	                if (typeof value === 'string') {
	                    a =
	/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
	                    if (a) {
	                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
	                            +a[5], +a[6]));
	                    }
	                }
	                return value;
	            });

	            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
	                var d;
	                if (typeof value === 'string' &&
	                        value.slice(0, 5) === 'Date(' &&
	                        value.slice(-1) === ')') {
	                    d = new Date(value.slice(5, -1));
	                    if (d) {
	                        return d;
	                    }
	                }
	                return value;
	            });


	    This is a reference implementation. You are free to copy, modify, or
	    redistribute.
	*/

	/*jslint 
	    eval, for, this 
	*/

	/*property
	    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
	    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
	    lastIndex, length, parse, prototype, push, replace, slice, stringify,
	    test, toJSON, toString, valueOf
	*/


	// Create a JSON object only if one does not already exist. We create the
	// methods in a closure to avoid creating global variables.

	if (typeof JSON !== 'object') {
	    JSON = {};
	}

	(function () {
	    'use strict';
	    
	    var rx_one = /^[\],:{}\s]*$/,
	        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
	        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

	    function f(n) {
	        // Format integers to have at least two digits.
	        return n < 10 
	            ? '0' + n 
	            : n;
	    }
	    
	    function this_value() {
	        return this.valueOf();
	    }

	    if (typeof Date.prototype.toJSON !== 'function') {

	        Date.prototype.toJSON = function () {

	            return isFinite(this.valueOf())
	                ? this.getUTCFullYear() + '-' +
	                        f(this.getUTCMonth() + 1) + '-' +
	                        f(this.getUTCDate()) + 'T' +
	                        f(this.getUTCHours()) + ':' +
	                        f(this.getUTCMinutes()) + ':' +
	                        f(this.getUTCSeconds()) + 'Z'
	                : null;
	        };

	        Boolean.prototype.toJSON = this_value;
	        Number.prototype.toJSON = this_value;
	        String.prototype.toJSON = this_value;
	    }

	    var gap,
	        indent,
	        meta,
	        rep;


	    function quote(string) {

	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.

	        rx_escapable.lastIndex = 0;
	        return rx_escapable.test(string) 
	            ? '"' + string.replace(rx_escapable, function (a) {
	                var c = meta[a];
	                return typeof c === 'string'
	                    ? c
	                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	            }) + '"' 
	            : '"' + string + '"';
	    }


	    function str(key, holder) {

	// Produce a string from holder[key].

	        var i,          // The loop counter.
	            k,          // The member key.
	            v,          // The member value.
	            length,
	            mind = gap,
	            partial,
	            value = holder[key];

	// If the value has a toJSON method, call it to obtain a replacement value.

	        if (value && typeof value === 'object' &&
	                typeof value.toJSON === 'function') {
	            value = value.toJSON(key);
	        }

	// If we were called with a replacer function, then call the replacer to
	// obtain a replacement value.

	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }

	// What happens next depends on the value's type.

	        switch (typeof value) {
	        case 'string':
	            return quote(value);

	        case 'number':

	// JSON numbers must be finite. Encode non-finite numbers as null.

	            return isFinite(value) 
	                ? String(value) 
	                : 'null';

	        case 'boolean':
	        case 'null':

	// If the value is a boolean or null, convert it to a string. Note:
	// typeof null does not produce 'null'. The case is included here in
	// the remote chance that this gets fixed someday.

	            return String(value);

	// If the type is 'object', we might be dealing with an object or an array or
	// null.

	        case 'object':

	// Due to a specification blunder in ECMAScript, typeof null is 'object',
	// so watch out for that case.

	            if (!value) {
	                return 'null';
	            }

	// Make an array to hold the partial results of stringifying this object value.

	            gap += indent;
	            partial = [];

	// Is the value an array?

	            if (Object.prototype.toString.apply(value) === '[object Array]') {

	// The value is an array. Stringify every element. Use null as a placeholder
	// for non-JSON values.

	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }

	// Join all of the elements together, separated with commas, and wrap them in
	// brackets.

	                v = partial.length === 0
	                    ? '[]'
	                    : gap
	                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
	                        : '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }

	// If the replacer is an array, use it to select the members to be stringified.

	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    if (typeof rep[i] === 'string') {
	                        k = rep[i];
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (
	                                gap 
	                                    ? ': ' 
	                                    : ':'
	                            ) + v);
	                        }
	                    }
	                }
	            } else {

	// Otherwise, iterate through all of the keys in the object.

	                for (k in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (
	                                gap 
	                                    ? ': ' 
	                                    : ':'
	                            ) + v);
	                        }
	                    }
	                }
	            }

	// Join all of the member texts together, separated with commas,
	// and wrap them in braces.

	            v = partial.length === 0
	                ? '{}'
	                : gap
	                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
	                    : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }

	// If the JSON object does not yet have a stringify method, give it one.

	    if (typeof JSON.stringify !== 'function') {
	        meta = {    // table of character substitutions
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"': '\\"',
	            '\\': '\\\\'
	        };
	        JSON.stringify = function (value, replacer, space) {

	// The stringify method takes a value and an optional replacer, and an optional
	// space parameter, and returns a JSON text. The replacer can be a function
	// that can replace values, or an array of strings that will select the keys.
	// A default replacer method can be provided. Use of the space parameter can
	// produce text that is more easily readable.

	            var i;
	            gap = '';
	            indent = '';

	// If the space parameter is a number, make an indent string containing that
	// many spaces.

	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }

	// If the space parameter is a string, it will be used as the indent string.

	            } else if (typeof space === 'string') {
	                indent = space;
	            }

	// If there is a replacer, it must be a function or an array.
	// Otherwise, throw an error.

	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                    typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }

	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.

	            return str('', {'': value});
	        };
	    }


	// If the JSON object does not yet have a parse method, give it one.

	    if (typeof JSON.parse !== 'function') {
	        JSON.parse = function (text, reviver) {

	// The parse method takes a text and an optional reviver function, and returns
	// a JavaScript value if the text is a valid JSON text.

	            var j;

	            function walk(holder, key) {

	// The walk method is used to recursively walk the resulting structure so
	// that modifications can be made.

	                var k, v, value = holder[key];
	                if (value && typeof value === 'object') {
	                    for (k in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, k)) {
	                            v = walk(value, k);
	                            if (v !== undefined) {
	                                value[k] = v;
	                            } else {
	                                delete value[k];
	                            }
	                        }
	                    }
	                }
	                return reviver.call(holder, key, value);
	            }


	// Parsing happens in four stages. In the first stage, we replace certain
	// Unicode characters with escape sequences. JavaScript handles many characters
	// incorrectly, either silently deleting them, or treating them as line endings.

	            text = String(text);
	            rx_dangerous.lastIndex = 0;
	            if (rx_dangerous.test(text)) {
	                text = text.replace(rx_dangerous, function (a) {
	                    return '\\u' +
	                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	                });
	            }

	// In the second stage, we run the text against regular expressions that look
	// for non-JSON patterns. We are especially concerned with '()' and 'new'
	// because they can cause invocation, and '=' because it can cause mutation.
	// But just to be safe, we want to reject all unexpected forms.

	// We split the second stage into 4 regexp operations in order to work around
	// crippling inefficiencies in IE's and Safari's regexp engines. First we
	// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
	// replace all simple value tokens with ']' characters. Third, we delete all
	// open brackets that follow a colon or comma or that begin the text. Finally,
	// we look to see that the remaining characters are only whitespace or ']' or
	// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

	            if (
	                rx_one.test(
	                    text
	                        .replace(rx_two, '@')
	                        .replace(rx_three, ']')
	                        .replace(rx_four, '')
	                )
	            ) {

	// In the third stage we use the eval function to compile the text into a
	// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
	// in JavaScript: it can begin a block or an object literal. We wrap the text
	// in parens to eliminate the ambiguity.

	                j = eval('(' + text + ')');

	// In the optional fourth stage, we recursively walk the new structure, passing
	// each name/value pair to a reviver function for possible transformation.

	                return typeof reviver === 'function'
	                    ? walk({'': j}, '')
	                    : j;
	            }

	// If the text is not JSON parseable, then a SyntaxError is thrown.

	            throw new SyntaxError('JSON.parse');
	        };
	    }
	}());


/***/ },

/***/ 167:
/*!**********************************!*\
  !*** ./vendors/labjs/LAB.src.js ***!
  \**********************************/
/***/ function(module, exports) {

	/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
	    v2.0.3 (c) Kyle Simpson
	    MIT License
	*/

	(function(global){
		var _$LAB = global.$LAB,
		
			// constants for the valid keys of the options object
			_UseLocalXHR = "UseLocalXHR",
			_AlwaysPreserveOrder = "AlwaysPreserveOrder",
			_AllowDuplicates = "AllowDuplicates",
			_CacheBust = "CacheBust",
			/*!START_DEBUG*/_Debug = "Debug",/*!END_DEBUG*/
			_BasePath = "BasePath",
			
			// stateless variables used across all $LAB instances
			root_page = /^[^?#]*\//.exec(location.href)[0],
			root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
			append_to = document.head || document.getElementsByTagName("head"),
			
			// inferences... ick, but still necessary
			opera_or_gecko = (global.opera && Object.prototype.toString.call(global.opera) == "[object Opera]") || ("MozAppearance" in document.documentElement.style),

	/*!START_DEBUG*/
			// console.log() and console.error() wrappers
			log_msg = function(){}, 
			log_error = log_msg,
	/*!END_DEBUG*/
			
			// feature sniffs (yay!)
			test_script_elem = document.createElement("script"),
			explicit_preloading = typeof test_script_elem.preload == "boolean", // http://wiki.whatwg.org/wiki/Script_Execution_Control#Proposal_1_.28Nicholas_Zakas.29
			real_preloading = explicit_preloading || (test_script_elem.readyState && test_script_elem.readyState == "uninitialized"), // will a script preload with `src` set before DOM append?
			script_ordered_async = !real_preloading && test_script_elem.async === true, // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
			
			// XHR preloading (same-domain) and cache-preloading (remote-domain) are the fallbacks (for some browsers)
			xhr_or_cache_preloading = !real_preloading && !script_ordered_async && !opera_or_gecko
		;

	/*!START_DEBUG*/
		// define console wrapper functions if applicable
		if (global.console && global.console.log) {
			if (!global.console.error) global.console.error = global.console.log;
			log_msg = function(msg) { global.console.log(msg); };
			log_error = function(msg,err) { global.console.error(msg,err); };
		}
	/*!END_DEBUG*/

		// test for function
		function is_func(func) { return Object.prototype.toString.call(func) == "[object Function]"; }

		// test for array
		function is_array(arr) { return Object.prototype.toString.call(arr) == "[object Array]"; }

		// make script URL absolute/canonical
		function canonical_uri(src,base_path) {
			var absolute_regex = /^\w+\:\/\//;
			
			// is `src` is protocol-relative (begins with // or ///), prepend protocol
			if (/^\/\/\/?/.test(src)) {
				src = location.protocol + src;
			}
			// is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)
			else if (!absolute_regex.test(src) && src.charAt(0) != "/") {
				// prepend `base_path`, if any
				src = (base_path || "") + src;
			}
			// make sure to return `src` as absolute
			return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
		}

		// merge `source` into `target`
		function merge_objs(source,target) {
			for (var k in source) { if (source.hasOwnProperty(k)) {
				target[k] = source[k]; // TODO: does this need to be recursive for our purposes?
			}}
			return target;
		}

		// does the chain group have any ready-to-execute scripts?
		function check_chain_group_scripts_ready(chain_group) {
			var any_scripts_ready = false;
			for (var i=0; i<chain_group.scripts.length; i++) {
				if (chain_group.scripts[i].ready && chain_group.scripts[i].exec_trigger) {
					any_scripts_ready = true;
					chain_group.scripts[i].exec_trigger();
					chain_group.scripts[i].exec_trigger = null;
				}
			}
			return any_scripts_ready;
		}

		// creates a script load listener
		function create_script_load_listener(elem,registry_item,flag,onload) {
			elem.onload = elem.onreadystatechange = function() {
				if ((elem.readyState && elem.readyState != "complete" && elem.readyState != "loaded") || registry_item[flag]) return;
				elem.onload = elem.onreadystatechange = null;
				onload();
			};
		}

		// script executed handler
		function script_executed(registry_item) {
			registry_item.ready = registry_item.finished = true;
			for (var i=0; i<registry_item.finished_listeners.length; i++) {
				registry_item.finished_listeners[i]();
			}
			registry_item.ready_listeners = [];
			registry_item.finished_listeners = [];
		}

		// make the request for a scriptha
		function request_script(chain_opts,script_obj,registry_item,onload,preload_this_script) {
			// setTimeout() "yielding" prevents some weird race/crash conditions in older browsers
			setTimeout(function(){
				var script, src = script_obj.real_src, xhr;
				
				// don't proceed until `append_to` is ready to append to
				if ("item" in append_to) { // check if `append_to` ref is still a live node list
					if (!append_to[0]) { // `append_to` node not yet ready
						// try again in a little bit -- note: will re-call the anonymous function in the outer setTimeout, not the parent `request_script()`
						setTimeout(arguments.callee,25);
						return;
					}
					// reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
					append_to = append_to[0];
				}
				script = document.createElement("script");
				if (script_obj.type) script.type = script_obj.type;
				if (script_obj.charset) script.charset = script_obj.charset;
				
				// should preloading be used for this script?
				if (preload_this_script) {
					// real script preloading?
					if (real_preloading) {
						/*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script preload: "+src);/*!END_DEBUG*/
						registry_item.elem = script;
						if (explicit_preloading) { // explicit preloading (aka, Zakas' proposal)
							script.preload = true;
							script.onpreload = onload;
						}
						else {
							script.onreadystatechange = function(){
								if (script.readyState == "loaded") onload();
							};
						}
						script.src = src;
						// NOTE: no append to DOM yet, appending will happen when ready to execute
					}
					// same-domain and XHR allowed? use XHR preloading
					else if (preload_this_script && src.indexOf(root_domain) == 0 && chain_opts[_UseLocalXHR]) {
						xhr = new XMLHttpRequest(); // note: IE never uses XHR (it supports true preloading), so no more need for ActiveXObject fallback for IE <= 7
						/*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script preload (xhr): "+src);/*!END_DEBUG*/
						xhr.onreadystatechange = function() {
							if (xhr.readyState == 4) {
								xhr.onreadystatechange = function(){}; // fix a memory leak in IE
								registry_item.text = xhr.responseText + "\n//@ sourceURL=" + src; // http://blog.getfirebug.com/2009/08/11/give-your-eval-a-name-with-sourceurl/
								onload();
							}
						};
						xhr.open("GET",src);
						xhr.send();
					}
					// as a last resort, use cache-preloading
					else {
						/*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script preload (cache): "+src);/*!END_DEBUG*/
						script.type = "text/cache-script";
						create_script_load_listener(script,registry_item,"ready",function() {
							append_to.removeChild(script);
							onload();
						});
						script.src = src;
						append_to.insertBefore(script,append_to.firstChild);
					}
				}
				// use async=false for ordered async? parallel-load-serial-execute http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
				else if (script_ordered_async) {
					/*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script load (ordered async): "+src);/*!END_DEBUG*/
					script.async = false;
					create_script_load_listener(script,registry_item,"finished",onload);
					script.src = src;
					append_to.insertBefore(script,append_to.firstChild);
				}
				// otherwise, just a normal script element
				else {
					/*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("start script load: "+src);/*!END_DEBUG*/
					create_script_load_listener(script,registry_item,"finished",onload);
					script.src = src;
					append_to.insertBefore(script,append_to.firstChild);
				}
			},0);
		}
			
		// create a clean instance of $LAB
		function create_sandbox() {
			var global_defaults = {},
				can_use_preloading = real_preloading || xhr_or_cache_preloading,
				queue = [],
				registry = {},
				instanceAPI
			;
			
			// global defaults
			global_defaults[_UseLocalXHR] = true;
			global_defaults[_AlwaysPreserveOrder] = false;
			global_defaults[_AllowDuplicates] = false;
			global_defaults[_CacheBust] = false;
			/*!START_DEBUG*/global_defaults[_Debug] = false;/*!END_DEBUG*/
			global_defaults[_BasePath] = "";

			// execute a script that has been preloaded already
			function execute_preloaded_script(chain_opts,script_obj,registry_item) {
				var script;
				
				function preload_execute_finished() {
					if (script != null) { // make sure this only ever fires once
						script = null;
						script_executed(registry_item);
					}
				}
				
				if (registry[script_obj.src].finished) return;
				if (!chain_opts[_AllowDuplicates]) registry[script_obj.src].finished = true;
				
				script = registry_item.elem || document.createElement("script");
				if (script_obj.type) script.type = script_obj.type;
				if (script_obj.charset) script.charset = script_obj.charset;
				create_script_load_listener(script,registry_item,"finished",preload_execute_finished);
				
				// script elem was real-preloaded
				if (registry_item.elem) {
					registry_item.elem = null;
				}
				// script was XHR preloaded
				else if (registry_item.text) {
					script.onload = script.onreadystatechange = null;	// script injection doesn't fire these events
					script.text = registry_item.text;
				}
				// script was cache-preloaded
				else {
					script.src = script_obj.real_src;
				}
				append_to.insertBefore(script,append_to.firstChild);

				// manually fire execution callback for injected scripts, since events don't fire
				if (registry_item.text) {
					preload_execute_finished();
				}
			}
		
			// process the script request setup
			function do_script(chain_opts,script_obj,chain_group,preload_this_script) {
				var registry_item,
					registry_items,
					ready_cb = function(){ script_obj.ready_cb(script_obj,function(){ execute_preloaded_script(chain_opts,script_obj,registry_item); }); },
					finished_cb = function(){ script_obj.finished_cb(script_obj,chain_group); }
				;
				
				script_obj.src = canonical_uri(script_obj.src,chain_opts[_BasePath]);
				script_obj.real_src = script_obj.src + 
					// append cache-bust param to URL?
					(chain_opts[_CacheBust] ? ((/\?.*$/.test(script_obj.src) ? "&_" : "?_") + ~~(Math.random()*1E9) + "=") : "")
				;
				
				if (!registry[script_obj.src]) registry[script_obj.src] = {items:[],finished:false};
				registry_items = registry[script_obj.src].items;

				// allowing duplicates, or is this the first recorded load of this script?
				if (chain_opts[_AllowDuplicates] || registry_items.length == 0) {
					registry_item = registry_items[registry_items.length] = {
						ready:false,
						finished:false,
						ready_listeners:[ready_cb],
						finished_listeners:[finished_cb]
					};

					request_script(chain_opts,script_obj,registry_item,
						// which callback type to pass?
						(
						 	(preload_this_script) ? // depends on script-preloading
							function(){
								registry_item.ready = true;
								for (var i=0; i<registry_item.ready_listeners.length; i++) {
									registry_item.ready_listeners[i]();
								}
								registry_item.ready_listeners = [];
							} :
							function(){ script_executed(registry_item); }
						),
						// signal if script-preloading should be used or not
						preload_this_script
					);
				}
				else {
					registry_item = registry_items[0];
					if (registry_item.finished) {
						finished_cb();
					}
					else {
						registry_item.finished_listeners.push(finished_cb);
					}
				}
			}

			// creates a closure for each separate chain spawned from this $LAB instance, to keep state cleanly separated between chains
			function create_chain() {
				var chainedAPI,
					chain_opts = merge_objs(global_defaults,{}),
					chain = [],
					exec_cursor = 0,
					scripts_currently_loading = false,
					group
				;
				
				// called when a script has finished preloading
				function chain_script_ready(script_obj,exec_trigger) {
					/*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("script preload finished: "+script_obj.real_src);/*!END_DEBUG*/
					script_obj.ready = true;
					script_obj.exec_trigger = exec_trigger;
					advance_exec_cursor(); // will only check for 'ready' scripts to be executed
				}

				// called when a script has finished executing
				function chain_script_executed(script_obj,chain_group) {
					/*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("script execution finished: "+script_obj.real_src);/*!END_DEBUG*/
					script_obj.ready = script_obj.finished = true;
					script_obj.exec_trigger = null;
					// check if chain group is all finished
					for (var i=0; i<chain_group.scripts.length; i++) {
						if (!chain_group.scripts[i].finished) return;
					}
					// chain_group is all finished if we get this far
					chain_group.finished = true;
					advance_exec_cursor();
				}

				// main driver for executing each part of the chain
				function advance_exec_cursor() {
					while (exec_cursor < chain.length) {
						if (is_func(chain[exec_cursor])) {
							/*!START_DEBUG*/if (chain_opts[_Debug]) log_msg("$LAB.wait() executing: "+chain[exec_cursor]);/*!END_DEBUG*/
							try { chain[exec_cursor++](); } catch (err) {
								/*!START_DEBUG*/if (chain_opts[_Debug]) log_error("$LAB.wait() error caught: ",err);/*!END_DEBUG*/
							}
							continue;
						}
						else if (!chain[exec_cursor].finished) {
							if (check_chain_group_scripts_ready(chain[exec_cursor])) continue;
							break;
						}
						exec_cursor++;
					}
					// we've reached the end of the chain (so far)
					if (exec_cursor == chain.length) {
						scripts_currently_loading = false;
						group = false;
					}
				}
				
				// setup next chain script group
				function init_script_chain_group() {
					if (!group || !group.scripts) {
						chain.push(group = {scripts:[],finished:true});
					}
				}

				// API for $LAB chains
				chainedAPI = {
					// start loading one or more scripts
					script:function(){
						for (var i=0; i<arguments.length; i++) {
							(function(script_obj,script_list){
								var splice_args;
								
								if (!is_array(script_obj)) {
									script_list = [script_obj];
								}
								for (var j=0; j<script_list.length; j++) {
									init_script_chain_group();
									script_obj = script_list[j];
									
									if (is_func(script_obj)) script_obj = script_obj();
									if (!script_obj) continue;
									if (is_array(script_obj)) {
										// set up an array of arguments to pass to splice()
										splice_args = [].slice.call(script_obj); // first include the actual array elements we want to splice in
										splice_args.unshift(j,1); // next, put the `index` and `howMany` parameters onto the beginning of the splice-arguments array
										[].splice.apply(script_list,splice_args); // use the splice-arguments array as arguments for splice()
										j--; // adjust `j` to account for the loop's subsequent `j++`, so that the next loop iteration uses the same `j` index value
										continue;
									}
									if (typeof script_obj == "string") script_obj = {src:script_obj};
									script_obj = merge_objs(script_obj,{
										ready:false,
										ready_cb:chain_script_ready,
										finished:false,
										finished_cb:chain_script_executed
									});
									group.finished = false;
									group.scripts.push(script_obj);
									
									do_script(chain_opts,script_obj,group,(can_use_preloading && scripts_currently_loading));
									scripts_currently_loading = true;
									
									if (chain_opts[_AlwaysPreserveOrder]) chainedAPI.wait();
								}
							})(arguments[i],arguments[i]);
						}
						return chainedAPI;
					},
					// force LABjs to pause in execution at this point in the chain, until the execution thus far finishes, before proceeding
					wait:function(){
						if (arguments.length > 0) {
							for (var i=0; i<arguments.length; i++) {
								chain.push(arguments[i]);
							}
							group = chain[chain.length-1];
						}
						else group = false;
						
						advance_exec_cursor();
						
						return chainedAPI;
					}
				};

				// the first chain link API (includes `setOptions` only this first time)
				return {
					script:chainedAPI.script, 
					wait:chainedAPI.wait, 
					setOptions:function(opts){
						merge_objs(opts,chain_opts);
						return chainedAPI;
					}
				};
			}

			// API for each initial $LAB instance (before chaining starts)
			instanceAPI = {
				// main API functions
				setGlobalDefaults:function(opts){
					merge_objs(opts,global_defaults);
					return instanceAPI;
				},
				setOptions:function(){
					return create_chain().setOptions.apply(null,arguments);
				},
				script:function(){
					return create_chain().script.apply(null,arguments);
				},
				wait:function(){
					return create_chain().wait.apply(null,arguments);
				},

				// built-in queuing for $LAB `script()` and `wait()` calls
				// useful for building up a chain programmatically across various script locations, and simulating
				// execution of the chain
				queueScript:function(){
					queue[queue.length] = {type:"script", args:[].slice.call(arguments)};
					return instanceAPI;
				},
				queueWait:function(){
					queue[queue.length] = {type:"wait", args:[].slice.call(arguments)};
					return instanceAPI;
				},
				runQueue:function(){
					var $L = instanceAPI, len=queue.length, i=len, val;
					for (;--i>=0;) {
						val = queue.shift();
						$L = $L[val.type].apply(null,val.args);
					}
					return $L;
				},

				// rollback `[global].$LAB` to what it was before this file was loaded, the return this current instance of $LAB
				noConflict:function(){
					global.$LAB = _$LAB;
					return instanceAPI;
				},

				// create another clean instance of $LAB
				sandbox:function(){
					return create_sandbox();
				}
			};

			return instanceAPI;
		}

		// create the main instance of $LAB
		global.$LAB = create_sandbox();


		/* The following "hack" was suggested by Andrea Giammarchi and adapted from: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
		   NOTE: this hack only operates in FF and then only in versions where document.readyState is not present (FF < 3.6?).
		   
		   The hack essentially "patches" the **page** that LABjs is loaded onto so that it has a proper conforming document.readyState, so that if a script which does 
		   proper and safe dom-ready detection is loaded onto a page, after dom-ready has passed, it will still be able to detect this state, by inspecting the now hacked 
		   document.readyState property. The loaded script in question can then immediately trigger any queued code executions that were waiting for the DOM to be ready. 
		   For instance, jQuery 1.4+ has been patched to take advantage of document.readyState, which is enabled by this hack. But 1.3.2 and before are **not** safe or 
		   fixed by this hack, and should therefore **not** be lazy-loaded by script loader tools such as LABjs.
		*/ 
		(function(addEvent,domLoaded,handler){
			if (document.readyState == null && document[addEvent]){
				document.readyState = "loading";
				document[addEvent](domLoaded,handler = function(){
					document.removeEventListener(domLoaded,handler,false);
					document.readyState = "complete";
				},false);
			}
		})("addEventListener","DOMContentLoaded");

	})(this);

/***/ },

/***/ 168:
/*!***********************************************!*\
  !*** ./vendors/modernizr/modernizr-custom.js ***!
  \***********************************************/
/***/ function(module, exports) {

	/*!
	 * modernizr v3.3.1
	 * Build http://modernizr.com/download?-cssanimations-csstransitions-rgba-setclasses-dontmin
	 *
	 * Copyright (c)
	 *  Faruk Ates
	 *  Paul Irish
	 *  Alex Sexton
	 *  Ryan Seddon
	 *  Patrick Kettner
	 *  Stu Cox
	 *  Richard Herrera

	 * MIT License
	 */

	/*
	 * Modernizr tests which native CSS3 and HTML5 features are available in the
	 * current UA and makes the results available to you in two ways: as properties on
	 * a global `Modernizr` object, and as classes on the `<html>` element. This
	 * information allows you to progressively enhance your pages with a granular level
	 * of control over the experience.
	*/

	;(function(window, document, undefined){
	  var classes = [];
	  

	  var tests = [];
	  

	  /**
	   *
	   * ModernizrProto is the constructor for Modernizr
	   *
	   * @class
	   * @access public
	   */

	  var ModernizrProto = {
	    // The current version, dummy
	    _version: '3.3.1',

	    // Any settings that don't work as separate modules
	    // can go in here as configuration.
	    _config: {
	      'classPrefix': '',
	      'enableClasses': true,
	      'enableJSClass': true,
	      'usePrefixes': true
	    },

	    // Queue of tests
	    _q: [],

	    // Stub these for people who are listening
	    on: function(test, cb) {
	      // I don't really think people should do this, but we can
	      // safe guard it a bit.
	      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
	      // This is in case people listen to synchronous tests. I would leave it out,
	      // but the code to *disallow* sync tests in the real version of this
	      // function is actually larger than this.
	      var self = this;
	      setTimeout(function() {
	        cb(self[test]);
	      }, 0);
	    },

	    addTest: function(name, fn, options) {
	      tests.push({name: name, fn: fn, options: options});
	    },

	    addAsyncTest: function(fn) {
	      tests.push({name: null, fn: fn});
	    }
	  };

	  

	  // Fake some of Object.create so we can force non test results to be non "own" properties.
	  var Modernizr = function() {};
	  Modernizr.prototype = ModernizrProto;

	  // Leak modernizr globally when you `require` it rather than force it here.
	  // Overwrite name so constructor name is nicer :D
	  Modernizr = new Modernizr();

	  

	  /**
	   * is returns a boolean if the typeof an obj is exactly type.
	   *
	   * @access private
	   * @function is
	   * @param {*} obj - A thing we want to check the type of
	   * @param {string} type - A string to compare the typeof against
	   * @returns {boolean}
	   */

	  function is(obj, type) {
	    return typeof obj === type;
	  }
	  ;

	  /**
	   * Run through all tests and detect their support in the current UA.
	   *
	   * @access private
	   */

	  function testRunner() {
	    var featureNames;
	    var feature;
	    var aliasIdx;
	    var result;
	    var nameIdx;
	    var featureName;
	    var featureNameSplit;

	    for (var featureIdx in tests) {
	      if (tests.hasOwnProperty(featureIdx)) {
	        featureNames = [];
	        feature = tests[featureIdx];
	        // run the test, throw the return value into the Modernizr,
	        // then based on that boolean, define an appropriate className
	        // and push it into an array of classes we'll join later.
	        //
	        // If there is no name, it's an 'async' test that is run,
	        // but not directly added to the object. That should
	        // be done with a post-run addTest call.
	        if (feature.name) {
	          featureNames.push(feature.name.toLowerCase());

	          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
	            // Add all the aliases into the names list
	            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
	              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
	            }
	          }
	        }

	        // Run the test, or use the raw value if it's not a function
	        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


	        // Set each of the names on the Modernizr object
	        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
	          featureName = featureNames[nameIdx];
	          // Support dot properties as sub tests. We don't do checking to make sure
	          // that the implied parent tests have been added. You must call them in
	          // order (either in the test, or make the parent test a dependency).
	          //
	          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
	          // hashtag famous last words
	          featureNameSplit = featureName.split('.');

	          if (featureNameSplit.length === 1) {
	            Modernizr[featureNameSplit[0]] = result;
	          } else {
	            // cast to a Boolean, if not one already
	            /* jshint -W053 */
	            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
	              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
	            }

	            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
	          }

	          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
	        }
	      }
	    }
	  }
	  ;

	  /**
	   * docElement is a convenience wrapper to grab the root element of the document
	   *
	   * @access private
	   * @returns {HTMLElement|SVGElement} The root element of the document
	   */

	  var docElement = document.documentElement;
	  

	  /**
	   * A convenience helper to check if the document we are running in is an SVG document
	   *
	   * @access private
	   * @returns {boolean}
	   */

	  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
	  

	  /**
	   * setClasses takes an array of class names and adds them to the root element
	   *
	   * @access private
	   * @function setClasses
	   * @param {string[]} classes - Array of class names
	   */

	  // Pass in an and array of class names, e.g.:
	  //  ['no-webp', 'borderradius', ...]
	  function setClasses(classes) {
	    var className = docElement.className;
	    var classPrefix = Modernizr._config.classPrefix || '';

	    if (isSVG) {
	      className = className.baseVal;
	    }

	    // Change `no-js` to `js` (independently of the `enableClasses` option)
	    // Handle classPrefix on this too
	    if (Modernizr._config.enableJSClass) {
	      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
	      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
	    }

	    if (Modernizr._config.enableClasses) {
	      // Add the new classes
	      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
	      isSVG ? docElement.className.baseVal = className : docElement.className = className;
	    }

	  }

	  ;

	  /**
	   * createElement is a convenience wrapper around document.createElement. Since we
	   * use createElement all over the place, this allows for (slightly) smaller code
	   * as well as abstracting away issues with creating elements in contexts other than
	   * HTML documents (e.g. SVG documents).
	   *
	   * @access private
	   * @function createElement
	   * @returns {HTMLElement|SVGElement} An HTML or SVG element
	   */

	  function createElement() {
	    if (typeof document.createElement !== 'function') {
	      // This is the case in IE7, where the type of createElement is "object".
	      // For this reason, we cannot call apply() as Object is not a Function.
	      return document.createElement(arguments[0]);
	    } else if (isSVG) {
	      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
	    } else {
	      return document.createElement.apply(document, arguments);
	    }
	  }

	  ;
	/*!
	{
	  "name": "CSS rgba",
	  "caniuse": "css3-colors",
	  "property": "rgba",
	  "tags": ["css"],
	  "notes": [{
	    "name": "CSSTricks Tutorial",
	    "href": "https://css-tricks.com/rgba-browser-support/"
	  }]
	}
	!*/

	  Modernizr.addTest('rgba', function() {
	    var style = createElement('a').style;
	    style.cssText = 'background-color:rgba(150,255,150,.5)';

	    return ('' + style.backgroundColor).indexOf('rgba') > -1;
	  });


	  /**
	   * If the browsers follow the spec, then they would expose vendor-specific style as:
	   *   elem.style.WebkitBorderRadius
	   * instead of something like the following, which would be technically incorrect:
	   *   elem.style.webkitBorderRadius

	   * Webkit ghosts their properties in lowercase but Opera & Moz do not.
	   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
	   *   erik.eae.net/archives/2008/03/10/21.48.10/

	   * More here: github.com/Modernizr/Modernizr/issues/issue/21
	   *
	   * @access private
	   * @returns {string} The string representing the vendor-specific style properties
	   */

	  var omPrefixes = 'Moz O ms Webkit';
	  

	  var cssomPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : []);
	  ModernizrProto._cssomPrefixes = cssomPrefixes;
	  

	  /**
	   * List of JavaScript DOM values used for tests
	   *
	   * @memberof Modernizr
	   * @name Modernizr._domPrefixes
	   * @optionName Modernizr._domPrefixes
	   * @optionProp domPrefixes
	   * @access public
	   * @example
	   *
	   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
	   * than kebab-case properties, all properties are their Capitalized variant
	   *
	   * ```js
	   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
	   * ```
	   */

	  var domPrefixes = (ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : []);
	  ModernizrProto._domPrefixes = domPrefixes;
	  


	  /**
	   * contains checks to see if a string contains another string
	   *
	   * @access private
	   * @function contains
	   * @param {string} str - The string we want to check for substrings
	   * @param {string} substr - The substring we want to search the first string for
	   * @returns {boolean}
	   */

	  function contains(str, substr) {
	    return !!~('' + str).indexOf(substr);
	  }

	  ;

	  /**
	   * cssToDOM takes a kebab-case string and converts it to camelCase
	   * e.g. box-sizing -> boxSizing
	   *
	   * @access private
	   * @function cssToDOM
	   * @param {string} name - String name of kebab-case prop we want to convert
	   * @returns {string} The camelCase version of the supplied name
	   */

	  function cssToDOM(name) {
	    return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
	      return m1 + m2.toUpperCase();
	    }).replace(/^-/, '');
	  }
	  ;

	  /**
	   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
	   *
	   * @access private
	   * @function fnBind
	   * @param {function} fn - a function you want to change `this` reference to
	   * @param {object} that - the `this` you want to call the function with
	   * @returns {function} The wrapped version of the supplied function
	   */

	  function fnBind(fn, that) {
	    return function() {
	      return fn.apply(that, arguments);
	    };
	  }

	  ;

	  /**
	   * testDOMProps is a generic DOM property test; if a browser supports
	   *   a certain property, it won't return undefined for it.
	   *
	   * @access private
	   * @function testDOMProps
	   * @param {array.<string>} props - An array of properties to test for
	   * @param {object} obj - An object or Element you want to use to test the parameters again
	   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
	   */
	  function testDOMProps(props, obj, elem) {
	    var item;

	    for (var i in props) {
	      if (props[i] in obj) {

	        // return the property name as a string
	        if (elem === false) {
	          return props[i];
	        }

	        item = obj[props[i]];

	        // let's bind a function
	        if (is(item, 'function')) {
	          // bind to obj unless overriden
	          return fnBind(item, elem || obj);
	        }

	        // return the unbound function or obj or value
	        return item;
	      }
	    }
	    return false;
	  }

	  ;

	  /**
	   * Create our "modernizr" element that we do most feature tests on.
	   *
	   * @access private
	   */

	  var modElem = {
	    elem: createElement('modernizr')
	  };

	  // Clean up this element
	  Modernizr._q.push(function() {
	    delete modElem.elem;
	  });

	  

	  var mStyle = {
	    style: modElem.elem.style
	  };

	  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
	  // the front of the queue.
	  Modernizr._q.unshift(function() {
	    delete mStyle.style;
	  });

	  

	  /**
	   * domToCSS takes a camelCase string and converts it to kebab-case
	   * e.g. boxSizing -> box-sizing
	   *
	   * @access private
	   * @function domToCSS
	   * @param {string} name - String name of camelCase prop we want to convert
	   * @returns {string} The kebab-case version of the supplied name
	   */

	  function domToCSS(name) {
	    return name.replace(/([A-Z])/g, function(str, m1) {
	      return '-' + m1.toLowerCase();
	    }).replace(/^ms-/, '-ms-');
	  }
	  ;

	  /**
	   * getBody returns the body of a document, or an element that can stand in for
	   * the body if a real body does not exist
	   *
	   * @access private
	   * @function getBody
	   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
	   * artificially created element that stands in for the body
	   */

	  function getBody() {
	    // After page load injecting a fake body doesn't work so check if body exists
	    var body = document.body;

	    if (!body) {
	      // Can't use the real body create a fake one.
	      body = createElement(isSVG ? 'svg' : 'body');
	      body.fake = true;
	    }

	    return body;
	  }

	  ;

	  /**
	   * injectElementWithStyles injects an element with style element and some CSS rules
	   *
	   * @access private
	   * @function injectElementWithStyles
	   * @param {string} rule - String representing a css rule
	   * @param {function} callback - A function that is used to test the injected element
	   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	   * @returns {boolean}
	   */

	  function injectElementWithStyles(rule, callback, nodes, testnames) {
	    var mod = 'modernizr';
	    var style;
	    var ret;
	    var node;
	    var docOverflow;
	    var div = createElement('div');
	    var body = getBody();

	    if (parseInt(nodes, 10)) {
	      // In order not to give false positives we create a node for each test
	      // This also allows the method to scale for unspecified uses
	      while (nodes--) {
	        node = createElement('div');
	        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
	        div.appendChild(node);
	      }
	    }

	    style = createElement('style');
	    style.type = 'text/css';
	    style.id = 's' + mod;

	    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
	    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
	    (!body.fake ? div : body).appendChild(style);
	    body.appendChild(div);

	    if (style.styleSheet) {
	      style.styleSheet.cssText = rule;
	    } else {
	      style.appendChild(document.createTextNode(rule));
	    }
	    div.id = mod;

	    if (body.fake) {
	      //avoid crashing IE8, if background image is used
	      body.style.background = '';
	      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
	      body.style.overflow = 'hidden';
	      docOverflow = docElement.style.overflow;
	      docElement.style.overflow = 'hidden';
	      docElement.appendChild(body);
	    }

	    ret = callback(div, rule);
	    // If this is done after page load we don't want to remove the body so check if body exists
	    if (body.fake) {
	      body.parentNode.removeChild(body);
	      docElement.style.overflow = docOverflow;
	      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
	      docElement.offsetHeight;
	    } else {
	      div.parentNode.removeChild(div);
	    }

	    return !!ret;

	  }

	  ;

	  /**
	   * nativeTestProps allows for us to use native feature detection functionality if available.
	   * some prefixed form, or false, in the case of an unsupported rule
	   *
	   * @access private
	   * @function nativeTestProps
	   * @param {array} props - An array of property names
	   * @param {string} value - A string representing the value we want to check via @supports
	   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
	   */

	  // Accepts a list of property names and a single value
	  // Returns `undefined` if native detection not available
	  function nativeTestProps(props, value) {
	    var i = props.length;
	    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
	    if ('CSS' in window && 'supports' in window.CSS) {
	      // Try every prefixed variant of the property
	      while (i--) {
	        if (window.CSS.supports(domToCSS(props[i]), value)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    // Otherwise fall back to at-rule (for Opera 12.x)
	    else if ('CSSSupportsRule' in window) {
	      // Build a condition string for every prefixed variant
	      var conditionText = [];
	      while (i--) {
	        conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
	      }
	      conditionText = conditionText.join(' or ');
	      return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function(node) {
	        return getComputedStyle(node, null).position == 'absolute';
	      });
	    }
	    return undefined;
	  }
	  ;

	  // testProps is a generic CSS / DOM property test.

	  // In testing support for a given CSS property, it's legit to test:
	  //    `elem.style[styleName] !== undefined`
	  // If the property is supported it will return an empty string,
	  // if unsupported it will return undefined.

	  // We'll take advantage of this quick test and skip setting a style
	  // on our modernizr element, but instead just testing undefined vs
	  // empty string.

	  // Property names can be provided in either camelCase or kebab-case.

	  function testProps(props, prefixed, value, skipValueTest) {
	    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

	    // Try native detect first
	    if (!is(value, 'undefined')) {
	      var result = nativeTestProps(props, value);
	      if (!is(result, 'undefined')) {
	        return result;
	      }
	    }

	    // Otherwise do it properly
	    var afterInit, i, propsLength, prop, before;

	    // If we don't have a style element, that means we're running async or after
	    // the core tests, so we'll need to create our own elements to use

	    // inside of an SVG element, in certain browsers, the `style` element is only
	    // defined for valid tags. Therefore, if `modernizr` does not have one, we
	    // fall back to a less used element and hope for the best.
	    var elems = ['modernizr', 'tspan'];
	    while (!mStyle.style) {
	      afterInit = true;
	      mStyle.modElem = createElement(elems.shift());
	      mStyle.style = mStyle.modElem.style;
	    }

	    // Delete the objects if we created them.
	    function cleanElems() {
	      if (afterInit) {
	        delete mStyle.style;
	        delete mStyle.modElem;
	      }
	    }

	    propsLength = props.length;
	    for (i = 0; i < propsLength; i++) {
	      prop = props[i];
	      before = mStyle.style[prop];

	      if (contains(prop, '-')) {
	        prop = cssToDOM(prop);
	      }

	      if (mStyle.style[prop] !== undefined) {

	        // If value to test has been passed in, do a set-and-check test.
	        // 0 (integer) is a valid property value, so check that `value` isn't
	        // undefined, rather than just checking it's truthy.
	        if (!skipValueTest && !is(value, 'undefined')) {

	          // Needs a try catch block because of old IE. This is slow, but will
	          // be avoided in most cases because `skipValueTest` will be used.
	          try {
	            mStyle.style[prop] = value;
	          } catch (e) {}

	          // If the property value has changed, we assume the value used is
	          // supported. If `value` is empty string, it'll fail here (because
	          // it hasn't changed), which matches how browsers have implemented
	          // CSS.supports()
	          if (mStyle.style[prop] != before) {
	            cleanElems();
	            return prefixed == 'pfx' ? prop : true;
	          }
	        }
	        // Otherwise just return true, or the property name if this is a
	        // `prefixed()` call
	        else {
	          cleanElems();
	          return prefixed == 'pfx' ? prop : true;
	        }
	      }
	    }
	    cleanElems();
	    return false;
	  }

	  ;

	  /**
	   * testPropsAll tests a list of DOM properties we want to check against.
	   * We specify literally ALL possible (known and/or likely) properties on
	   * the element including the non-vendor prefixed one, for forward-
	   * compatibility.
	   *
	   * @access private
	   * @function testPropsAll
	   * @param {string} prop - A string of the property to test for
	   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
	   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
	   * @param {string} [value] - A string of a css value
	   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
	   */
	  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

	    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
	    props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

	    // did they call .prefixed('boxSizing') or are we just testing a prop?
	    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
	      return testProps(props, prefixed, value, skipValueTest);

	      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
	    } else {
	      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
	      return testDOMProps(props, prefixed, elem);
	    }
	  }

	  // Modernizr.testAllProps() investigates whether a given style property,
	  // or any of its vendor-prefixed variants, is recognized
	  //
	  // Note that the property names must be provided in the camelCase variant.
	  // Modernizr.testAllProps('boxSizing')
	  ModernizrProto.testAllProps = testPropsAll;

	  

	  /**
	   * testAllProps determines whether a given CSS property is supported in the browser
	   *
	   * @memberof Modernizr
	   * @name Modernizr.testAllProps
	   * @optionName Modernizr.testAllProps()
	   * @optionProp testAllProps
	   * @access public
	   * @function testAllProps
	   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
	   * @param {string} [value] - String of the value to test
	   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
	   * @example
	   *
	   * testAllProps determines whether a given CSS property, in some prefixed form,
	   * is supported by the browser.
	   *
	   * ```js
	   * testAllProps('boxSizing')  // true
	   * ```
	   *
	   * It can optionally be given a CSS value in string form to test if a property
	   * value is valid
	   *
	   * ```js
	   * testAllProps('display', 'block') // true
	   * testAllProps('display', 'penguin') // false
	   * ```
	   *
	   * A boolean can be passed as a third parameter to skip the value check when
	   * native detection (@supports) isn't available.
	   *
	   * ```js
	   * testAllProps('shapeOutside', 'content-box', true);
	   * ```
	   */

	  function testAllProps(prop, value, skipValueTest) {
	    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
	  }
	  ModernizrProto.testAllProps = testAllProps;
	  
	/*!
	{
	  "name": "CSS Animations",
	  "property": "cssanimations",
	  "caniuse": "css-animation",
	  "polyfills": ["transformie", "csssandpaper"],
	  "tags": ["css"],
	  "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
	  "notes": [{
	    "name" : "Article: 'Dispelling the Android CSS animation myths'",
	    "href": "https://goo.gl/OGw5Gm"
	  }]
	}
	!*/
	/* DOC
	Detects whether or not elements can be animated using CSS
	*/

	  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));

	/*!
	{
	  "name": "CSS Transitions",
	  "property": "csstransitions",
	  "caniuse": "css-transitions",
	  "tags": ["css"]
	}
	!*/

	  Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));


	  // Run each test
	  testRunner();

	  // Remove the "no-js" class if it exists
	  setClasses(classes);

	  delete ModernizrProto.addTest;
	  delete ModernizrProto.addAsyncTest;

	  // Run the things that are supposed to run after the tests
	  for (var i = 0; i < Modernizr._q.length; i++) {
	    Modernizr._q[i]();
	  }

	  // Leak Modernizr namespace
	  window.Modernizr = Modernizr;


	;

	})(window, document);

/***/ },

/***/ 169:
/*!*********************************************!*\
  !*** ./vendors/progress.js/src/progress.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Progress.js v0.1.0
	 * https://github.com/usablica/progress.js
	 * MIT licensed
	 *
	 * Copyright (C) 2013 usabli.ca - Afshin Mehrabani (@afshinmeh)
	 */

	(function (root, factory) {
	  if (true) {
	    // CommonJS
	    factory(exports);
	  } else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
	    define(['exports'], factory);
	  } else {
	    // Browser globals
	    factory(root);
	  }
	} (this, function (exports) {
	  //Default config/variables
	  var VERSION = '0.1.0';

	  /**
	   * ProgressJs main class
	   *
	   * @class ProgressJs
	   */
	  function ProgressJs(obj) {

	    if (typeof obj.length != 'undefined') {
	      this._targetElement = obj; 
	    } else {
	      this._targetElement = [obj];
	    }

	    if (typeof window._progressjsId === 'undefined')
	      window._progressjsId = 1;

	    if (typeof window._progressjsIntervals === 'undefined') 
	      window._progressjsIntervals = {};

	    this._options = {
	      //progress bar theme
	      theme: 'blue',
	      //overlay mode makes an overlay layer in the target element
	      overlayMode: false,
	      //to consider CSS3 transitions in events
	      considerTransition: true
	    };
	  }

	  /**
	   * Start progress for specific element(s)
	   *
	   * @api private
	   * @method _createContainer 
	   */
	  function _startProgress() {

	    //call onBeforeStart callback
	    if (typeof this._onBeforeStartCallback != 'undefined') {
	      this._onBeforeStartCallback.call(this);
	    }

	    //create the container for progress bar
	    _createContainer.call(this);

	    for (var i = 0, elmsLength = this._targetElement.length; i < elmsLength; i++) {
	      _setProgress.call(this, this._targetElement[i]);
	    }
	  }

	  /**
	   * Set progress bar for specific element
	   *
	   * @api private
	   * @method _setProgress
	   * @param {Object} targetElement
	   */
	  function _setProgress(targetElement) {
	    
	    //if the target element already as `data-progressjs`, ignore the init
	    if (targetElement.hasAttribute("data-progressjs"))
	      return;

	    //get target element position
	    var targetElementOffset = _getOffset.call(this, targetElement);

	    targetElement.setAttribute("data-progressjs", window._progressjsId);
	    
	    var progressElementContainer = document.createElement('div');
	    progressElementContainer.className = 'progressjs-progress progressjs-theme-' + this._options.theme;


	    //set the position percent elements, it depends on targetElement tag
	    if (targetElement.tagName.toLowerCase() === 'body') {
	      progressElementContainer.style.position = 'fixed';
	    } else {
	      progressElementContainer.style.position = 'absolute';
	    }

	    progressElementContainer.setAttribute("data-progressjs", window._progressjsId);
	    var progressElement = document.createElement("div");
	    progressElement.className = "progressjs-inner";

	    //create an element for current percent of progress bar
	    var progressPercentElement = document.createElement('div');
	    progressPercentElement.className = "progressjs-percent";
	    progressPercentElement.innerHTML = "1%";

	    progressElement.appendChild(progressPercentElement);
	    
	    if (this._options.overlayMode && targetElement.tagName.toLowerCase() === 'body') {
	      //if we have `body` for target element and also overlay mode is enable, we should use a different
	      //position for progress bar container element
	      progressElementContainer.style.left   = 0;
	      progressElementContainer.style.right  = 0;
	      progressElementContainer.style.top    = 0;
	      progressElementContainer.style.bottom = 0;
	    } else {
	      //set progress bar container size and offset
	      progressElementContainer.style.left  = targetElementOffset.left + 'px';
	      progressElementContainer.style.top   = targetElementOffset.top + 'px';
	      //if targetElement is body set to percent so it scales with browser resize
	      if (targetElement.nodeName == 'BODY') {
	        progressElementContainer.style.width = '100%';
	      } else {
	        progressElementContainer.style.width = targetElementOffset.width + 'px';
	      }

	      if (this._options.overlayMode) {
	        progressElementContainer.style.height = targetElementOffset.height + 'px';
	      }
	    }

	    progressElementContainer.appendChild(progressElement);

	    //append the element to container
	    var container = document.querySelector('.progressjs-container');
	    container.appendChild(progressElementContainer);

	    _setPercentFor(targetElement, 1);

	    //and increase the progressId
	    ++window._progressjsId;
	  }

	  /**
	   * Set percent for all elements
	   *
	   * @api private
	   * @method _setPercent
	   * @param {Number} percent
	   */
	  function _setPercent(percent) {
	    for (var i = 0, elmsLength = this._targetElement.length; i < elmsLength; i++) {
	      _setPercentFor.call(this, this._targetElement[i], percent);
	    }
	  }

	  /**
	   * Set percent for specific element
	   *
	   * @api private
	   * @method _setPercentFor
	   * @param {Object} targetElement
	   * @param {Number} percent
	   */
	  function _setPercentFor(targetElement, percent) {
	    var self = this;
	    
	    //prevent overflow!
	    if (percent >= 100)
	      percent = 100;

	    if (targetElement.hasAttribute("data-progressjs")) {
	      //setTimeout for better CSS3 animation applying in some cases
	      setTimeout(function() {

	        //call the onprogress callback
	        if (typeof self._onProgressCallback != 'undefined') {
	          self._onProgressCallback.call(self, targetElement, percent);
	        }

	        var percentElement = _getPercentElement(targetElement);
	        percentElement.style.width = parseInt(percent) + '%';

	        var percentElement  = percentElement.querySelector(".progressjs-percent");
	        var existingPercent = parseInt(percentElement.innerHTML.replace('%', ''));

	        //start increase/decrease the percent element with animation
	        (function(percentElement, existingPercent, currentPercent) {

	          var increasement = true;
	          if (existingPercent > currentPercent) {
	            increasement = false;
	          }
	          
	          var intervalIn = 10;
	          function changePercentTimer(percentElement, existingPercent, currentPercent) {
	            //calculate the distance between two percents
	            var distance = Math.abs(existingPercent - currentPercent);
	            if (distance < 3) {
	              intervalIn = 30;
	            } else if (distance < 20) {
	              intervalIn = 20;
	            } else {
	              intervanIn = 1;
	            }

	            if ((existingPercent - currentPercent) != 0) {
	              //set the percent
	              percentElement.innerHTML = (increasement ? (++existingPercent) : (--existingPercent)) + '%';
	              setTimeout(function() { changePercentTimer(percentElement, existingPercent, currentPercent); }, intervalIn);
	            }
	          }
	          
	          changePercentTimer(percentElement, existingPercent, currentPercent);
	          
	        })(percentElement, existingPercent, parseInt(percent));
	        
	      }, 50);
	    }
	  }

	  /**
	   * Get the progress bar element 
	   *
	   * @api private
	   * @method _getPercentElement
	   * @param {Object} targetElement
	   */
	  function _getPercentElement(targetElement) {
	    var progressjsId = parseInt(targetElement.getAttribute('data-progressjs'));
	    return document.querySelector('.progressjs-container > .progressjs-progress[data-progressjs="' + progressjsId + '"] > .progressjs-inner');  
	  }

	  /**
	   * Auto increase the progress bar every X milliseconds
	   *
	   * @api private
	   * @method _autoIncrease
	   * @param {Number} size
	   * @param {Number} millisecond
	   */
	  function _autoIncrease(size, millisecond) {
	    var self = this;

	    var target = this._targetElement[0];
	    if(!target) return;
	    var progressjsId = parseInt(target.getAttribute('data-progressjs'));
	    
	    if (typeof window._progressjsIntervals[progressjsId] != 'undefined') {
	      clearInterval(window._progressjsIntervals[progressjsId]);
	    }
	    window._progressjsIntervals[progressjsId] = setInterval(function() {
	      _increasePercent.call(self, size);
	    }, millisecond);
	  }

	  /**
	   * Increase the size of progress bar
	   *
	   * @api private
	   * @method _increasePercent
	   * @param {Number} size
	   */
	  function _increasePercent(size) {
	    for (var i = 0, elmsLength = this._targetElement.length; i < elmsLength; i++) {
	      var currentElement = this._targetElement[i];
	      if (currentElement.hasAttribute('data-progressjs')) {
	        var percentElement  = _getPercentElement(currentElement);
	        var existingPercent = parseInt(percentElement.style.width.replace('%', ''));
	        if (existingPercent) {
	          _setPercentFor.call(this, currentElement, existingPercent + (size || 1));
	        }
	      }
	    }
	  }

	  /**
	   * Close and remove progress bar 
	   *
	   * @api private
	   * @method _end
	   */
	  function _end() {

	    //call onBeforeEnd callback
	    if (typeof this._onBeforeEndCallback != 'undefined') {
	      if (this._options.considerTransition === true) {
	        //we can safety assume that all layers would be the same, so `this._targetElement[0]` is the same as `this._targetElement[1]`
	        _getPercentElement(this._targetElement[0]).addEventListener(whichTransitionEvent(), this._onBeforeEndCallback, false);
	      } else {
	        this._onBeforeEndCallback.call(this);
	      }
	    }

	    var target = this._targetElement[0];
	    if(!target) return;
	    var progressjsId = parseInt(target.getAttribute('data-progressjs'));
	    
	    for (var i = 0, elmsLength = this._targetElement.length; i < elmsLength; i++) {
	      var currentElement = this._targetElement[i];
	      var percentElement = _getPercentElement(currentElement);

	      if (!percentElement)
	        return;

	      var existingPercent = parseInt(percentElement.style.width.replace('%', ''));
	      
	      var timeoutSec = 1;
	      if (existingPercent < 100) {
	        _setPercentFor.call(this, currentElement, 100);
	        timeoutSec = 500;
	      }

	      //I believe I should handle this situation with eventListener and `transitionend` event but I'm not sure
	      //about compatibility with IEs. Should be fixed in further versions.
	      (function(percentElement, currentElement) {
	        setTimeout(function() {
	          percentElement.parentNode.className += " progressjs-end";

	          setTimeout(function() {
	            //remove the percent element from page
	            percentElement.parentNode.parentNode.removeChild(percentElement.parentNode);
	            //and remove the attribute
	            currentElement.removeAttribute("data-progressjs");
	          }, 1000);
	        }, timeoutSec);
	      })(percentElement, currentElement);
	    }

	    //clean the setInterval for autoIncrease function
	    if (window._progressjsIntervals[progressjsId]) {
	      //`delete` keyword has some problems in IE
	      try {
	        clearInterval(window._progressjsIntervals[progressjsId]);
	        window._progressjsIntervals[progressjsId] = null;
	        delete window._progressjsIntervals[progressjsId];
	      } catch(ex) { }
	    }
	  }

	  /**
	   * Remove progress bar without finishing
	   *
	   * @api private
	   * @method _kill
	   */
	  function _kill() {
	    var target = this._targetElement[0];
	    if(!target) return;
	    var progressjsId = parseInt(target.getAttribute('data-progressjs'));

	    for (var i = 0, elmsLength = this._targetElement.length; i < elmsLength; i++) {
	      var currentElement = this._targetElement[i];
	      var percentElement = _getPercentElement(currentElement);

	      if (!percentElement)
	        return;

	      //I believe I should handle this situation with eventListener and `transitionend` event but I'm not sure
	      //about compatibility with IEs. Should be fixed in further versions.
	      (function(percentElement, currentElement) {
	        percentElement.parentNode.className += " progressjs-end";

	        setTimeout(function() {
	          //remove the percent element from page
	          percentElement.parentNode.parentNode.removeChild(percentElement.parentNode);
	          //and remove the attribute
	          currentElement.removeAttribute("data-progressjs");
	        }, 1000);
	      })(percentElement, currentElement);
	    }

	    //clean the setInterval for autoIncrease function
	    if (window._progressjsIntervals[progressjsId]) {
	      //`delete` keyword has some problems in IE
	      try {
	        clearInterval(window._progressjsIntervals[progressjsId]);
	        window._progressjsIntervals[progressjsId] = null;
	        delete window._progressjsIntervals[progressjsId];
	      } catch(ex) { }
	    }
	  }

	  /**
	   * Create the progress bar container
	   *
	   * @api private
	   * @method _createContainer
	   */
	  function _createContainer() {
	    //first check if we have an container already, we don't need to create it again
	    if (!document.querySelector(".progressjs-container")) {
	      var containerElement = document.createElement("div");
	      containerElement.className = "progressjs-container";
	      document.body.appendChild(containerElement);
	    }
	  }

	  /**
	   * Get an element position on the page
	   * Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
	   *
	   * @api private
	   * @method _getOffset
	   * @param {Object} element
	   * @returns Element's position info
	   */
	  function _getOffset(element) {
	    var elementPosition = {};

	    if (element.tagName.toLowerCase() === 'body') {
	      //set width
	      elementPosition.width = element.clientWidth;
	      //set height
	      elementPosition.height = element.clientHeight;
	    } else {
	      //set width
	      elementPosition.width = element.offsetWidth;
	      //set height
	      elementPosition.height = element.offsetHeight;
	    }

	    //calculate element top and left
	    var _x = 0;
	    var _y = 0;
	    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
	      _x += element.offsetLeft;
	      _y += element.offsetTop;
	      element = element.offsetParent;
	    }
	    //set top
	    elementPosition.top = _y;
	    //set left
	    elementPosition.left = _x;

	    return elementPosition;
	  }

	  /**
	   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
	   * via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
	   *
	   * @param obj1
	   * @param obj2
	   * @returns obj3 a new object based on obj1 and obj2
	   */
	  function _mergeOptions(obj1, obj2) {
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	  }

	  var progressJs = function (targetElm) {
	    if (typeof (targetElm) === 'object') {
	      //Ok, create a new instance
	      return new ProgressJs(targetElm);

	    } else if (typeof (targetElm) === 'string') {
	      //select the target element with query selector
	      var targetElement = document.querySelectorAll(targetElm);
	       
	      if (targetElement) {
	        return new ProgressJs(targetElement);
	      } else {
	        throw new Error('There is no element with given selector.');
	      }
	    } else {
	      return new ProgressJs(document.body);
	    }
	  };

	  /**
	   * Get correct transition callback
	   * Thanks @webinista: http://stackoverflow.com/a/9090128/375966
	   *
	   * @returns transition name
	   */
	  function whichTransitionEvent() {
	    var t;
	    var el = document.createElement('fakeelement');
	    var transitions = {
	      'transition': 'transitionend',
	      'OTransition': 'oTransitionEnd',
	      'MozTransition': 'transitionend',
	      'WebkitTransition': 'webkitTransitionEnd'
	    }

	    for (t in transitions) {
	      if (el.style[t] !== undefined) {
	        return transitions[t];
	      }
	    }
	  }

	  /**
	   * Current ProgressJs version
	   *
	   * @property version
	   * @type String
	   */
	  progressJs.version = VERSION;

	  //Prototype
	  progressJs.fn = ProgressJs.prototype = {
	    clone: function () {
	      return new ProgressJs(this);
	    },
	    setOption: function(option, value) {
	      this._options[option] = value;
	      return this;
	    },
	    setOptions: function(options) {
	      this._options = _mergeOptions(this._options, options);
	      return this;
	    },
	    start: function() {
	      _startProgress.call(this);
	      return this;
	    },
	    set: function(percent) {
	      _setPercent.call(this, percent);
	      return this;
	    },
	    increase: function(size) {
	      _increasePercent.call(this, size);
	      return this;
	    },
	    autoIncrease: function(size, millisecond) {
	      _autoIncrease.call(this, size, millisecond);
	      return this;
	    },
	    end: function() {
	      _end.call(this);
	      return this;
	    },
	    kill: function() {
	      _kill.call(this);
	      return this;
	    },
	    onbeforeend: function(providedCallback) {
	      if (typeof (providedCallback) === 'function') {
	        this._onBeforeEndCallback = providedCallback;
	      } else {
	        throw new Error('Provided callback for onbeforeend was not a function');
	      }
	      return this;
	    },
	    onbeforestart: function(providedCallback) {
	      if (typeof (providedCallback) === 'function') {
	        this._onBeforeStartCallback = providedCallback;
	      } else {
	        throw new Error('Provided callback for onbeforestart was not a function');
	      }
	      return this;
	    },
	    onprogress: function(providedCallback) {
	      if (typeof (providedCallback) === 'function') {
	        this._onProgressCallback = providedCallback;
	      } else {
	        throw new Error('Provided callback for onprogress was not a function');
	      }
	      return this;
	    }
	  };

	  exports.progressJs = progressJs;
	  return progressJs;
	}));


/***/ }

/******/ });