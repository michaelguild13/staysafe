var Navigation = React.createClass({
    componentDidMount: function () {
    },

    handleFilter: function (evt) {
        var filter = evt.target.dataset.filter;
        console.log(filter);
    },

    render: function () {
        var self = this;

        return (
            <nav className="navbar navbar-default" id="top" role="banner">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">StaySafe</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a onClick={self.handleFilter} data-filter="car" >Don't Park Here</a></li>
                            <li><a onClick={self.handleFilter} data-filter="assult" >Don't Walk Here</a></li>
                            <li><a onClick={self.handleFilter} data-filter="rob" >Don't Shop Here</a></li>
                            <li><a onClick={self.handleFilter} data-filter="stolen" >Don't Buy a Home Here</a></li>
                        </ul>
                        <SearchInput />
                    </div>
                </div>
            </nav>
        );
    }
});