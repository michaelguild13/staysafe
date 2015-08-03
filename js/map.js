// Bootstrap
$('.dropdown-toggle').dropdown();

// #TODO: Break in to seperate files and get jsx (babel) working with grunt

/** @jsx React.DOM */

( function () { // #TODO remove once Grunt is fixed
// Global Scopes
// #TODO: remove Global Vars and switch to a parent container for map & other compoments
var layer = L.mapbox.tileLayer('mapbox.streets'),
    geocoder = L.mapbox.geocoder('mapbox.places'),
    map;
         
function getIconType (context) {
    var icons = {
        'tres' : {
            iconColor: '#f00000',
            iconSymbol: 'swimming'
        },
        'carp' : {
            iconColor: '#edcdc3',
            iconSymbol: 'car'
        },
        'susp' : {
            iconColor: '#d3dfe1',
            iconSymbol: 'school'
        },
        'par': {
            iconColor: '#ffff00',
            iconSymbol: 'marker'
        },
        'the': {
            iconColor : '#fffff0',
            iconSymbol : 'logging'
        },
        'per': {
            iconColor : '#ffffff',
            iconSymbol : 'marker'
        },
        'traf': {
            iconColor : '#fbcab3',
            iconSymbol : 'rail'
        },
        'dist': {
            iconColor : '#edcdc3',
            iconSymbol : 'telephone'
        },
        'prop': {
            iconColor : '#ddd000',
            iconSymbol : 'toilets'
        },
        'liq': {
            iconColor : '#dddd00',
            iconSymbol : 'bar'
        },
        'thr': {
            iconColor : '#ddddd0',
            iconSymbol : 'marker'
        },
        'auto': {
            iconColor : '#f8e7f4',
            iconSymbol : 'bicycle'
        },
        'shop': {
            iconColor : '#bce7f4',
            iconSymbol : 'shop'
        },
        'pers': {
            iconColor : '#bcdbbe',
            iconSymbol : 'theatre'
        },
        'default': {
            iconColor : '#000000',
            iconSymbol : 'marker',
        }
    };
    return icons[context] || icons['default'];
}
function makeMarker (context) {
    var group = context.event_clearance_group.replace(/\s/g, "").toLowerCase().substring(0, 4)
        icon = getIconType(group),

    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
              context.longitude,
              context.latitude 
            ]
        },
        properties: {
            title: context.event_clearance_group + ' at ' +context.hundred_block_location + ' (' + context.cad_event_number +')',
            description: context.initial_type_description ,
            'marker-size': 'large',
            'marker-color': icon.iconColor,
            'marker-symbol': icon.iconSymbol
        }
    }).addTo(map);
}

function showMap(err, data) {
    if (typeof data.lbounds !== 'undefined' && data.lbounds) {
        map.fitBounds(data.lbounds);
    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 13);
    }
}

var MapBox = React.createClass({
    componentDidMount: function () {
        map = L.mapbox.map('map', 'mapbox.streets');
        //geocoder.query('Chester, NJ', showMap);
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

var MarkerCollection = React.createClass({
    getInitialState: function() {
        return {
            crimes: []
        };
    },
    componentDidMount: function () {
        $.get(this.props.source, function(responce) {
            if (this.isMounted()) {
                this.setState({
                    crimes: responce
                });
            }
        }.bind(this));
    },

    handleClick: function(evt) {
        var lat = evt.target.dataset.lat,
            lng = evt.target.dataset.lng;

        map.setView([lat,lng], 18);
        // #TODO: get location to open the pop up 
        //locations.eachLayer(function(locale) {
        //var prop = locale.feature.properties;
    },

    render: function () {
        var self = this,
            markers = this.state.crimes || [];

        return (
            <ul className="list-group">
                {markers.map(function(markers){
                    makeMarker(markers);
                    return  <li className="list-group-item" key={markers.cad_event_number}>
                                <a className="small" onClick={self.handleClick} data-lng={markers.longitude} data-lat={markers.latitude}>
                                    {markers.event_clearance_group} 
                                </a>
                                <span className="badge">{markers.event_clearance_code}</span>
                            </li>
                })}
            </ul>
          );
    }
});

var SearchInput = React.createClass({
    getInitialState: function() {
        return {
            value: "800 Occidental Ave S, Seattle, WA 98134"
        };
    },

    handleChange: function(evt) {
        geocoder.query(evt.target.value, showMap);
        this.setState({
            value: evt.target.value
        });
    },

    render: function() {
        return <input className="form-control" value={this.state.value} onChange={this.handleChange} />;
    }
});

React.render(
    <MapBox />, 
    document.getElementById('mapbox')
);

React.render(
    // #TODO: Move ajax into a promise that will fill collection to alow custom filtering with $q
    // http://dev.socrata.com/docs/queries.html
    <MarkerCollection source="https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_circle(incident_location, 47.594972, -122.331518, 1609.34)" />, 
    document.getElementById('crimes-listings')
);

React.render(
    <SearchInput />,
    document.getElementById('search')
);

}());