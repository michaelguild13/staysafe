var Navigation = React.createClass({
    componentDidMount: function () {
    },

    render: function () {
        return (
            <header className="navbar" id="top" role="banner">
                <div className="container">
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <nav id="bs-navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a>Don't Park Here</a></li>
                            <li><a>Don't Walk Here</a></li>
                            <li><a>Don't Shop Here</a></li>
                            <li><a>Don't Buy a Home Here</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
});