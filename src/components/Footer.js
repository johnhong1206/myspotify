import React, { useEffect, useState } from "react";

import { BiVolumeLow, BiVolumeFull } from "react-icons/bi";
import {
  MdRepeat,
  MdRepeatOne,
  MdPlayCircleOutline,
  MdOutlinePauseCircle,
  MdOutlineShuffle,
  MdOutlineFastRewind,
  MdOutlineFastForward,
  MdOutlineShuffleOn,
} from "react-icons/md";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";

import {
  getMusic,
  selectMusic,
  selectTracks,
} from "../features/getPlaylistSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  playMusic,
  isPlaying,
  setVolume,
  selectVolume,
  setRepeat,
  selectRepeat,
  playCurrentMusic,
  setShuffle,
  selectShuffle,
} from "../features/playingSlice";

function Footer({ player }) {
  const dispatch = useDispatch();
  const playlist = useSelector(selectTracks);
  const track = useSelector(selectMusic);
  const playing = useSelector(isPlaying);
  const isRepeat = useSelector(selectRepeat);
  const shuffle = useSelector(selectShuffle);
  const volume = useSelector(selectVolume);
  const [value, setValue] = useState(Number(volume));
  const playsongId = track?.id.toString();

  useEffect(() => {
    dispatch(setVolume(value));
  }, [value, volume]);

  const startPlaying = () => {
    dispatch(playMusic(true));
  };

  const stopPlaying = () => {
    dispatch(playMusic(false));
    dispatch(setShuffle(false));
  };

  const playNext = () => {
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
  };

  const playPrevious = () => {
    const currentIndex = playlist.findIndex(
      (track) => track.track.id === playsongId
    );

    let nextMusic;
    if (currentIndex === 0) {
      nextMusic = playlist[playlist.length - 1];
      dispatch(playMusic(true));
      dispatch(getMusic(nextMusic?.track));
      dispatch(playCurrentMusic(nextMusic?.track.preview_url));
    } else {
      nextMusic = playlist[currentIndex - 1];
      dispatch(playMusic(true));
      dispatch(getMusic(nextMusic?.track));
      dispatch(playCurrentMusic(nextMusic?.track.preview_url));
    }
  };

  const shuffleMusic = () => {
    if (!shuffle) {
      let randomTrackNumber = Math.floor(Math.random() * playlist.length);
      let shuffleMusic;
      shuffleMusic = playlist[randomTrackNumber];
      dispatch(setShuffle(true));
      dispatch(playMusic(true));
      dispatch(getMusic(shuffleMusic?.track));
      dispatch(playCurrentMusic(shuffleMusic?.track.preview_url));
    } else {
      dispatch(setShuffle(false));
    }
  };

  const volumeChange = (e, newVal) => {
    setValue(newVal);
    player.volume = newVal / 100;
    //
  };

  const setRepeatSong = () => {
    if (!isRepeat) {
      dispatch(setRepeat("repeatAll"));
    }
    if (isRepeat === "repeatAll") {
      dispatch(setRepeat("repeatOne"));
    }
    if (isRepeat === "repeatOne") {
      dispatch(setRepeat(false));
    }
  };
  //flex items-center justify-between p-5 h-32 w-full bg-[#282828] px-4 lg:px-4
  return (
    <div className="w-full bg-[#282828] flex flex-col lg:flex-row text-white  items-center justify-between px-0">
      <div className="flex flex-col xl:flex-row items-center justify-center w-full lg:w-1/5 ">
        <img
          src={track ? track.album.images[0].url : ""}
          className="w-32 h-32 mr-5 object-contain"
        />
        <div className="hidden lg:flex  flex-col mr-10 lg:mr-0 ">
          <h4 className="text-base">
            {track ? track.name : "No song selected"}
          </h4>
          <p className="font-medium text-sm">
            {track
              ? track.artists.map((artist) => artist.name).join(", ")
              : null}
          </p>
        </div>
      </div>
      <div className=" text-white flex flex-col items-center justify-between  lg:flex-row w-full">
        <div className="flex items-center justify-center space-x-4 lg:space-x-6 xl:space-x-8 flex-grow mt-1  mx-auto">
          {shuffle ? (
            <MdOutlineShuffleOn
              onClick={shuffleMusic}
              className="w-8 h-8 cursor-pointer text-green-500"
            />
          ) : (
            <MdOutlineShuffle
              onClick={shuffleMusic}
              className="w-8 h-8 cursor-pointer hover:text-green-500"
            />
          )}

          <MdOutlineFastRewind
            onClick={playPrevious}
            className="w-8 h-8 cursor-pointer hover:text-green-500"
          />
          {playing ? (
            <MdOutlinePauseCircle
              onClick={track ? stopPlaying : null}
              className="w-12 h-12 cursor-pointer text-green-500 hover:text-green-500"
            />
          ) : (
            <MdPlayCircleOutline
              onClick={track ? startPlaying : null}
              className="w-12 h-12 cursor-pointer hover:text-green-500"
            />
          )}

          <MdOutlineFastForward
            onClick={playNext}
            className="w-8 h-12 hover:text-green-500 cursor-pointer"
          />

          {!isRepeat && (
            <MdRepeat
              onClick={setRepeatSong}
              className={`w-8 h-8 cursor-pointer hover:text-green-500 `}
            />
          )}

          {isRepeat === "repeatAll" && (
            <MdRepeat
              onClick={setRepeatSong}
              className={`w-8 h-8 cursor-pointer text-green-500 hover:text-green-500`}
            />
          )}
          {isRepeat === "repeatOne" && (
            <MdRepeatOne
              onClick={setRepeatSong}
              className={`w-8 h-8 cursor-pointer text-green-500 hover:text-green-500`}
            />
          )}
        </div>
        <div className="text-white mx-auto pr-0 lg:pr-4">
          <div className="">
            <Box sx={{ width: 260 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <BiVolumeLow className="w-12 h-12" />
                <Slider
                  aria-label="Volume"
                  value={value}
                  onChange={volumeChange}
                  className="text-green-500"
                />
                <BiVolumeFull
                  className={`w-12 h-12 ${value === 100 && "text-green-500"}`}
                />
              </Stack>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
