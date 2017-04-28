var width = document.getElementById("assembly1").offsetWidth;
var height = document.getElementById("assembly1").offsetHeight;


var svg = d3.select("#assembly1").append("svg")
    .attr("width", width)
    .attr("height", height);

    var yScaleX = d3.scaleLinear()
        .range([height-75, 0]);

        var yScale = d3.scaleLinear()
            .range([0, height-75]);

    var xScale = d3.scaleLinear()
        .domain([2011, 2016])
        .range([60, (width - 60)]);

        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

function total() {

  svg.selectAll("*").remove();
    d3.csv("year.csv", function(error, data) {
        if (error) throw error;
        yScale.domain([0, d3.max(data, function(d) {
            return d.amount;
        })]);
        yScaleX.domain([0, d3.max(data, function(d) {
            return d.amount;
        })]);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append('rect')
            .attr("y", function(d) {
                return (height - 75) - yScale(d.amount);
            })
            .attr("x", function(d, i) {
                return (i * (((width - 60) / data.length)-10) + 60);
            })
            .attr("height", function(d) {
                return yScale(d.amount);
            })
            .attr("width", function(d) {
                return ((width  - 60) / data.length) - 20;
            })
            .on('mouseover', function(d) {
                d3.select(this).attr("fill", "red")
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.financial_year + "<br/> £" + d.amount)
                    .style("left", (d3.event.pageX - 25) + "px")
                    .style("top", (d3.event.pageY - 40) + "px")
            })
            .on("mouseout", function(d) {
                d3.select(this).attr("fill", "black")
                div.transition()
                    .duration(500)
                    .style("opacity", 0)
            });

        svg.append("g")
            .attr("transform", "translate(60,0)")
            .call(d3.axisLeft(yScaleX).ticks(4));

        svg.append("g")
            .attr("transform", "translate(0," + (height- 75) + ")")
            .call(d3.axisBottom(xScale).ticks(4, "f"))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-55)");
    });
}

function percentageChange(){
  svg.selectAll("*").remove();


  d3.csv("year.csv", function(data){
    yScale.domain([0, (d3.max(data, function(d) {return d.increasePercentage;})
    )]);
    yScaleX.domain([0, (d3.max(data, function(d) {return d.increasePercentage ;}))
    ]);

    var valueLine = d3.line()
                      .x(function(d){
                        var p = d.financial_year;
                        p = parseInt(p);
                        return xScale(p)})
                      .y(function(d){return yScale(d.increasePercentage)});



        svg.append("path")
            .attr("class", "line")
            .attr("d", valueLine(data));



            svg.append("g")
            .attr("transform", "translate(0," + (height-75) + ")")
            .call(d3.axisBottom(xScale).ticks(4, "f"))
            .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

            svg.append("g")
            .attr("transform", "translate(60,0)")
        .call(d3.axisLeft(yScaleX).ticks(6));
  });
}

function totalByMember(){


  svg.selectAll("*").remove();
    d3.csv("year.csv", function(error, data) {
        if (error) throw error;
        yScale.domain([0, d3.max(data, function(d) {
            return d.perMember;
        })]);
        yScaleX.domain([0, d3.max(data, function(d) {
            return d.perMember;
        })]);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append('rect')
            .attr("y", function(d) {
                return (height - 75) - yScale(d.perMember);
            })
            .attr("x", function(d, i) {
                return (i * (((width - 60) / data.length)-10) + 60);
            })
            .attr("height", function(d) {
                return yScale(d.perMember);
            })
            .attr("width", function(d) {
                return ((width  - 60) / data.length) - 20;
            })
            .on('mouseover', function(d) {
                d3.select(this).attr("fill", "red")
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.financial_year + "<br/> £" + d.perMember)
                    .style("left", (d3.event.pageX - 25) + "px")
                    .style("top", (d3.event.pageY - 40) + "px")
            })
            .on("mouseout", function(d) {
                d3.select(this).attr("fill", "black")
                div.transition()
                    .duration(500)
                    .style("opacity", 0)
            });

        svg.append("g")
            .attr("transform", "translate(60,0)")
            .call(d3.axisLeft(yScaleX).ticks(4));

        svg.append("g")
            .attr("transform", "translate(0," + (height- 75) + ")")
            .call(d3.axisBottom(xScale).ticks(4, "f"))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-55)");
    });


}
