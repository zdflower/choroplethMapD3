var HEIGHT = 700;
var WIDTH = 900;
var BASE_DATA_URL = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/";
var COUNTIES_URL = BASE_DATA_URL + "counties.json";
var EDU_DATA_URL = BASE_DATA_URL + "for_user_education.json";

var COLOURS = ['rgb(247, 100, 100)', 'rgb(200, 100, 100)', 'rgb(150, 100, 100)', 'rgb(100, 100, 100)'];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
var eduMap = new Map();

// https://codepen.io/zdflower/pen/RyPQKy
// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
var tooltip = d3.select("body").append("div").attr("id", "tooltip").style("opacity", 0);

var title = d3.select("body").append('h1').attr('id', 'title').text("U.S. Education Data by County");

var description = d3.select('body').append('p').attr('id', 'description').text("Percentage of adults (age 25+) with a bachelor's degree or higher (2010-2014)");

var svg = d3.select("body").append("svg").attr("width", WIDTH).attr("height", HEIGHT).append("g").attr("transform", "translate(0,0)");

// https://github.com/d3/d3-queue
// http://giscollective.org/d3-queue-js/
// https://bl.ocks.org/mbostock/4060606

d3.queue().defer(d3.json, COUNTIES_URL).defer(d3.json, EDU_DATA_URL).await(ready);

var path = d3.geoPath();

function ready(error, counties, eduData) {
  if (error) throw error;
  procesarEduData(eduData);
  svg.append("g").attr("class", "counties").attr("transform", "translate(20,50)").selectAll("path").data(topojson.feature(counties, counties.objects.counties).features).enter().append("path").attr("fill", function (d, i) {
    return chooseAColour(eduMap.get(d.id).education);
  }).attr("d", path).attr("class", "county").attr("data-fips", function (d) {
    return d.id;
  }).attr("data-education", function (d) {
    return eduMap.get(d.id).education;
  }).on('mouseover', function (d) {
    var education = eduMap.get(d.id);
    tooltip.transition().duration(100).style("opacity", 0.9);
    tooltip.html(education.education + "% \n " + education.areaName);
    tooltip.style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
    tooltip.attr("data-fips", d.id).attr("data-education", education);
  }).on('mouseout', function () {
    return tooltip.transition().duration(200).style("opacity", 0);
  });
}

// TO DO: try not to repeat code --^
// **IMPORTANT*** : Is there a way to avoid repeating eduMap.get(d.id)?

/* Add the Legend */
leyenda();

function procesarEduData(data) {
  data.forEach(function (d) {
    eduMap.set(d.fips, { "education": d.bachelorsOrHigher, "areaName": d.area_name });
  });
}

function chooseAColour(education) {
  // Think of a better/clever way to do this:
  var i = 0;
  if (education >= 25 && education < 50) {
    i = 1;
  } else if (education >= 50 && education < 75) {
    i = 2;
  } else if (education >= 75) {
    i = 3;
  }
  return COLOURS[i];
}

function leyenda() {

  var legendScale = d3.scaleLinear().domain([0, 100]).range([0, 120]);

  var legend = svg.append("g").attr("id", "legend").attr("transform", "translate(" + 420 + "," + 20 + ")");

  // colour rectangles
  legend.selectAll("rect").data(COLOURS).enter().append("rect").attr("fill", function (d) {
    return d;
  }).attr("stroke", "black").attr("stroke-width", "1px").attr("width", 30).attr("height", 20).attr("x", function (d, i) {
    return i * 30;
  }).attr("y", 0);

  // axis
  legend.append("g").attr("transform", "translate(" + 0 + "," + 20 + ")").attr("id", "legend-axis").call(d3.axisBottom(legendScale).tickValues([0, 25, 50, 75, 100]));
}

/* To do: Learn more about scales */