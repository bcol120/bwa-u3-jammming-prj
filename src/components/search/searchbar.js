import React, { Component } from 'react';


export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    }

    //bindings
    this.handleSearch = this.handleSearch.bind(this);
    this.getSearchTerm = this.getSearchTerm.bind(this);
  }

  getSearchTerm(event) {
    this.setState({term: event.target.value});
  }

  handleSearch(event) {
    this.props.searchSpotify(this.state.term);
    this.props.setUserProfile();
    event.preventDefault();
  }
  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.getSearchTerm} placeholder="Enter A Song Title" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}
