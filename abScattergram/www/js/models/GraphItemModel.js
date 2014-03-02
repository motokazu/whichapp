// Grpah Item Model

define(["jquery","backbone"], function($, Backbone){
	var Model = Backbone.Model.extend({
		defaults : function(){
			return {
				title: "Item Title",
				gid : "",
				x : 0.5,
				y : 0.5
			};
		},
		validate : function(attrs, options){
			var errs = new Array();
			if(_.isEmpty(attrs.title) || _.isUndefined(attrs.title)) {
				errs.push({key:"title",msg:"Title is required."});
			}
			if (errs.length>0){
				return errs;
			}
		}
	});
	return Model;
});