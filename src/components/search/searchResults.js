import React, { Component } from 'react';

export class SearchResults extends Component {

  constructor(props){
    super(props);

    //bindings
    this.handleAddTrack = this.handleAddTrack.bind(this);

  }

  handleAddTrack(event) {
    this.props.addToPlayList(this.props.artist);
    event.preventDefault();
  }

  render() {
    return (
        <div className="TrackList">
          <div className="Track">
            <div className="Track-information">
              <h3>{this.props.artist.name}</h3>
              <p>{this.props.artist.artist} | {this.props.artist.album}</p>
            </div>
            <a className="Track-action" onClick={this.handleAddTrack} >+</a>
          </div>
        </div>
    );
  }
}
