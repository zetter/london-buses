require 'rubygems'
require 'json'

def route_list_url
  "http://www.tfl.gov.uk/tfl/gettingaround/maps/buses/tfl-bus-map/dotnet/AllRoutes.aspx"
end

def route_url(route)
  "http://www.tfl.gov.uk/tfl/gettingaround/maps/buses/tfl-bus-map/dotnet/FullRoute.aspx?route=#{route}&run=1"
end

route_list_file = File.new("route_list.json", 'w')
route_list = `curl '#{route_list_url}'`
route_file_file.write(route_list)
route_list_file.close
routes = JSON.parse(route_list)['AllRoutes']  

routes.each do |route|
  route_file = File.new("routes/#{route}.json", 'w')
  route_file.write(`curl '#{route_url(route)}'`)
  route_file.close
  sleep(2.5 - rand())
end
