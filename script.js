//imports
const { select, json, geoPath, geoNaturalEarth1, zoom } = d3;
const { feature } = topojson;
//
const svg = select("svg").attr("width", 1000).attr("height", 800);
const g = svg.append("g");

//
const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

//boundary
g.append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }));

const data = await json("world_atlas-countries-50m.json");
const countries = feature(data, data.objects.countries);

//map
g.selectAll("path")
  .data(countries.features)
  .enter()
  .append("path")
  .attr("class", "country")
  .attr("d", pathGenerator)
  .append("title")
  .text((d) => d.properties.name);

//zoom effect
svg.call(
  zoom().on("zoom", ({ transform }) => {
    g.attr("transform", transform);
  })
);

//Project_Title
select("body")
  .append("p")
  .attr("id", "project_title")
  .text("World Atlas Project");
