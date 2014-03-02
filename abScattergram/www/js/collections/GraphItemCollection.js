// Graph Item Collection

define(["jquery","backbone","models/GraphItemModel","localstorage"], function($,Backbone,GraphItem){
	var localStorageKey = "GraphItem" + (+new Date());
	var Collection = Backbone.Collection.extend({
		localStorage : new Backbone.LocalStorage(localStorageKey),
		model: GraphItem
	});
	
	return Collection;
});