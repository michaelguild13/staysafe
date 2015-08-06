var Navigation = React.createClass({
    componentDidMount: function () {
    },

    render: function () {
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
                            <li><a>Don't Park Here</a></li>
                            <li><a>Don't Walk Here</a></li>
                            <li><a>Don't Shop Here</a></li>
                            <li><a>Don't Buy a Home Here</a></li>
                        </ul>
                        <SearchInput />
                    </div>
                </div>
            </nav>
        );
    }
});