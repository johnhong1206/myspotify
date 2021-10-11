import React from "react";
import { useDispatch } from "react-redux";
import { getMusic } from "../features/getPlaylistSlice";
import { playMusic, playCurrentMusic } from "../features/playingSlice";

function TrackList({ track }) {
  const dispatch = useDispatch();

  const changeTrack = () => {
    dispatch(getMusic(track));
    dispatch(playCurrentMusic(track.preview_url));

    dispatch(playMusic(true));
  };

  return (
    <div
      onClick={changeTrack}
      className="ml-0 lg:ml-5  p-5 flex flex-row items-center cursor-pointer hover:bg-black opacity-80 hover:opacity-100"
    >
      <img className=" w-40 h-40" src={track.album.images[0].url} alt="" />
      <div className="ml-10">
        <h1 className="text-base font-medium">{track.name}</h1>
        <p className="text-sm mt-1 text-gray-200">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
        <p className="text-sm mt-1 text-gray-200">{track.album.name}</p>
      </div>
    </div>
  );
}

export default TrackList;
