import React, { Component } from 'react';
import {Search} from './components/search/searchbar.js';
import {AppPlaylist} from './components/app-playlist';
import {Spotify} from './utils/spotify';

import logo from './logo.svg';
import './App.css';
import './assests/style.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      user: []
    };

    //bindings
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addToPlayList = this.addToPlayList.bind(this);
    this.addPlaylistName = this.addPlaylistName.bind(this);
    this.setUserProfile = this.setUserProfile.bind(this);
    this.saveNewPlaylist = this.saveNewPlaylist.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

  }

  searchSpotify(term) {
    Spotify.search(term).then(track => {
      this.setState({artists: track});
    });
  }

  addToPlayList(track) {
    let newPlayList = this.state.playlistTracks;
    newPlayList.push(track);
    this.setState({playlistTracks: newPlayList});
  }

  addPlaylistName(newPlaylistName) {
    this.setState({playlistName: newPlaylistName});
  }

  setUserProfile(){
    Spotify.findUserProfile().then(user => {
      this.setState({user: user});
    })

  }

  removeTrack(track) {

    let tracks = this.state.playlistTracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  saveNewPlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Search

          setUserProfile={this.setUserProfile}
          searchSpotify={this.searchSpotify} />
        <AppPlaylist
          saveNewPlaylist={this.saveNewPlaylist}
          addToPlayList={this.addToPlayList}
          addPlaylistName={this.addPlaylistName}
          removeTrack={this.removeTrack}
          artists={this.state.artists}
          playlistTracks={this.state.playlistTracks} />
      </div>
    );
  }
}

export default App;
