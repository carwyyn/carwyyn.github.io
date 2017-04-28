var width = document.getElementById("assembly1").offsetWidth;
var height = document.getElementById("assembly1").offsetHeight;
var padding = height / 10;

var svg = d3.select("#assembly1").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);

var x = d3.scaleLinear()
          .domain([2011, 2016])
          .range([60, width-padding]);

var y = d3.scaleLinear()
                .range([height-padding,0]);

var valueLine = d3.line()
                  .x(function(d){
                    var p = d.financial_year;
                    p = parseInt(p);
                    return x(p)})
                  .y(function(d){return y(d.amount)});

d3.csv("year.csv", function(error, data){
    if (error) throw error;
    //set domain of y
    y.domain([d3.min(data, function(d){return d.amount}), d3.max(data, function(d){return d.amount;})]);

    svg.append("path")
        .attr("class", "line")
        .attr("d", valueLine(data));

        svg.append("g")
        .attr("transform", "translate(0," + (height-padding-50) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-65)");

        svg.append("g")
        .attr("transform", "translate(60,0)")
    .call(d3.axisLeft(y));


});
