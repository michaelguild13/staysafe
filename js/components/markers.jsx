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

    handleMarker: function(evt) {
        var lat = evt.target.dataset.lat,
            lng = evt.target.dataset.lng;

        map.setView([lat,lng], 18);
        // #TODO: get location to open the pop up
        //locations.eachLayer(function(locale) {
        //var prop = locale.feature.properties;
    },

    handleFilter: function (evt) {
        // #TODO: fix dupicated data
        var filter = evt.target.dataset.filter,
            data = this.state.crimes;
        
        var compare = function (filter) {
            return function (a,b) {
                var a = a[filter],
                    b = b[filter];
                
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            };
        };

        filter = compare(filter); //set filter
        /*  NEVER mutate this.state directly, as calling setState() 
            afterwards may replace the mutation you made. 
            Treat this.state as if it were immutable. */
        this.setState({crimes: data.sort(filter)}); // sort and update
    },

    render: function () {
        var self = this,
            markers = this.state.crimes || [];

        return (
            <div className="col-sm-4 col-sm-pull-8">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <li><a className="" onClick={self.handleFilter} data-filter="event_clearance_group" >Filter on Group</a></li>
                            <li><a className="" onClick={self.handleFilter} data-filter="event_clearance_code" >Filter code</a></li>
                        </ul>
                    </div>
                </nav>
                <section id="crimes-listings">
                    <ul className="list-group">
                        {markers.map(function(markers){
                            makeMarker(markers);
                            return  <li className="list-group-item" key={markers.cad_event_number}>
                                        <a className="small" onClick={self.handleMarker} data-lng={markers.longitude} data-lat={markers.latitude}>
                                            {markers.event_clearance_group}
                                        </a>
                                        <span className="badge">{markers.event_clearance_code}</span>
                                    </li>
                        })}
                    </ul>
                </section>
            </div>
          );
    }
});
