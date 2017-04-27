var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
  displayName: 'About',
  render: function() {
    return (
      <div className='about'>
        <h4>
          This is Decision Mapper
        </h4>
      </div>
    );
  }
});
