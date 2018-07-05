// TO DO:
// Define a mapping between colours and range of education to assign a colour to each county.
// Add a legend.

const HEIGHT = 700;
const WIDTH = 900;
const BASE_DATA_URL = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/";
const COUNTIES_URL = BASE_DATA_URL + "counties.json";
const EDU_DATA_URL = BASE_DATA_URL + "for_user_education.json";

const COLOURS = ['red', 'green', 'blue', 'yellow', 'purple', 'lime'];

// https://codepen.io/zdflower/pen/RyPQKy
// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
const tooltip = d3.select("body").append("div").attr("id", "tooltip").style("opacity", 0);

const title = d3.select("body").append('h1').attr('id', 'title').text("U.S. Education Data by County");

const description = d3.select('body').append('p').attr('id', 'description').text("Percentage of adults (age 25+) with a bachelor's degree or higher (2010-2014)");

const svg = d3.select("body").append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)
  .append("g")
  .attr("transform", "translate(0,0)");

// https://github.com/d3/d3-queue
// http://giscollective.org/d3-queue-js/
// https://bl.ocks.org/mbostock/4060606

d3.queue()
  .defer(d3.json, COUNTIES_URL)
  .defer(d3.json, EDU_DATA_URL)
  .await(ready);

var path = d3.geoPath();

function ready(error, counties, eduData) {
  if (error) throw error;
  svg.append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(counties, counties.objects.counties).features)
      .enter().append("path")
      .attr("fill", (d, i) => chooseAColour())
      .attr("d", path)
      .attr("class", "county")
      .attr("data-fips", (d) => d.id)
      .attr("data-education", (d) => getEduData(eduData, d.id).bachelorsOrHigher)
  .on('mouseover', (d) => {
    let education = getEduData(eduData, d.id).bachelorsOrHigher;
    tooltip.transition().duration(100).style("opacity", 0.9);
    tooltip.html(`${education}%`);
    tooltip.style("left", (d3.event.pageX) + "px")     
           .style("top", (d3.event.pageY - 28) + "px");
    tooltip
      .attr("data-fips", d.id)
      .attr("data-education", education);
  })
  .on('mouseout', () => tooltip.transition().duration(200).style("opacity", 0))
}

// TO DO: try not to repeat code --^
// Is there a way to avoid repeating getEduData(eduData, d.id)?


function chooseAColour(){
  // For the moment choose colours at random.
                         
  let i = getRandomInt(0, COLOURS.length);
  return COLOURS[i];
}

// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getEduData(eduData, fips){
  const result = eduData.find((d) => d.fips === fips);
  return result;
}
