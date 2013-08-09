require 'fileutils'
require 'rubygems'
require 'json'

def route_list_url
  "http://www.tfl.gov.uk/tfl/gettingaround/maps/buses/tfl-bus-map/dotnet/AllRoutes.aspx"
end

def route_url(route)
  "http://www.tfl.gov.uk/tfl/gettingaround/maps/buses/tfl-bus-map/dotnet/FullRoute.aspx?route=#{route}&run=1"
end

FileUtils.mkdir('routes') unless File.exist?('routes')
route_list_file = File.new("route_list.json", 'w')
route_list = `curl '#{route_list_url}'`
route_list_file.write(route_list)
route_list_file.close
routes = JSON.parse(route_list)['AllRoutes']  

routes.each do |route|
  file_name = "routes/#{route}.json"
  next if File.exists?(file_name)
  route_file = File.new(file_name, 'w')
  route_file.write(`curl '#{route_url(route)}'`)
  route_file.close
  sleep(2.5 - rand())
end
