const height = 700;
const width = 900;

const title = d3.select("body").append('h1').attr('id', 'title').text("U.S. Education Data by County");

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(0,0)");

// https://github.com/d3/d3-queue
// http://giscollective.org/d3-queue-js/
// https://bl.ocks.org/mbostock/4060606

d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json")
  .defer(d3.json, "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json")
  .await(ready);

var path = d3.geoPath();

function ready(error, counties, eduData) {
  if (error) throw error;
  readyCounties(counties);
  readyEduData(eduData);
}

function readyCounties(counties) {
    svg.append("g")
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(counties, counties.objects.counties).features)
        .enter().append("path")
        .attr("fill", "red")
        .attr("d", path)
        .attr("class", "county")
}

function readyEduData(eduData){
  // 
}
