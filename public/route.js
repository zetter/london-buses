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

Route.prototype.build_route = function(){
  var decoded_path = google.maps.geometry.encoding.decodePath(this.points);
  var polyline = new google.maps.Polyline({
    path: decoded_path,
    strokeColor: random_hex_colour(),
    strokeOpacity: 0.8,
    strokeWeight: 4
  });

  google.maps.event.addListener(polyline, 'click', function() {
    if (highlighted_route) {
      highlighted_route.setOptions({strokeOpacity: 0.8, strokeWeight: 4, zIndex: 100})
    }

    polyline.setOptions({strokeOpacity: 1, strokeWeight: 10, zIndex: 1000});
    highlighted_route = polyline;
  });

  polyline.setMap(map);
}


function build_url(route) {
  return "routes/" + route + ".json"
}

function random_hex_colour() {
  num = Math.floor(Math.random()*16777216).toString(16);
  padding = new Array(7 - num.length).join("0");
  return '#' + padding + num;
}