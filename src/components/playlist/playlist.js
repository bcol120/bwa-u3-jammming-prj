import React, { Component } from 'react';

export class Playlist extends Component {

  constructor(props){
    super(props);

    //bindings
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
  }


  handleRemoveTrack(event) {
    this.props.removeTrack(this.props.playlistTrack);
    event.preventDefault();
  }

  render() {
    return (
        <div className="TrackList">
          <div className="Track">
            <div className="Track-information">
              <h3>{this.props.playlistTrack.name}</h3>
              <p>{this.props.playlistTrack.artist} | {this.props.playlistTrack.album}</p>
            </div>
            <a className="Track-action" onClick={this.handleRemoveTrack} >-</a>
          </div>
        </div>
    );
  }
}
