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
        page: 0,
        pokemon: [],
        base_url: "http://pokeapi.co/api/v2/item/",
        categories_url: "http://pokeapi.co/api/v2/item-category/",
        categories: []
      }
    },
    componentDidMount: function(){
      this.getCategories(this.state.categories_url);
      this.getPokemones(this.state.base_url);
    },
    getCategories: function(url){
      var _this = this;
      $.get( url, ).done(function( data ) {
        _this.setState({ categories: data.results });
      });
    },
    getPokemones: function(url){
      var _this = this;
      $.get( url, ).done(function( data ) {
        _this.setState({ pokemones: data.results,
                        previous: data.previous,
                        next: data.next,
                        count: data.count });

      });
    },
    getPokemonesInDetails: function(url) {
      var _this = this;
      $.get( url ).done(function( data ) {
        _this.setState({ pokemon: JSON.stringify(data)});
      });
    },
    handleNext: function(url){
      this.setState({ page: this.state.page+20 });
      this.getPokemones(url);
    },
    handlePrevious: function(url){
      this.setState({ page: this.state.page-20 });
      this.getPokemones(url);
    },
    handleFilter: function(){
      var filter = this.refs.filter.value;
      if (filter.length == 0) {
        this.getPokemones(this.state.base_url);
      } else {
        var new_pokemones = this.state.pokemones.filter(function(p){
          return p.name.indexOf(filter) >= 0;
        });
      }
      this.setState({ pokemones: new_pokemones });
    },
    filterByCategories: function(){
      var _this = this;
      var value = this.refs.select.value;
      if ( value == "all" ) {
        this.getPokemones(this.state.base_url);
      } else{
        $.get( value ).done(function( data ) {
          _this.setState({ pokemones: data.items, count: data.items.length, previous: null, next: null, page:0 }); 
        }); 
      }
    },
    render: function() {
      var pokemones = this.state.pokemones;
      return (
        <div className='pokemones'>
          <h5>Listing Pokemones</h5>
          <div className='col-md-6'>
            <input type='text' ref='filter' onChange={this.handleFilter.bind(this, null)} placeholder='Filter by name...' className='form-control'/>
          </div> 
          <div className='col-md-6'>
            <div className='category-text'>Categories :</div>
            <select className="selectpicker" ref='select' onChange={this.filterByCategories.bind(this, null)}>
              <option value="all">All</option>
              { this.state.categories.map(function(cat, index){
                  return <option key={"cat_"+index} value={cat.url}>{cat.name}</option>
                })
              }
            </select>

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
          <p className='result-counts'>{this.state.count} Results found.</p>
          <table className="table table-striped table-inverse table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { pokemones.map(function(pokemon, index){
                return (
                  <tr key={index}>
                    <th scope="row">{this.state.page+index+1}</th>
                    <td>{pokemon.name}</td>
                    <td>{pokemon.url}</td>
                    <td><a href='#-' onClick={this.getPokemonesInDetails.bind(this, pokemon.url)} className='btn btn-success'  data-toggle="modal" data-target="#myModal">Show</a></td>
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
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Pokemon</h4>
                </div>
                <div className="modal-body">
                  <p>Pokemon details</p>
                  <pre>{this.state.pokemon}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>

            </div>
          </div>
        </div>  
      );
    }
});
