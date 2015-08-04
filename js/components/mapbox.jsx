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
            <section id="mapbox" className="col-sm-8 col-sm-push-4">
                <div id="map"></div>
            </section>
        );
    }
});