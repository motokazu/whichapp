// Graph View

define(["jquery", "backbone", "views/ChartView", "views/EvaluationView","collections/GraphItemCollection"],
 function($, Backbone,ChartView,EvaluationView,GraphItemCollection){

	var GraphView = Backbone.View.extend({
		el : "#graph",
		events : {
			"click .evaluate" : "evaluate",
			"click .goitemlist" : "goitemlist"
		},
		initialize: function(){
			this.model.on('change', this.render, this);
			
			var that = this;
			var localStorageKey = this.model.get('itemskey');
			var GraphItems = GraphItemCollection.extend({
				localStorage : new Backbone.LocalStorage(localStorageKey)
			});
			that.itemcollection = new GraphItems();
			
			that.itemcollection.fetch().done(function(){
				that.chartView = new ChartView({
					graphModel : that.model,
					collection : that.itemcollection
				});	
			});
		},
		goitemlist: function(){
			location.href = "#graphs/" + this.model.get('id') + "/items";
			$(this.el).undelegate('.goitemlist', 'click');
		},
		evaluate : function(){
			var that = this;
			// load and change page
			this.evaluateView = new EvaluationView({
				collection: that.itemcollection
			});
			$(this.el).undelegate('.evaluate', 'click');
			location.href = "#graphs/" + this.model.get('id') + "/evaluate";
		},
		render: function(){
			var graph = this.model.toJSON();
			
			this.$(".graphtitle").text(graph.title);
			this.chartView.render();
			
			return this;
		}
	});
    
	return GraphView;
});