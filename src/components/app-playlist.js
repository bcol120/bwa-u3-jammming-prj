import React, { Component } from 'react';
import {SearchResults} from './search/searchResults';
import {Playlist} from './playlist/playlist';
import {PlaylistName} from './playlistName';



export class AppPlaylist extends Component {
  render() {
    return (
      <div className="App-playlist">
        <div className="SearchResults">
          <h2>Results</h2>
          {
            this.props.artists.map(artist => {
              return <SearchResults addToPlayList={this.props.addToPlayList} key={artist.id} artist={artist} />
            })
          }
      </div>
      <div className="Playlist">
        <PlaylistName addPlaylistName={this.props.addPlaylistName} />
        {
          this.props.playlistTracks.map(playlistTrack => {
            return <Playlist key={playlistTrack.id} removeTrack={this.props.removeTrack} playlistTrack={playlistTrack} />
          })
        }
        <a className="Playlist-save" onClick={this.props.saveNewPlaylist}>SAVE TO SPOTIFY</a>
      </div>
    </div>
    );
  }
}
