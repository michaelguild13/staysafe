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