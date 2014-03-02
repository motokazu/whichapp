// Graph View

define(["jquery", "backbone"], function($, Backbone){

	var GraphList = Backbone.View.extend({
		tagName : 'li',
		template : _.template($("#graph-list-template").html()),
		events :{
			"swipeleft .list" : "showDeleteButton",
			"swiperight .list" : "hideDeleteButton",
			"click .list": "clickList"
		},
		initialize: function(){
			this.model.on('change',this.render,this);
			this.model.on('destroy',this.remove,this);
		},
		clickList : function(){
			this.hideDeleteButton();
		},
		hideDeleteButton: function(){
			this.$(".aDeleteBtn").remove();
		},
		showDeleteButton: function(){
			var that = this;
			this.$(".aDeleteBtn").remove();
			var deleteBtn = $("<button>DEL</button>").attr({
				'class': 'aDeleteBtn ui-btn-up-r'
			});
			deleteBtn.on('click',function(){
				if(confirm("Delete OK?")){
					that.model.destroy();
				} else {
					that.hideDeleteButton();
				}
			});
			this.$el.append(deleteBtn);
		},
		remove: function(){
			$(this.el).remove();
			return this;
		},
		render: function(){
	        $(this.el).html(this.template(this.model.toJSON()));
	        return this;
	    }
	});
	
	var GraphsView = Backbone.View.extend({
		el : "#graphsList",
		initialize: function(){
			this.collection.on('add', this.render, this);
			this.collection.on('change', this.render, this);
		},
		render: function(){
			this.$el.empty();
	        this.collection.each(function(graph){
				if (graph.get('id')) {
		            var view = new GraphList({model:graph});
		            this.$el.append(view.render().el).listview('refresh');
				}
	        }, this);
	        return this;
	    }
	});
	
	return GraphsView;
});