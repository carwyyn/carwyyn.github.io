var mapwidth = document.getElementById("welshMap").offsetWidth;
var mapheight = document.getElementById("welshMap").offsetHeight;

var mapsvg = d3.select("#welshMap").append("svg")
    .attr("width", mapwidth)
    .attr("height", mapheight);

var projection = d3.geoAlbers()
    .center([-1, 54.5])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(15000)
    .translate([100 / 2, -200]);

var path = d3.geoPath()
    .projection(projection);

var mapDiv = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


d3.json("assemblyNew12.geojson", function(json) {
    //console.log(json.features);

    mapsvg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("opacity", 0.3)
        .attr("stroke", "black");


    mapsvg.selectAll("circle")
        .data(json.features)
        .enter()
        .append("circle")
        .attr("id", function(d){
          return d.properties.member + "map"
        })
        .attr("cx", function(d) {
          var long = d.geometry.coordinates[0][0][0];
          if (typeof long === "object"){
            return projection([d.geometry.coordinates[0][0][0][0], d.geometry.coordinates[0][0][0][1]])[0];
          } else {
            return projection(    [d.geometry.coordinates[0][0][0] , d.geometry.coordinates[0][0][1]]    )[0];
          };
        })
        .attr("cy", function(d) {
          var long = d.geometry.coordinates[0][0][0];
          if (typeof long === "object"){
            return projection([d.geometry.coordinates[0][0][0][0], d.geometry.coordinates[0][0][0][1]])[1];
          } else {
            return projection([d.geometry.coordinates[0][0][0], d.geometry.coordinates[0][0][1]])[1];
          }
        })
        .attr("r", function(d) {
            return Math.sqrt(parseInt(d.properties.amount) * 0.004)
        })
        .attr("fill", function(d) {
            if (d.properties.party === "Conservative") {
                return "blue";
            } else if (d.properties.party === "Labour") {
                return "red";
            } else if (d.properties.party === "Liberal Democrats") {
                return "yellow";
            } else if (d.properties.party === "Plaid Cymru") {
                return "green";
            } else {
                return "black";
            }
        })
        .on('mouseover', function(d) {
            d3.select(this).attr("fill", "black")
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.properties.member)
                .style("left", (d3.event.pageX - 25) + "px")
                .style("top", (d3.event.pageY - 40) + "px")
            var member = d.properties.member;
            document.getElementById(member).style['background-color'] = "red";

        })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", function(d) {
                if (d.properties.party === "Conservative") {
                    return "blue";
                } else if (d.properties.party === "Labour") {
                    return "red";
                } else if (d.properties.party === "Liberal Democrats") {
                    return "yellow";
                } else if (d.properties.party === "Plaid Cymru") {
                    return "green";
                } else {
                    return "black";
                }});
            div.transition()
                .duration(500)
                .style("opacity", 0);
            var member = d.properties.member;
            document.getElementById(member).style['background-color'] = "white";
        })
        .on("click", function(d){
            return memberClicked(d)});
});
