import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPlaylist,
  selectMusic,
  selectTracks,
} from "../features/getPlaylistSlice";
import {
  selectPlaylist,
  selectWeeklyPlaylist,
} from "../features/playlistSlice";
import BodyItem from "./BodyItem";
import Header from "./Header";
import TrackList from "./TrackList";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { isPlaying, playMusic, setShuffle } from "../features/playingSlice";
import { MdPlayCircleOutline, MdOutlinePauseCircle } from "react-icons/md";

function Body({ spotify }) {
  const dispatch = useDispatch();

  const playlists = useSelector(selectPlaylist);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const [myCurrentPlaylist, setMyCurrentPlaylist] = useState(null);
  const tracks = useSelector(selectTracks);
  const playing = useSelector(isPlaying);
  const track = useSelector(selectMusic);

  console.log(
    playlists?.items?.filter((playlist) =>
      playlist.id.includes(currentPlaylist)
    )
  );

  useEffect(() => {
    setMyCurrentPlaylist();
  });

  const startPlaying = () => {
    dispatch(playMusic(true));
  };

  const stopPlaying = () => {
    dispatch(playMusic(false));
    dispatch(setShuffle(false));
  };
  return (
    <div className="bg-[#5b5773] w-full max-w-3/4 h-screen max-h-screen overflow-scroll scrollbar-hide text-white bg-gradient-to-t from-black">
      <Header spotify={spotify} />
      <div className="flex items-end p-2">
        <BodyItem />
      </div>
      <div className="mt-5 mb-5 ml-[30px]">
        <div className="flex items-center space-x-4">
          {playing ? (
            <MdOutlinePauseCircle
              onClick={track ? stopPlaying : null}
              className="w-8 h-8 cursor-pointer text-green-500 hover:text-green-500"
            />
          ) : (
            <MdPlayCircleOutline
              onClick={track ? startPlaying : null}
              className="w-8 h-8 cursor-pointer hover:text-green-500"
            />
          )}
          <MdOutlineFavoriteBorder className="w-8 h-8" />
          <FiMoreHorizontal className="w-8 h-8" />
        </div>
      </div>
      <div className="px-4 ">
        {tracks?.map((item) => (
          <TrackList key={item.length} track={item.track} />
        ))}
        <div className="pb-52" />
      </div>
    </div>
  );
}

export default Body;
