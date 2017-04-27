var React = require('react');
var Link = require('react-router').Link;
var connect = require('react-redux').connect;
var Header = require('./Header.jsx');
var createReactClass = require('create-react-class');

var Layout = createReactClass({
    render: function() {
        var custom = this.props.custom;
        return (
          <html>
            <head>
              <title>{custom.title}</title>
              <link rel='stylesheet' href='/css/app.css' />
            </head>
            <body>
              <Header {...this.props} />
              {/*<h4>{custom.title}</h4>*/}
              <div className='container'>
              {this.props.children}
              </div>
              <script dangerouslySetInnerHTML={{
                  __html: 'window.PROPS=' + JSON.stringify(custom)
              }} />
              <script src='/js/jquery.min.js' />
              <script src='/js/jquery-ui.js' />
              <script src='/js/bootstrap.min.js' />
              <script src='/bundle.js' />
            </body>
          </html>
        );
    }
});

var wrapper = connect(
  function(state) {
    return { custom: state };
  }
);

module.exports = wrapper(Layout);
