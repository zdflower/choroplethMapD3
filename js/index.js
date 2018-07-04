var height = 700;
var width = 900;

var svg = d3.select("body").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(0,0)");

d3.queue().defer(d3.json, "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json").await(ready);

var path = d3.geoPath();

function ready(error, us) {
  if (error) throw error;

  svg.append("g").attr("class", "counties").selectAll("path").data(topojson.feature(us, us.objects.counties).features).enter().append("path").attr("fill", "red").attr("d", path);
}