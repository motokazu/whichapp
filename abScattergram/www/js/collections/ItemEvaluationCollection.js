// Item Evaluation Collection

define(["jquery","backbone","models/ItemEvaluationModel","localstorage"], function($,Backbone,ItemEvaluation){
	var Collection = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("ItemEvaluationCollection"),
		model: ItemEvaluation
	});
	
	return Collection;
});