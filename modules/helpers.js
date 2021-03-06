//////////////////////////////////////////////////////////////////////////////80
// Atheos Specific Helper functions
//////////////////////////////////////////////////////////////////////////////80
// Copyright (c) Atheos & Liam Siira (Atheos.io), distributed as-is and without
// warranty under the modified License: MIT - Hippocratic 1.2: firstdonoharm.dev
// See [root]/license.md for more. This information must remain intact.
//////////////////////////////////////////////////////////////////////////////80
// Notes: 
// This helper module is potentially temporary, but will be used to
// help identify and reduce code repition across the application.
// Think of it like a temporary garbage dump of all functions that
// don't fit within the actual module I found them in.
//
// If any of these become long term solutions, more research will need
// to take place on each function to ensure it does what it says. Most
// of these were just pulled from a google search and kept if they 
// seemed to work.
//												- Liam Siira
//////////////////////////////////////////////////////////////////////////////80


var log = function(m, t) {
	if (t) {
		console.trace(m);
	} else {
		console.log(m);
	}
};

(function(global) {
	'use strict';

	var atheos = global.atheos,
		ajax = global.ajax;



	atheos.helpers = {

		icons: {},
		settings: {},

		init: function(options) {
			console.log('Helpers Initialized');
		},

		file: {
			//////////////////////////////////////////////////////////////////
			// Return the node name (sans path)
			//////////////////////////////////////////////////////////////////

			getShortName: function(path) {
				return path.split('/').pop();
			},

			//////////////////////////////////////////////////////////////////
			// Return extension
			//////////////////////////////////////////////////////////////////

			getExtension: function(path) {
				return path.split('.').pop();
			},
		},

		//////////////////////////////////////////////////////////////////////
		// Extend used in:
		//   Toast.js
		//////////////////////////////////////////////////////////////////////

		extend: function(obj, src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) obj[key] = src[key];
			}
			return obj;
		},

		//////////////////////////////////////////////////////////////////////
		// Trigger used in:
		//   Sidebars.js
		//////////////////////////////////////////////////////////////////////
		trigger: function(selector, event) {
			console.warn('Trigger Helper will be depreciated on next release');
			if (!event || !selector) return;
			var element;
			if (selector.self == window) {
				element = selector;
			} else {
				element = selector.nodeType === Node.ELEMENT_NODE ? selector : document.querySelector(selector);
			}
			if (element) {
				var e;
				if ('createEvent' in document) {
					// modern browsers, IE9+
					e = document.createEvent('HTMLEvents');
					e.initEvent(event, false, true);
					element.dispatchEvent(e);
				} else {
					// IE 8
					e = document.createEventObject();
					e.eventType = event;
					el.fireEvent('on' + e.eventType, e);
				}
			}
		},
		//////////////////////////////////////////////////////////////////////
		// Load Script: Used to add new JS to the page.
		//  Notes: could probably be optimized to cache the scripts nodeArray
		//////////////////////////////////////////////////////////////////////
		loadScript: function(url, arg1, arg2) {
			var cache = true,
				callback = null;

			if (typeof arg1 === 'function') {
				callback = arg1;
				cache = arg2 || cache;
			} else {
				cache = arg1 || cache;
				callback = arg2 || callback;
			}

			var load = true;
			//check all existing script tags in the page for the url
			var scripts = document.getElementsByTagName('script');
			for (var i = 0; i < scripts.length; i++) {
				load = (url !== scripts[i].src);
			}

			if (load) {
				//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
				//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
				
				//didn't find it in the page, so load it
				// jQuery.ajax({
				// 	type: 'GET',
				// 	url: url,
				// 	success: callback,
				// 	dataType: 'script',
				// 	cache: cache
				// });

				// ajax({
				// 	url: url,
				// 	success: function(data) {
				// 		eval(data);
				// 		if (typeof callback === 'function') {
				// 			callback.call(this);
				// 		}
				// 	},
				// });

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = url;
				document.getElementsByTagName('head')[0].appendChild(script);
				if (typeof callback === 'function') {
					callback.call(this);
				}

			} else {
				//already loaded so just call the callback
				if (typeof callback === 'function') {
					callback.call(this);
				}
			}
		}
	};

})(this);