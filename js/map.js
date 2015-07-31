/** @jsx React.DOM */

var MapBox = React.createClass({
    componentDidMount: function () {
        var self = this,
            layer = L.mapbox.tileLayer('mapbox.streets'),
            map = L.mapbox.map('map', 'mapbox.streets')
            locations = L.mapbox.featureLayer().addTo(map);

        map.setView([47.594972, -122.331518], 15);
        layer.on('ready', function() {
          // the layer has been fully loaded now, and you can
          // call .getTileJSON and investigate its properties
        });
    },

    render: function () {
        return (<div id="map"></div>);
    }
});

React.render(
    <MapBox />, 
    document.getElementById('mapbox')
);


var MarkerCollection = React.createClass({
    getInitialState: function() {
        return {
            crimes: []
        };
    },
    componentDidMount: function () {
        var self = this;

        $.get(this.props.source, function(responce) {
            var collection = responce;

            if (this.isMounted()) {
                this.setState({
                    crimes: collection
                });
            }
        }.bind(this));
    },

    render: function () {
        var markers = this.state.crimes || [];
        return (
            <ul>
              {markers.map(function(markers){
                  return <li key={markers.cad_event_number}>{markers.initial_type_group}</li>
              })}
            </ul>
          );
    }
});

React.render(
    <MarkerCollection source="https://data.seattle.gov/resource/3k2p-39jp.json" />, 
    document.getElementById('crimes-listings')
);