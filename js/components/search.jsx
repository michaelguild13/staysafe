var SearchInput = React.createClass({
    getInitialState: function() {
        return {
            value: "800 Occidental Ave S, Seattle, WA 98134"
        };
    },

    showMap: function (err, data) {
        if (typeof data.lbounds !== 'undefined' && data.lbounds) {
            map.fitBounds(data.lbounds);
        } else if (data.latlng) {
            map.setView([data.latlng[0], data.latlng[1]], 13);
        }
    },

    handleChange: function(evt) {
        geocoder.query(evt.target.value, this.showMap);
        this.setState({
            value: evt.target.value
        });
    },

    render: function() {
        return (
            <div className="jumbotron">
                <h1>StaySafe @</h1><p className="sr-only">Where we try our best to show you want not to do when visiting CenturyLink</p>
                <div className="form-group">
                    <input className="form-control" value={this.state.value} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
});