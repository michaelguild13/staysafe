var SearchInput = React.createClass({
    getInitialState: function() {
        return {
            value: "800 Occidental Ave S, Seattle, WA 98134"
        };
    },

    setMapView: function (err, data) {
        if (typeof data.lbounds !== 'undefined' && data.lbounds) {
            map.fitBounds(data.lbounds);
        } else if (data.latlng) {
            map.setView([data.latlng[0], data.latlng[1]], 13);
        }
    },

    handleChange: function(evt) {
        geocoder.query(evt.target.value, this.setMapView);
        this.setState({
            value: evt.target.value
        });
    },

    render: function() {
        return (
            <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                    <input className="form-control" value={this.state.value} onChange={this.handleChange} placeholder="insert address"/>
                </div>
            </form>
        );
    }
});