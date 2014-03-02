// Graph View

define(["jquery","backbone","jqserialize"], function($, Backbone){
	var EditGraphView = Backbone.View.extend({
		el : "#editgraph form",
		events : {
			"click .update" : "update",
			"click .backprev": "backprev"
		},
		initialize: function(options){
			this.model.on('invalid', this.showErrors, this);
			this.$el.find('input:first').focus();
			this.$(".error").hide();
			$(this.el).undelegate('.update', 'click');
			$(this.el).undelegate('.backprev', 'click');
			
			this.backurl = options.backurl;
			
			this.render();
		},
		showErrors : function(model, errors){
			var that = this;
			$.each(errors, function(i, err){
				var elem = that.$(".error." + err.key);
				elem.text(err.msg);
				elem.show();
			});
		},
		backprev: function(){
			$(this.el).undelegate('.backprev', 'click');
			
			window.history.back();
		},
		update : function(){
			this.$(".error").hide();
			
			var j = this.$el.serializeObject();
						
			if ( this.model.save(j) ){
				this.$el.find("input").val("");
				$(this.el).undelegate('.update', 'click');
				
				window.history.back();
			}
		},
		render : function(){
			this.$el.deserializeObject(this.model.toJSON());
			return this;
		}
	});
	return EditGraphView;
});