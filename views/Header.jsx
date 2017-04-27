var React = require('react');
var createReactClass = require('create-react-class');
var Link = require('react-router').Link;

var Header =  createReactClass({
  displayName: 'Header',
  render: function() {
    var pathname = this.props.location.pathname;
    var pokemon_active = (pathname == '/' || pathname == '/pokemons') ? 'active': '';
    var about_active = pathname == '/about' ? 'active': '';
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Decision Mapper</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">
              <li className={pokemon_active}><Link to="/">Pokemons</Link></li>
              <li className={about_active} ><Link to="/about">About</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
