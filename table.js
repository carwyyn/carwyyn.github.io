function getTableBack(){
  document.getElementById("welshTable").setAttribute("style", "display: block;");
  document.getElementById("memberGraphs").setAttribute("style", "display: none;");
}


function table (){

d3.text("memberTotal.csv", function(data) {
    var parsedCSV = d3.csvParseRows(data);

    var container = d3.select("#welshTable")
        .append("table")
        .attr("id", "welshTable1")

    .selectAll("tr")
        .data(parsedCSV).enter()
        .append("tr")
        .attr("id", function(d) {
            return d[0];
        })
        .on("mouseover", function(d) {
            d3.select(this).attr("style", "background-color:red;")
            var mapid = d[0] + "map";
            document.getElementById(mapid).style['fill'] = "black";
        })
        .on("mouseout", function(d) {
            d3.select(this).attr("style", "background-color:white;")
            var mapid = d[0] + "map";
            document.getElementById(mapid).removeAttribute("style");
        })

    .selectAll("td")
        .data(function(d) {
            return d;
        })
        .enter()
        .append("td")
        .text(function(d) {
            if (isNaN(d)){
              return d
            } else{
            var formatComma = d3.format(",")
            return "£" + formatComma(d);
          }
        })
        .attr("id", function(d) {
            return d + "w"
        })
        .attr("onclick", function(d) {
            if (d === "member_name") {
                return "sortTable(0)"
            } else if (d === "party") {
                return "sortTable(1)"
            } else if (d === "constituency") {
                return "sortTable(2)"
            } else if (d === "amount") {
                return "numberSortTable('welshTable1', 3)"
            } else {
                return "#"
            }
        });
});
};

table()

// Sort table function below from https://www.w3schools.com/howto/howto_js_sort_table.asp

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("welshTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//Following code to sort table by number in amount column from http://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript

function numberSortTable(table_id, sortColumn){
    var tableData = document.getElementById(table_id) //.getElementsByTagName('tbody').item(0);
    console.log(tableData);
    var rowData = tableData.getElementsByTagName('tr');
    for(var i = 0; i < rowData.length - 1; i++){
        for(var j = 1; j < rowData.length - (i + 1); j++){
            if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) < Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
                tableData.insertBefore(rowData.item(j+1),rowData.item(j));
            }
        }
    }
}
