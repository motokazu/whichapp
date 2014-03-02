// ItemEvaluation Model

define(["jquery","backbone"], function($, Backbone){
	var Model = Backbone.Model.extend({
		defaults: function(){
			return {
				a : "",
				b : "",
				win : undefined
			};
		}
	});
	return Model;
});