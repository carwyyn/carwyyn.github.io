function memberClicked(details) {
    document.getElementById("memberGraphs").innerHTML = "";
    //console.log(details.properties.member)
    var member = details.properties.member
    document.getElementById("welshTable").setAttribute("style", "display: none;");
    document.getElementById("memberGraphs").setAttribute("style", "display: block;");

    var width = document.getElementById("memberGraphs").offsetWidth;
    var height = document.getElementById("memberGraphs").offsetHeight;

    var xStackChart = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

    var yStackChart = d3.scaleLinear()
                .range([height, 0]);


    var colorStackChart = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    var canvasStackChart = d3.select("#memberGraphs").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "deleteThis")
        .append("g")

    d3.csv("memberAllowanceBreakdown.csv", function(error, data) {

      var amount = 0;
      var memberStacked = [];
      var additionalCosts = {"allowance_type": "Additional Costs Allowance"};
      var cardiffStay = {"allowance_type": "Cardiff Overnight Stay Allowance"};
      var europeanTravel = {"allowance_type": "European Travel"};
      var familyTravel = {"allowance_type": "Family Travel"};
      var mileage = {"allowance_type": "Mileage"};
      var officeCosts = {"allowance_type": "Office Costs Allowance"};
      var partyLeader = {"allowance_type": "Party Leaders' Allowance(Office Costs)"};
      var ukTravel = {"allowance_type": "UK Travel"};

      for (var i=0;i<data.length; i++){

        //console.log(data[i])

        if (member === data[i].member_name){

          amount += Math.floor(data[i].amount)
          if (data[i].allowance_type === "Additional Costs Allowance"){
            additionalCosts[data[i].expenditure_type] =  Math.floor(data[i].amount);
            cardiffStay[data[i].expenditure_type] =  0;
            europeanTravel[data[i].expenditure_type] =  0;
            familyTravel[data[i].expenditure_type] =  0;
            mileage[data[i].expenditure_type] =  0;
            partyLeader[data[i].expenditure_type] =  0;
            ukTravel[data[i].expenditure_type] =  0;
            officeCosts[data[i].expenditure_type] =  0;

          } else if (data[i].allowance_type === "Cardiff Overnight Stay Allowance"){
            cardiffStay[data[i].expenditure_type] =  Math.floor(data[i].amount);
            additionalCosts[data[i].expenditure_type] =  0;
            europeanTravel[data[i].expenditure_type] =  0;
            familyTravel[data[i].expenditure_type] =  0;
            mileage[data[i].expenditure_type] =  0;
            partyLeader[data[i].expenditure_type] =  0;
            ukTravel[data[i].expenditure_type] =  0;
            officeCosts[data[i].expenditure_type] =  0;

          } else if (data[i].allowance_type === "European Travel"){
            europeanTravel[data[i].expenditure_type] =  Math.floor(data[i].amount);
            additionalCosts[data[i].expenditure_type] =  0;
            cardiffStay[data[i].expenditure_type] =  0;
            familyTravel[data[i].expenditure_type] =  0;
            mileage[data[i].expenditure_type] =  0;
            partyLeader[data[i].expenditure_type] =  0;
            ukTravel[data[i].expenditure_type] =  0;
            officeCosts[data[i].expenditure_type] =  0;

          } else if (data[i].allowance_type === "Family Travel"){
            familyTravel[data[i].expenditure_type] =  Math.floor(data[i].amount);
            additionalCosts[data[i].expenditure_type] =  0;
            cardiffStay[data[i].expenditure_type] =  0;
            europeanTravel[data[i].expenditure_type] =  0;
            mileage[data[i].expenditure_type] =  0;
            partyLeader[data[i].expenditure_type] =  0;
            ukTravel[data[i].expenditure_type] =  0;
            officeCosts[data[i].expenditure_type] =  0;

          } else if (data[i].allowance_type === "Mileage"){
            mileage[data[i].expenditure_type] =  Math.floor(data[i].amount);
            additionalCosts[data[i].expenditure_type] =  0;
            cardiffStay[data[i].expenditure_type] =  0;
            europeanTravel[data[i].expenditure_type] =  0;
            familyTravel[data[i].expenditure_type] =  0;
            partyLeader[data[i].expenditure_type] =  0;
            ukTravel[data[i].expenditure_type] =  0;
            officeCosts[data[i].expenditure_type] =  0;

          } else if (data[i].allowance_type === "Office Costs Allowance"){
            officeCosts[data[i].expenditure_type] =  Math.floor(data[i].amount);
            additionalCosts[data[i].expenditure_type] =  0;
            cardiffStay[data[i].expenditure_type] =  0;
            europeanTravel[data[i].expenditure_type] =  0;
            familyTravel[data[i].expenditure_type] =  0;
            mileage[data[i].expenditure_type] =  0;
            partyLeader[data[i].expenditure_type] =  0;
            ukTravel[data[i].expenditure_type] =  0;

          } else if (data[i].allowance_type === "Party Leaders' Allowance(Office Costs)"){
            partyLeader[data[i].expenditure_type] =  Math.floor(data[i].amount);
            additionalCosts[data[i].expenditure_type] =  0;
            cardiffStay[data[i].expenditure_type] =  0;
            europeanTravel[data[i].expenditure_type] =  0;
            familyTravel[data[i].expenditure_type] =  0;
            mileage[data[i].expenditure_type] =  0;
            ukTravel[data[i].expenditure_type] =  0;
            officeCosts[data[i].expenditure_type] =  0;

          } else if (data[i].allowance_type === "UK Travel"){
            ukTravel[data[i].expenditure_type] =  Math.floor(data[i].amount);
            additionalCosts[data[i].expenditure_type] =  0;
            cardiffStay[data[i].expenditure_type] =  0;
            europeanTravel[data[i].expenditure_type] =  0;
            familyTravel[data[i].expenditure_type] =  0;
            mileage[data[i].expenditure_type] =  0;
            partyLeader[data[i].expenditure_type] =  0;
            officeCosts[data[i].expenditure_type] =  0;

          };
        } // end if loop
      } //end for loop

      // HAVE PROCESSED DATA NEEDED, NOW ON TO STACKED GRAPH IMPLEMENTATION
      memberStacked.push(additionalCosts, cardiffStay, europeanTravel, familyTravel, mileage, officeCosts, partyLeader, ukTravel)


       setTimeout(stackGraph(memberStacked), 2500);

      //Build d3 stacked graph
      function stackGraph(data){

      colorStackChart.domain(d3.keys(data[0]).filter(function (key) { return key !== "allowance_type"; }));


           data.forEach(function (d) {
             //console.log(d)
               var y0 = 0;
               d.ages = colorStackChart.domain().map(function (name) {
                 console.log(name);
                 return { name: name,
                          y0: y0,
                          y1: y0 += +d[name] }; });

                //console.log(d.ages);

               d.total = d.ages[d.ages.length - 1].y1;
           });

           data.sort(function (a, b) { return b.total - a.total; });

           xStackChart.domain(data.map(function (d) { return d.allowance_type; }));
           yStackChart.domain([0, d3.max(data, function (d) { return d.total; })]);

           canvasStackChart.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(d3.axisBottom(xStackChart));

           canvasStackChart.append("g")
           .attr("class", "y axis")
           .call(d3.axisLeft(yStackChart))
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("No Of Buildings");

           var state = canvasStackChart.selectAll(".Year")
           .data(data)
           .enter().append("g")
           .attr("class", "g")
           .attr("transform", function (d) { return "translate(" + xStackChart(d.allowance_type) + ",0)"; });

           state.selectAll("rect")
           .data(function (d) { return d.ages; })
           .enter().append("rect")
           .attr("width", xStackChart.bandwidth())
           .attr("y", function (d) { return yStackChart(d.y1); })
           .attr("height", function (d) { return yStackChart(d.y0) - yStackChart(d.y1); })
           .style("fill", function (d) { return colorStackChart(d.name); })
           .on("mouseover", function(d){
             console.log(d.name);
           });

        /*   var legend = canvasStackChart.selectAll(".legend")
           .data(colorStackChart.domain().slice().reverse())
           .enter().append("g")
           .attr("class", "legend")
           .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

           legend.append("rect")
           .attr("x", widthStackChart - 18)
           .attr("width", 18)
           .attr("height", 18)
           .style("fill", colorStackChart);

           legend.append("text")
           .attr("x", widthStackChart - 24)
           .attr("y", 9)
           .attr("dy", ".35em")
           .style("text-anchor", "end")
           .text(function (d) { return d; }); */




         };


    });



}
