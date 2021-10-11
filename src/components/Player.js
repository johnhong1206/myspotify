import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMusic,
  selectTracks,
  selectMusic,
} from "../features/getPlaylistSlice";
import { selectmenuIsOpen } from "../features/menuSlice";
import {
  isPlaying,
  playCurrentMusic,
  playMusic,
  selectAudio,
  selectRepeat,
  selectVolume,
} from "../features/playingSlice";
import { selectUser } from "../features/userSlice";
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SidebarMenu from "./SidebarMenu";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function Player() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const music = useSelector(selectAudio);
  const playing = useSelector(isPlaying);
  const playlist = useSelector(selectTracks);
  const musicInfo = useSelector(selectMusic);

  const volume = useSelector(selectVolume);
  const repeat = useSelector(selectRepeat);
  const MenuNav = useSelector(selectmenuIsOpen);
  const playsongId = musicInfo?.id.toString();
  const musicPlayers = useRef();
  const player = musicPlayers.current;
  const playAudio = () => {
    musicPlayers.current.play();
  };
  useEffect(() => {
    musicPlayers.current.src = music;
    if (music && playing) {
      playAudio();
    }
    if (music && !playing) {
      dispatch(playMusic(false));
      musicPlayers.current.currentTime = 0;
      musicPlayers.current.pause();
    }
  }, [music, playing]);

  const songEnded = () => {
    // if repeat is false we will play next else just set the time to 0
    if (!repeat) {
      dispatch(playMusic(false));
    } else if (repeat === "repeatAll") {
      const currentIndex = playlist.findIndex(
        (track) => track.track.id === playsongId
      );
      console.log("currentIndex", currentIndex);
      let nextMusic;

      if (currentIndex === playlist.length - 1) {
        nextMusic = playlist[0];
        dispatch(playMusic(true));
        dispatch(getMusic(nextMusic?.track));
        dispatch(playCurrentMusic(nextMusic?.track.preview_url));
      } else {
        nextMusic = playlist[currentIndex + 1];
        dispatch(playMusic(true));
        dispatch(getMusic(nextMusic?.track));
        dispatch(playCurrentMusic(nextMusic?.track.preview_url));
      }
    }
    if (repeat === "repeatOne") {
      dispatch(playMusic(true));
      musicPlayers.current.currentTime = 0;
      musicPlayers.current.play();
    }
  };
  return (
    <div className="w-full h-full">
      <main className="relative">
        <div className="flex flex-row">
          <Sidebar spotify={spotify} />
          <Body spotify={spotify} />
        </div>
        <div className="absolute bottom-0 w-full">
          <Footer player={player} />
        </div>
        <audio
          ref={musicPlayers}
          autoPlay={true}
          preload="auto"
          autobuffer="true"
          onEnded={songEnded}
        />
      </main>
      {MenuNav && <SidebarMenu />}
    </div>
  );
}

export default Player;
