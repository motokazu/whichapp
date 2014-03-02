// Chart View

define(["jquery", "backbone", "d3"], function($, Backbone,d3){
	var ChartView = Backbone.View.extend({
		el : "#graph .chart",
		initialize: function(options){
			this.collection.on('add', this.render, this);
			this.model = options.graphModel;
			this.render();
		},
		render: function(){
			this.$el.empty();
			
			// if collection length > 0 , draw graph.
			if (this.collection.length > 0){
				var dataset = this.collection.toJSON();
				
				var svgHeight = 350;
				var padding = 20;
				var svgWidth = $(window).width() - padding;
				var svg = d3.select(".chart")
				    .append("svg")
				    .attr("width", svgWidth)
					.attr("height", svgHeight);
				var xScale = d3.scale.linear()
		                     //.domain([0, d3.max(dataset, function(d) { return d.x; })])
							 .domain([0, 1])
		                     .range([padding, svgWidth - padding]);
				var yScale = d3.scale.linear()
				             //.domain([0, d3.max(dataset, function(d) { return d.y; })])
							 .domain([0, 1])
				             .range([svgHeight - padding, padding]);
			    var rScale = d3.scale.linear()
			                 .domain([0, d3.max(dataset, function(d) { return d.y; })])
			                 .range([2, 5]);
			    var xAxis = d3.svg.axis()
			                 .scale(xScale)
			                 .orient("bottom")
							 .tickFormat("") // 表示ラベルを消す
							 .ticks(0) // ticksを非表示
							 .outerTickSize(0); // domainの両端のtickを消す
			    var yAxis = d3.svg.axis()
			               .scale(yScale)
			               .orient("left")
						   .tickFormat("")
			               .ticks(0)
						   .outerTickSize(0);
						   
				var axisxTitle = this.model.get('axisx');
	 			svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0,"+ (svgHeight/2) + ")")
	 				.call(xAxis)
					.append("text")
					.attr("transform", "translate("+(svgWidth-axisxTitle.length*12 )+",-3)")
					.text(axisxTitle);
			   
			   var axisyTitle = this.model.get('axisy');
			   svg.append("g")
			   		.attr("class", "axis")
					.attr("transform", "translate(" + (svgWidth/2) + ",0)")
			   	 	.call(yAxis)
					.append("text")
					.attr("transform", "translate("+(3-axisyTitle.length/2*20) + ",20)") // + (svgHeight-5) + ")")
					.text(axisyTitle);
			   
			    var chartEnter = svg.selectAll("circle")
			                    .data(dataset)
			                    .enter();
			   
			    chartEnter.append("circle")
				       .attr("cx", function(d) {return xScale(d.x);})
				       .attr("cy", function(d){return yScale(d.y);})
				       .attr("r", function(d) {
							return 3;//rScale(d.y);
						})
						.attr("fill", "yellow")
						.attr("stroke", "orange")
						.attr("stroke-width", function(d) {
						    return 1;
						});
						
						
                chartEnter.append("text")
						.attr("dx", function(d) {
							return xScale(d.x) + 2;
						})
						.attr("dy", function(d){
							return yScale(d.y) - 2;
						})
						.style("font-size", "x-small" )
						.text(function(d){return d.title;});
				
			} else {
				// notice
				this.$el.append("<p>No graph data</p>");
			}

	        return this;
	    }
	});
	
	return ChartView;
});