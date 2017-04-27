var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
    displayName: 'Index',
    getInitialState: function(){
      return  {
        pokemones: [],
        next: "",
        previous: "",
        count: "",
        page: 0
      }
    },
    componentDidMount: function(){
      this.getPokemones("http://pokeapi.co/api/v2/pokemon/");
    },
    getPokemones: function(url){
      var _this = this;
      $.get( url, ).done(function( data ) {
        _this.setState({ pokemones: data.results,
                        previous: data.previous,
                        next: data.next,
                        count: data.count });

      },this);
    },
    handleNext: function(url){
      this.setState({ page: this.state.page+20 });
      this.getPokemones(url);
    },
    handlePrevious: function(url){
      this.setState({ page: this.state.page-20 });
      this.getPokemones(url);
    },
    render: function() {
      var pokemones = this.state.pokemones;
      return (
        <div className='pokemones'>
          <h5>Listing Pokemones</h5>
          <div className='paginate'>
            {
              this.state.previous != null ?
              <a href='#-' onClick={this.handlePrevious.bind(this, this.state.previous)} className='btn btn-primary'> Previous </a>
              : ""
            }
            {
              this.state.next != null ?
              <a href='#-' onClick={this.handleNext.bind(this,this.state.next)} className='btn btn-primary'>Next</a>
              : ""
            }
          </div>
          <table className="table table-striped table-inverse table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              { pokemones.map(function(pokemon, index){
                return (
                  <tr key={index}>
                    <th scope="row">{this.state.page+index}</th>
                    <td>{pokemon.name}</td>
                    <td>{pokemon.url}</td>
                  </tr>
                )
              }, this)
              }  
            </tbody>
          </table>
          <div className='paginate'>
            {
              this.state.previous != null ?
              <a href='#-' onClick={this.handlePrevious.bind(this, this.state.previous)} className='btn btn-primary'> Previous </a>
              : ""
            }
            {
              this.state.next != null ?
              <a href='#-' onClick={this.handleNext.bind(this,this.state.next)} className='btn btn-primary'>Next</a>
              : ""
            }
          </div>
        </div>  
      );
    }
});
