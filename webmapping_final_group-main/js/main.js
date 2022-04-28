//Here we declare map variable globally so all functions have access
var map;
var biomesLayer;
var stateLayer;
var riverLayer;
var citiesLayer;
var routes;
var oceans;
var shallowoceans


//Create map function
function createMap(){
//Create the map

var southWest = L.latLng(-20, -50),
    northEast = L.latLng(35, 60),
    bounds = L.latLngBounds(southWest, northEast);

map = L.map('map', {
  center: [10, 10],
  zoom: 4,
  minZoom: 4,
  maxZoom: 7,
  maxBounds: bounds
});


//Add OSM base tilelayer in this case watercolor
L.tileLayer('', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

oceans(map)
shallowoceans(map)
states(map)
cities(map)
rivers(map)
addablelayers(map)
createLegend(map)
};

//River Section
function rivers(map){
  var riverstyle = {
    fillColor: "#3944bc",
    color: "#3944bc",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };
  var riverLayer = new L.GeoJSON.AJAX("data/Atlantis_rivers.geojson",{
      style: riverstyle
  }).addTo(map);
}
//Shallow Ocean Section
function shallowoceans(map){
  var shallowoceansstyle = {
    fillColor: "#8cdbf1",
    color: "#8cdbf1",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };
  var shallowoceansLayer = new L.GeoJSON.AJAX("data/Atlantis_shallowocean.geojson",{
      style: shallowoceansstyle
  }).addTo(map);
}

//Ocean Section
function oceans(map){
  var oceansstyle = {
    fillColor: "#45c3c9",
    color: "#45c3c9",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
  };
  var oceansLayer = new L.GeoJSON.AJAX("data/Atlantis_ocean.geojson",{
      style: oceansstyle
  }).addTo(map);
}

// State Section
function states(map){
  function StateStyle(feature) {
    return {
      fillColor: feature.properties.Color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
  }
  var stateLayer = new L.GeoJSON.AJAX("data/Atlantis_states.geojson",{style: StateStyle
    ,onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.State);
    }
  }).addTo(map);
};

//City Section
function cities(map){
  var citiesLayer = new L.GeoJSON.AJAX("data/Atlantis_cities.geojson", {pointToLayer: function(feature, latlng){
            return citypointToLayer(feature, latlng);
             }
      }).addTo(map);
  };

function cityPopupContent(properties){
  //Using object oriented programming to create different parts of the popup
  this.properties = properties;
  this.cityname = this.properties["Burg"]
  this.population = this.properties["Population"]
  //Creates the format for the popup
  this.formatted = "<p><b>City:</b> " + this.cityname + "</p><p><b>Population:</b>" + this.population + "</p>" ;
};

function citypointToLayer(feature, latlng){
    var citystyle = {
      radius: 3,
      fillColor: "#000",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1
    };
    var layer = L.circleMarker(latlng, citystyle);
    //Build popup content string
    var citypopupContent = new cityPopupContent(feature.properties);
    //Bind the popup to the circle marker
    layer.bindPopup(citypopupContent.formatted, {
        offset: new L.Point(0,-5)
    });

    //Return the circle marker to the L.geoJson pointToLayer option
    return layer;
};

//Overlay Layers
function addablelayers(map){
  function biomeStyle(feature) {
    return {
      fillColor: feature.properties.Color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1
    }
  };
  var biomesLayer = new L.GeoJSON.AJAX("data/Atlantis_biomes.geojson",{style: biomeStyle});
  var routestyle = {
    fillColor: "#1b100c",
    color: "#1b100c",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
  };
  var routes = new L.GeoJSON.AJAX("data/Atlantis_routes.geojson",{style: routestyle,onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.id,{});
  }});
  var mixed = {
    "Biomes": biomesLayer, // BaseMaps
    "Travel Routes": routes,
  };
  L.control.layers(null, mixed).addTo(map);
};

function createLegend(map){
  var LegendControl = L.Control.extend({
      options: {
          position: "bottomright"
      },
      onAdd: function(){
          var container = L.DomUtil.create('div', 'second-legend-control-container');
          var svg = '<svg id = "attribute-legend" width = "200px" height = "400px">';

          //cities circles
          var circles = ["black"];
          var radius = 3;
          var cy = 30 - radius;
          svg += '<circle class = "legend-circle" id = "' + circles + '"r="' + radius + '"cy="' + cy + '" fill = "#000000" fill-opacity = "1" stroke = "#000000" cx = "16" />';
          var textY = 31;
          svg += '<text id="' + circles + '"text" x="37" y="' + textY + '">' + " Cities" + '</text>';

          //biome colors and labeling
          var biomeType = ["Glacier", "Mountain", "Tundra", "Grassland", "Taiga", "Savanna", "Deciduous Forest", "Temperate Rainforest", "Tropical Forest", "Hot Desert", "Wetland", "Tropical Rainforest", "Volcanic"];
          var biomeColor = ["#d5e7eb", "#661d00", "#96784b", "#c8d68f", "#4b6b32", "#d2d082", "#29bc56", "#409c43", "#b6d95d", "#fbe79f", "#0b9131", "#7dcb35", "#ff7648"];

          //loops to add biomes to the legend
          for(i=0; i<biomeType.length; i++) {

            var textY = 345 - 8-(i*20);
            svg += '<text id="' + circles + '"text" x="37" y="' + textY + '">' + biomeType[i] + '</text>';

          }
          //loops to add colored circles next to biome type
          for(var j=0; j<biomeColor.length; j++){

            var radius = 8;
            var cy = 340- radius-(j*20);
            svg += '<circle class = "legend-circle" id = "' + biomeColor[j] + '"r="' + radius + '"cy="' + cy + '" fill ="'+ biomeColor[j] +'"fill-opacity = "0.5" stroke = "#000000" cx = "16" />';

          }
          //river line and text
          svg += '<line x1="6" y1="10" x2="26" y2="10" style="stroke: #3944bc;"/>'
          svg += '<text id="' + circles + '"text" x="37" y="' + 14 + '">' + "Rivers" + '</text>';


          svg += "</svg>";

          container.insertAdjacentHTML('beforeend', svg);

          return container;
      }
  });

  map.addControl(new LegendControl());

};

document.addEventListener('DOMContentLoaded',createMap)
