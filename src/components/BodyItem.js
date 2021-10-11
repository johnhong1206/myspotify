import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentPlaylist } from "../features/getPlaylistSlice";

function BodyItem({ id, item, name, image, description }) {
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  return (
    <div className="flex flex-col">
      <div key={id} className="flex items-end">
        <img
          src={
            currentPlaylist
              ? currentPlaylist?.images[0].url
              : "https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_250/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-250x250.png"
          }
          alt={currentPlaylist?.title}
          className="w-44 h-44 mt-0 mr-5"
          style={{
            "background-image":
              "linear-gradient(rgb(0,0,0,0.5),rgb(0,0,0,0.5)),",
          }}
        />
        <div className="flex flex-col flex-grow">
          <h2 className=" text-5xl">{currentPlaylist?.title}</h2>
          <p>{currentPlaylist?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BodyItem;
