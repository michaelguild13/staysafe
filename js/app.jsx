// Bootstrap
$('.dropdown-toggle').dropdown();

// Global Scopes
// #TODO: remove Global Vars and switch to a parent container for map & other compoments
var layer = L.mapbox.tileLayer('mapbox.streets'),
    geocoder = L.mapbox.geocoder('mapbox.places'),
    map;
         
function getIconType (context) {
    // #TODO: filter on full context vs first 4 char
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
    var group = context.event_clearance_group.replace(/\s/g, "").toLowerCase().substring(0, 4),
        icon = getIconType(group);

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