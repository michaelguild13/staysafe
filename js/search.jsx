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
    <SearchInput />,
    document.getElementById('search')
);