var Route = {}

Route.init = function(route_data){
  this.stops = route_data['Stops'];
  this.route = route_data['Routes'][0];
  return this;
}

Route.show_stations = function(){
  $.each(this.stops, function(i, stop) {
    var latlng = new GLatLng(stop['Latitude'], stop['Longitude']);
    map.addOverlay(new GMarker(latlng));
  })
}

Route.show_route = function(){
  var encodedPolyline = new GPolyline.fromEncoded({
    color: random_hex_colour(),
    weight: 4,
    points: this.route['encodedPoints'],
    levels: this.route['encodedLevels'],
    numLevels: 18,
    zoomFactor: 2
  });
  map.addOverlay(encodedPolyline);
}

function random_hex_colour() {
  num = Math.floor(Math.random()*16777216).toString(16);
  padding = new Array(7 - num.length).join("0");
  return '#' + padding + num;
}