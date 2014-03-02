// require.js configuration
require.config({
	// aliases
	paths: {
		"jquery" : "libs/jquery-2.0.3.min",
		"jqm" : "libs/jquery.mobile-1.4.0.min",
		"jqserialize": "libs/jquery.serialize",
		"underscore" : "libs/underscore-min",
		"backbone" : "libs/backbone-min",
		"fastclick": "libs/fastclick",
		"d3" : "libs/d3.v3.min",
		"localstorage": "libs/backbone.localStorage-min"
	},
	// AMD
	shim: {
		"backbone" : {
			"deps": ["underscore", "jquery"], 
			"exports":"Backbone" // attaches "Backbone" to the window object
		},
		"d3" : {
			"exports":"d3"
		},
		"jqserialize": {
			"deps": ["jquery"],
			"exports":"jQuery"
		}
	}
});

// File Dependencies
require(["jquery", "backbone", "fastclick", "router"], function($,Backbone,FastClick,Router) {
	$( document ).on( "mobileinit", 
	// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
		}
	);
	
	require(["jqm"], function(){
		// Instantiates a new Backbone.js Mobile Router
		this.router = new Router();
	});
	
	// Fast Click
	FastClick.attach(document.body);
});
