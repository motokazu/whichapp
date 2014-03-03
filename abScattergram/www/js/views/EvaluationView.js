// Evaluation View

define(["jquery", "backbone"], function($, Backbone){
	var EvaluationView = Backbone.View.extend({
		el : "#evaluate",
		events : {
			"click .firstitem" : "winA",
			"click .seconditem" : "winB"
		},
		initialize: function(options){
			this.evaluation = undefined;
			this.itemCollection = options.itemCollection;
			this.collectionX = options.collectionX;
			this.collectionY = options.collectionY;
			$(this.el).undelegate('.firstitem', 'click');
			$(this.el).undelegate('.seconditem', 'click');
			
			// clear textfield
			this.$(".evaluation-axis").text("XXX");
			this.$(".firstitem").text("A");
			this.$(".seconditem").text("B");
			// reset counter
			var eXc = this.collectionX.where({win: undefined});
			var eYc = this.collectionY.where({win: undefined});
			var numofitems = eXc.length + eYc.length;
			this.$(".remain").text(numofitems);
			this.$(".total").text(numofitems);
		},
		winA : function(){
			var e = this.evaluation.data;
			var axis = this.evaluation.axis;
			
			e.set('win', 'a');
			
			var itema = this.itemCollection.get(e.get('a'));
			var itemb = this.itemCollection.get(e.get('b'));
			
			itema.set(axis, itema.get(axis) + 0.1);
			itemb.set(axis, itemb.get(axis) - 0.1);
			
			e.save();
			itema.save();
			itemb.save();
			
			this.getNextItem();
		},
		winB : function(){
			var e = this.evaluation.data;
			var axis = this.evaluation.axis;
		
			e.set('win', 'b');
			
			var itema = this.itemCollection.get(e.get('a'));
			var itemb = this.itemCollection.get(e.get('b'));
			
			itema.set(axis, itema.get(axis) - 0.1);
			itemb.set(axis, itemb.get(axis) + 0.1);
			
			e.save();
			itema.save();
			itemb.save();
			
			this.getNextItem();
		},
		getNextItem : function(){
			var eXc = this.collectionX.where({win: undefined});
			var eYc = this.collectionY.where({win: undefined});
			if(eXc.length > 0 || eYc.length > 0){
				this.render();
			} else {
				function alertDismissed() {
					window.history.back();
				}
				navigator.notification.alert(
				    'Evaluation Completed.',  // message
				    alertDismissed,         // callback
				    'Message',                // title
				    'Back to Graph'                  // buttonName
				);
			}
		},
		render : function(){
			this.$(".graphname").text(this.model.get('title'));
			
			var eXc = this.collectionX.where({win: undefined});
			var eYc = this.collectionY.where({win: undefined});
			if(eXc.length > 0 || eYc.length > 0){
				var numofitems = eXc.length + eYc.length;
				this.$(".remain").text(numofitems);
				
				var eX = this.collectionX.findWhere({win: undefined});
				var eY = this.collectionY.findWhere({win: undefined});
				
				var e = eX ? eX : eY;
				
				this.evaluation = {
					data : e,
					axis : eX ? 'x' : 'y'
				};
				
				var eaxis = this.model.get('axis' + this.evaluation.axis);
				this.$(".evaluation-axis").text(eaxis);
				
				var itema = this.itemCollection.get(e.get('a'));
				var itemb = this.itemCollection.get(e.get('b'));
				
				this.$(".firstitem").text(itema.get('title'));
				this.$(".seconditem").text(itemb.get('title'));
				
			} else {
				function alertDismissed() {
					window.history.back();
				}
				navigator.notification.alert(
				    'No Evaluation Items',  // message
				    alertDismissed,         // callback
				    'Error',                // title
				    'Back to Graph'                  // buttonName
				);
			}
			
			return this;
		}
	});
	
	return EvaluationView;
});