// Graph View

define(["jquery", "backbone", "views/ChartView", "views/EvaluationView","collections/GraphItemCollection"],
 function($, Backbone,ChartView,EvaluationView,GraphItemCollection){

	var GraphView = Backbone.View.extend({
		el : "#graph",
		events : {
			"click .evaluate" : "evaluate",
			"click .goitemlist" : "goitemlist",
			"click .edit" : "edit",
			"click .share" : "share"
		},
		initialize: function(){
			this.model.on('change', this.render, this);

			$(this.el).undelegate('.goitemlist', 'click');
			$(this.el).undelegate('.evaluate', 'click');
			$(this.el).undelegate('.edit', 'click');
			$(this.el).undelegate('.share', 'click');
			
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
		},
		evaluate : function(){
			location.href = "#graphs/" + this.model.get('id') + "/evaluate";
		},
		edit : function(){
			location.href = "#graphs/" + this.model.get('id') + "/edit";
		},
		share : function(){
			function alertDismissed() {
				// something to share
			}
			navigator.notification.alert(
			    'Not implemented.',  // message
			    alertDismissed,         // callback
			    'Info',                // title
			    'Close'         // buttonName
			);
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