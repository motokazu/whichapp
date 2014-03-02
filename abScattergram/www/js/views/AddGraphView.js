// Graph View

define(["jquery","backbone","jqserialize"], function($, Backbone){
	var AddGraphView = Backbone.View.extend({
		el : "#addgraph form",
		events : {
			"click .add" : "add"
		},
		initialize: function(){
			this.model.on('invalid', this.showErrors, this);
			this.$el.find('input:first').focus();
			this.$(".error").hide();
			$(this.el).undelegate('.add', 'click');
		},
		showErrors : function(model, errors){
			var that = this;
			$.each(errors, function(i, err){
				var elem = that.$(".error." + err.key);
				elem.text(err.msg);
				elem.show();
			});
		},
		add : function(){
			this.$(".error").hide();
			
			var j = this.$el.serializeObject();
			
			// Generate Items Key
			var itemsKey = "Items" + (+new Date());
			j.itemskey = itemsKey;
			
			// evalution keys
			var evaluationKeyX = "EvX"+ (+new Date());
			j.evaluationKeyX = evaluationKeyX;
			var evaluationKeyY = "EvY"+ (+new Date());
			j.evaluationKeyY = evaluationKeyY;
			
			if ( this.model.save(j) ){
				this.$el.find("input").val("");
				$(this.el).undelegate('.add', 'click');
			
				window.history.back();
			}			
		}
	});
	return AddGraphView;
});