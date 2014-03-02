// Graph Item Collection

define(["jquery","backbone","models/GraphModel","localstorage"], function($,Backbone,Graph){
	var Collection = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("GraphCollection"),
		model: Graph
	});
	
	return Collection;
});