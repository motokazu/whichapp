// Item View

define(["jquery","backbone","jqserialize"], function($, Backbone){
	var EditItemView = Backbone.View.extend({
		el : "#additem form",
		events : {
			"click .save" : "save"
		},
		initialize: function(options){
			this.model.on('invalid', this.showErrors, this);
			
			this.$el.find("input").val("");
			this.$el.find("textarea").val("");
			
			this.$el.find('input:first').focus();
			this.gid = options.gid;
			this.$(".error").hide();
			$(this.el).undelegate('.save', 'click');
		},
		showErrors : function(model, errors){
			var that = this;
			$.each(errors, function(i, err){
				var elem = that.$(".error." + err.key);
				elem.text(err.msg);
				elem.show();
			});
		},
		save : function(){
			this.$(".error").hide();
			
			var j = this.$el.serializeObject();
			j.gid = this.gid; // graph id
			
			if (this.model.save(j)){
				$(this.el).undelegate('.save', 'click');
				
				window.history.back();
			}
		},
		render : function(){
			this.$el.deserializeObject(this.model.toJSON());
			return this;
		}
	});
	return EditItemView;
});