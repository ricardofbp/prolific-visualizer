
// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

function renderBarChart() {
    // append the svg object to the body of the page
    var svg = d3.select("#monthly-pay-barchart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //data grouped by month
    var newData = d3.nest()
        .key((d) => { return d.startTime.getMonth(); })
        .rollup((v) => {
            return d3.sum(v, (d) => {
                return d.reward;
            });
        })
        .entries(data);


    // X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(newData.sort((a, b) => {
            return a.key - b.key;
        })
            .map(function (d) { return +d.key + 1; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(newData, (d) => {
            return d.value;
        })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(newData)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(+d.key + 1);
        })
        .attr("y", function (d) {
            console.log(d);
            return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", "#69b3a2")
}