import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, gettoken, selectToken } from "./features/userSlice";
import { getPlaylist, getWeeklyPlaylist } from "./features/playlistSlice";
import Player from "./components/Player";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login";
import { selectMusic } from "./features/getPlaylistSlice";
import { isPlaying } from "./features/playingSlice";

const spotify = new SpotifyWebApi();

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const track = useSelector(selectMusic);
  const playing = useSelector(isPlaying);

  const [title, setTitle] = useState("My Spotify");

  useEffect(() => {
    if (playing) {
      const trackAartist = track?.artists[0].name;
      const trackname = track?.name;
      setTitle(`${trackAartist} - ${trackname} `);
    } else {
      setTitle("My Spotify");
    }
    document.title = title;
  }, [title, playing]);

  const getAccessTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

  useEffect(() => {
    const hash = getAccessTokenFromUrl();
    const _token = hash["access_token"];

    if (_token) {
      spotify.getMe().then((user) => {
        dispatch(login(user));
      });

      dispatch(gettoken(_token));

      spotify.setAccessToken(_token);

      spotify.getUserPlaylists().then((playlists) => {
        dispatch(getPlaylist(playlists));
      });

      spotify
        .getPlaylist("45ljDlUP6bCJi5CIUmauH8")
        .then((playlists) => dispatch(getWeeklyPlaylist(playlists)));
    }
  }, [token]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Player />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
