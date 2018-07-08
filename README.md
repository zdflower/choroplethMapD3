# choroplethMapD3
Data visualization: Choropleth map with D3

Free Code Camp Project

https://learn.freecodecamp.org/data-visualization/data-visualization-projects/visualize-data-with-a-choropleth-map

## User stories
- [x] #1: My choropleth should have a title with a corresponding id="title".
- [x] #2: My choropleth should have a description element with a corresponding id="description".
- [x] #3: My choropleth should have counties with a corresponding class="county" that represent the data.
- [x] #4: There should be at least 4 different fill colors used for the counties.
- [x] #5: My counties should each have data-fips and data-education properties containing their corresponding fips and education values.
- [x] #6: My choropleth should have a county for each provided data point.
- [x] #7: The counties should have data-fips and data-education values that match the sample data.
- [x] #8: My choropleth should have a legend with a corresponding id="legend".
- [x] #9: There should be at least 4 different fill colors used for the legend.
- [x] #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
- [x] #11: My tooltip should have a data-education property that corresponds to the data-education of the active area.

### Datasets
- US Education Data: https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json
- US County Data: https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json

The education data has the form:

    [
	    {
        "fips": 1001,
        "state": "AL",
        "area_name": "Autauga County",
        "bachelorsOrHigher": 21.9
       },
      ...
    ]

FIPS are Federal Information Processing Standards codes.

The id in the counties data corresponds to the fips in the education data.

The tooltip properties are its attributes.

I used the map datastructure to structure the education data into key:value pairs of fips:bachelorsOrHigher, so to access it in a simpler way.

The range for the legend scale (a linear scale) corresponds to the width of the coloured rectangles group. The domain corresponds to the minimum and maximum possible values of the data, in this case, from 0% to 100%.

### To improve
It was hard to produce the legend, and could be much better.

## Resources
- https://github.com/d3/d3-queue
- http://giscollective.org/d3-queue-js/
- https://bl.ocks.org/mbostock/4060606
- http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
- https://learn.freecodecamp.org/data-visualization/data-visualization-with-d3/
- https://github.com/d3/d3-scale
