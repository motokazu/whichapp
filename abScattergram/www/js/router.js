// Router

define(["backbone"], function( Backbone ){
	var Router = Backbone.Router.extend({
		initialize :function(){
			var that = this;
			
			Backbone.history.start();
			
			// back link
			$(document).on('click', '.back', function(e) {
			    e.preventDefault();
			    self.back = true;
			    window.history.back();
			});
			
			// init settings view
			require(["views/SettingsView"], function(SettingsView){
				new SettingsView();
			});
			
			require(["views/GraphsView","collections/GraphCollection"], function(GraphsView,GraphCollection){
				that.GraphCollection = new GraphCollection();
				var graphsView = new GraphsView({
					collection: that.GraphCollection
				});
				graphsView.collection.fetch().done(function(){
					$.mobile.changePage("#graphs", {reverse:false, changeHash:false});					
				});
			});
		},
		routes: {
			"":"home",
			"settings":"settings",
			"graphs":"home",
			"graphs/add": "addgraph",
			"graphs/:id": "graph",
			"graphs/:id/items" : "items",
			"graphs/:id/items/add": "additem",
			"graphs/:id/items/:itemid": "item",
			"graphs/:id/evaluate" : "evaluate"
		},
		home: function(){
			$.mobile.changePage("#graphs", {reverse:false, changeHash:false});	
		},
		settings : function(){
			$("#settingsPanel").panel("open");				
		},
		graph: function(id){
			var that = this;
			require(["views/GraphView"],function(GraphView){
				var graph = that.GraphCollection.get(id);
				var graphView = new GraphView({
					model: graph
				});
				graphView.model.fetch().done(function(){
					$.mobile.changePage("#graph", {reverse:false, changeHash:false});						
				});
			});
		},
		addgraph: function(){
			var that = this;
			require(["views/AddGraphView","models/GraphModel"],function(AddGraphView,GraphModel){
				var model = new GraphModel();
				that.GraphCollection.add(model);
				var addGraphView = new AddGraphView({
					model : model
				});
				$.mobile.changePage("#addgraph",  {reverse:false, changeHash:false});				
			});
		},
		items : function(id){
			var that = this;
			require(["views/ItemsView","collections/GraphItemCollection","collections/ItemEvaluationCollection"],
			function(ItemsView,GraphItemCollection,ItemEvaluationCollection){
				var graph = that.GraphCollection.get(id);
				
				var localStorageKey = graph.get('itemskey');
				var GraphItems = GraphItemCollection.extend({
					localStorage : new Backbone.LocalStorage(localStorageKey)
				});
				that.itemCollection = new GraphItems();
				
				// load evaluation X
				var localStrageEvKeyX = graph.get('evaluationKeyX');
				var EvaluationItemsX = ItemEvaluationCollection.extend({
					localStorage : new Backbone.LocalStorage(localStrageEvKeyX)
				});
				that.evaluationCollectionX = new EvaluationItemsX();
				
				// load evaluation Y
				var localStrageEvKeyY = graph.get('evaluationKeyY');
				var EvaluationItemsY = ItemEvaluationCollection.extend({
					localStorage : new Backbone.LocalStorage(localStrageEvKeyY)
				});
				that.evaluationCollectionY = new EvaluationItemsY();
				
				that.itemCollection.fetch().done(function(){
					that.evaluationCollectionX.fetch().done(function(){
						that.evaluationCollectionY.fetch().done(function(){
							var itemsView = new ItemsView({
								collection : that.itemCollection
							});
							$.mobile.changePage("#items", {reverse:false, changeHash:false});
						});
					});
				});
			})
		},
		item : function(id, itemid){
			var that = this;
			require(["views/EditItemView","models/GraphItemModel"],
			  function(EditItemView,GraphItemModel){
				var model = that.itemCollection.get(itemid);
				if(model){
					var editItemView = new EditItemView({
						gid : id,
						model : model
					});
					editItemView.render();
				
					$.mobile.changePage("#additem", {reverse:false, changeHash:false});
				}
			});
		},
		additem : function(id){
			var that = this;
			require(["views/AddItemView","models/GraphItemModel"],
			  function(AddItemView,GraphItemModel){
				var model = new GraphItemModel();
				that.itemCollection.add(model);
				var addItemView = new AddItemView({
					gid : id,
					model : model,
					itemCollection : that.itemCollection,
					evaluationCollectionX : that.evaluationCollectionX,
					evaluationCollectionY : that.evaluationCollectionY
				});
				
				$.mobile.changePage("#additem", {reverse:false, changeHash:false});
			});
		},
		evaluate : function(id){
			var that = this;
			require(["views/EvaluationView","collections/GraphItemCollection","collections/ItemEvaluationCollection"],
			 function(EvaluationView,GraphItemCollection,ItemEvaluationCollection){
				var graph = that.GraphCollection.get(id);
				var localStorageKey = graph.get('itemskey');
				var GraphItems = GraphItemCollection.extend({
					localStorage : new Backbone.LocalStorage(localStorageKey)
				});
				that.itemCollection = new GraphItems();
				
				// load evaluation X
				var localStrageEvKeyX = graph.get('evaluationKeyX');
				var EvaluationItemsX = ItemEvaluationCollection.extend({
					localStorage : new Backbone.LocalStorage(localStrageEvKeyX)
				});
				that.evaluationCollectionX = new EvaluationItemsX();
				
				// load evaluation Y
				var localStrageEvKeyY = graph.get('evaluationKeyY');
				var EvaluationItemsY = ItemEvaluationCollection.extend({
					localStorage : new Backbone.LocalStorage(localStrageEvKeyY)
				});
				that.evaluationCollectionY = new EvaluationItemsY();
				
				that.evaluationCollectionX.fetch().done(function(){
					that.evaluationCollectionY.fetch().done(function(){
						// load item collection
						that.itemCollection.fetch().done(function(){
							var evaluationView = new EvaluationView({
								gid: id,
								model: graph,
								collectionX : that.evaluationCollectionX,
								collectionY : that.evaluationCollectionY,
								itemCollection: that.itemCollection
							});
							evaluationView.render();
							$.mobile.changePage("#evaluate", {reverse:false, changeHash:false});
						});
					});
				});
			});
		}
	});
	return Router;
});