// Settings View

var APPVERSION = 1.0;

define(["jquery", "backbone"], function($, Backbone){

	var SettingsView = Backbone.View.extend({
		el : "#settingsPanel",
		events: {
			"click #showVersion" : "showVersion"
		},
		showVersion : function(){
			alert("Version: " + APPVERSION);
		},
		render: function(){
			return this;
		}
	});
	
	return SettingsView;
});