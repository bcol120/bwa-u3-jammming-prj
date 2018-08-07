import React, { Component } from 'react';

export class PlaylistName extends Component {

  constructor(props) {
    super(props);

    //bindings
    this.setPlaylistName = this.setPlaylistName.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);
    }

  setPlaylistName(event) {
    let newPlaylistName = event.target.value;
    this.props.addPlaylistName(newPlaylistName);
  }
  handleSavePlaylist(event) {
    this.props.saveNewPlaylist();
  }

  render() {
    return <input onChange={this.setPlaylistName} placeholder="Name Your Playlist" />;
  }

}
