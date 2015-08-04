var MapBox = React.createClass({
    componentDidMount: function () {
        map = L.mapbox.map('map', 'mapbox.streets');
        map.setView([47.594972, -122.331518], 15);
        layer.on('ready', function() {
          // the layer has been fully loaded now, and you can
          // call .getTileJSON and investigate its properties
        });
    },

    render: function () {
        return (
            <div id="map"></div>
        );
    }
});

React.render(
    <MapBox />, 
    document.getElementById('mapbox')
);