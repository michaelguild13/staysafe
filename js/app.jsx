// Bootstrap
$('.dropdown-toggle').dropdown();

// Global Scopes
// #TODO: remove Global Vars and switch to a parent container for map & other compoments
var layer = L.mapbox.tileLayer('mapbox.streets'),
    geocoder = L.mapbox.geocoder('mapbox.places'),
    map;
         
function getIconType (context) {
    var context = context.replace(/\W/g, "").toLowerCase();
    // #TODO: filter on full context vs first 4 char
    var icons = {
        'default' : {
            color: '#dfdfde',
            symbol: 'circle'
        },
        'accidentinvestigation' : {
            color: '#ff6501',
            symbol: 'heliport'
        },
        'assault' : {
            color: '#ba98cd',
            symbol: 'logging'
        },
        'arrest' : {
            color: '#a7bd2f',
            symbol: 'police'
        },
        'animalcomplaints' : {
            color: '#bd8c2f',
            symbol: 'dog-park'
        },
        'burglary' : {
            color: '#c60000',
            symbol: 'village'
        },
        'robbery' : {
            color: '#fffdd6',
            symbol: 'pitch'
        },
        'carprowl' : {
            color: '#a0b7da',
            symbol: 'car'
        },
        'disturbances' : {
            color: '#014783',
            symbol: 'oil-well'
        },
        'falsealarms' : {
            color: '#8caba8',
            symbol: 'roadblock'
        },
        'fraudcalls' : {
            color: '#ebdada',
            symbol: 'emergency-telephone'
        },
        'liquorviolations' : {
            color: '#d7c6cf',
            symbol: 'alcohol-shop'
        },
        'mentalhealth' : {
            color: '#a2798f',
            symbol: 'disability'
        },
        'narcoticscomplaints' : {
            color: '#c39797',
            symbol: 'pharmacy'
        },
        'nuisancemischief' : {
            color: '#d3ffce',
            symbol: 'skiing'
        },
        'otherproperty' : {
            color: '#e6ac39',
            symbol: 'building'
        },
        'prostitution'
         : {
            color: '#89a647',
            symbol: 'heart'
        },
        'propertydamage' : {
            color: '#855549',
            symbol: 'baseball'
        },
        'prowler' : {
            color: '#6b64a8',
            symbol: 'school'
        },
        'propertymissingfound' : {
            color: '#d77b37',
            symbol: 'bicycle'
        },
        'persondowninjury' : {
            color: '#57aea0',
            symbol: 'hospital'
        },
        'personslostfoundmissing' : {
            color: '#00e6e6',
            symbol: 'playground'
        },
        'shoplifting' : {
            color: '#009999',
            symbol: 'grocery'
        },
        'suspiciouscircumstances' : {
            color: '#11b2b2',
            symbol: 'theatre'
        },
        'trafficrelatedcalls' : {
            color: '#11b7b7',
            symbol: 'bus'
        },
        'threatsharassment' : {
            color: '#afb4bb',
            symbol: 'danger'
        },
        'trespass' : {
            color: '#e93b46',
            symbol: 'prison'
        }
    };

    return icons[context] || icons['default'];
}

function makeMarker (context) {
    var icon = getIconType(context.event_clearance_group);

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
            'marker-color': icon.color,
            'marker-symbol': icon.symbol
        }
    }).addTo(map);
}


// #TODO: Move ajax into a promise that will fill collection to alow custom filtering with $q
// http://dev.socrata.com/docs/queries.html
var App = React.createClass({
    render: function () {
        return (
            <div>
                <Navigation />
                <article id="app" className="container">
                    <SearchInput />
                    <div className="row">
                        <MapBox />
                        <MarkerCollection source="https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_circle(incident_location, 47.594972, -122.331518, 1609.34)" />, 
                        document.getElementById('crimes-listings')
                    </div>
                </article>
            </div>
        );
    }
});

React.render(
    <App />, 
    document.body
);