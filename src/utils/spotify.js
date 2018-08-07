const CLIENT_ID = 'a57b602846b4432b8fa8bb31bbd5076d';
const CLIENT_SECRET = '9146f2be23614828abb9769e13581250';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPE = 'playlist-modify-public user-read-private user-read-email playlist-modify-private';

let user_id;
let accessToken;
let headers = { Authorization: `Bearer ${accessToken}` };

export const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    Spotify.getAccessToken();
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search/?q=${term}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  },

  findUserProfile() {
    let accessToken = this.getAccessToken();
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.id) {
        user_id = jsonResponse.id;
        console.log('User ID fetch reached')
        return jsonResponse.id;
      } else {
        console.log('User failed');
      }
    });
  },

  savePlaylist(playlistName, tracks) {
    if (!playlistName || !tracks.length) {
      console.log('empty and exited');
      return;
    }

    let accessToken = this.getAccessToken();

    return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: { Authorization: `Bearer ${accessToken}`},
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        console.log('adding tracks');
        const playlistId = jsonResponse.href;
        return fetch(`${playlistId}`, {
            headers: { Authorization: `Bearer ${accessToken}`},
            method: 'POST',
            body: JSON.stringify({name: tracks})
          });
      });
  }

};
