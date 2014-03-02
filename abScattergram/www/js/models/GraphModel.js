// Grpah Model

define(["jquery","backbone"], function($, Backbone){
	var Model = Backbone.Model.extend({
		defaults: function(){
			return {
				title : "GraphTitle"
			};
		},
		validate : function(attrs, options){
			var errs = new Array();
			if(_.isEmpty(attrs.title) || _.isUndefined(attrs.title)) {
				errs.push({key:"title",msg:"Title is required."});
			}
			if(_.isEmpty(attrs.axisx) || _.isUndefined(attrs.axisx)) {
				errs.push({key:"axisx",msg:"Axis X is required."});
			}
			if(_.isEmpty(attrs.axisy) || _.isUndefined(attrs.axisy)) {
				errs.push({key:"axisy",msg:"Axis Y is required."});
			}
			if (errs.length>0){
				return errs;
			}
		}
	});
	return Model;
});