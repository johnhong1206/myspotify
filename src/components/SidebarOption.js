import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentPlaylist, getTracks } from "../features/getPlaylistSlice";
import { closemenu } from "../features/menuSlice";

function SidebarOption({ spotify, title, id, Icon, images, description }) {
  const dispatch = useDispatch();
  const [track, setTrack] = useState([]);

  const changePlayList = () => {
    dispatch(getCurrentPlaylist({ id, description, title, images }));
    dispatch(closemenu());

    spotify.getPlaylistTracks(id).then((response) => {
      dispatch(getTracks(response.items));
    });
  };

  return (
    <div
      key={id}
      className="flex flex-col cursor-pointer items-center h-10 text-gray-500 hover:text-gray-50"
    >
      {Icon && <Icon className="w-8 h-8" />}
      {Icon ? (
        <h4>{title}</h4>
      ) : (
        <p className="text-lg" onClick={changePlayList}>
          {title}
        </p>
      )}
    </div>
  );
}

export default SidebarOption;
