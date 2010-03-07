var Route = {}


Route = function(route_name){
  this.data_loaded = false;
  this.func_queue = new Array();
  this.route_name = route_name

  var me = this;
  var url = build_url(this.route_name)

  $.getJSON(url, function(route_data) {
    me.receive_data(route_data);
  });
}

Route.prototype.run = function (func_name) {
  if (this.data_loaded) {
    this[func_name]();
  }
  else {
    this.func_queue.push(func_name);
  }
}

Route.prototype.receive_data = function(route_data) {
  this.stops = route_data['Stops'];
  var route = route_data['Routes'][0];
  this.points = route['encodedPoints'];
  this.levels = route['encodedLevels'];
  this.data_loaded = true;

  if (this.func_queue.length) {
    var me = this;
    $.each(this.func_queue, function(i, func_name){
      me[func_name]();
    });
    this.func_queue = null;
  }
}

Route.prototype.show_stations = function(){
  $.each(this.stops, function(i, stop) {
    var latlng = new GLatLng(stop['Latitude'], stop['Longitude']);
    map.addOverlay(new GMarker(latlng));
  })
}

Route.prototype.build_route = function(){
  this.encoded_polyline = new GPolyline.fromEncoded({
    color: random_hex_colour(),
    opacity: 1,
    weight: 6,
    points: this.points,
    levels: this.levels,
    numLevels: 18,
    zoomFactor: 2
  })
  this.encoded_polyline.hide();
  map.addOverlay(this.encoded_polyline);
}

Route.prototype.show_route = function(){
  this.encoded_polyline.show();
}


function build_url(route) {
  return "routes/" + route + ".json"
}

function random_hex_colour() {
  num = Math.floor(Math.random()*16777216).toString(16);
  padding = new Array(7 - num.length).join("0");
  return '#' + padding + num;
}