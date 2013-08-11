# London Buses visualisation #
Transport for london release their [online bus maps](http://www.tfl.gov.uk/tfl/gettingaround/maps/buses/) a couple of weeks ago. I started hacking about with [epic javascript](http://www.tfl.gov.uk/tfl/gettingaround/maps/buses/tfl-bus-map/js/tfl-bus-map-manager.js) but decided to start again using just their json data through the non-public api.

## What it can do now ##
Interface to the api, you can plot stops and routes on the map.

## To run ##

Download the json since tfl doesn't allow cross-site requests:
    $ ruby download_routes.rb
 
Then host public folder and load index.html.