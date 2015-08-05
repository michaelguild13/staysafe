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

    handleFilter: function (evt) {
        var filter = evt.target.dataset.filter,
            data = this.state.crimes.sort(
                // function (a,b) {
                //     debugger;
                // if (a > b) {
                //     return -1;
                // }
                // if (a < b) {
                //     return 1;
                // }
                //     return 0;
                // }
            );
        this.setState({crimes: data});
    },

    render: function () {
        var self = this,
            markers = this.state.crimes || [];

        return (
            <section id="crimes-listings" className="col-sm-4 col-sm-pull-8 panel panel-default">
                <div className="row">
                <a className="col-sm-6" onClick={self.handleFilter} data-filter="event_clearance_group" >Filter on Group</a>
                <a className="col-sm-6" onClick={self.handleFilter} data-filter="event_clearance_code" >Filter code</a>
                </div>
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
            </section>
          );
    }
});
