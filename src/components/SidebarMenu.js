import React from "react";
import SidebarOption from "./SidebarOption";
import { AiOutlineHome, AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { selectPlaylist } from "../features/playlistSlice";
import { useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import { useSpring, animated } from "react-spring";
import { useDispatch } from "react-redux";

import { closemenu } from "../features/menuSlice";

const spotify = new SpotifyWebApi();

function SidebarMenu() {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylist);
  const extend = useSpring({
    transform: "translateX(0px)",
    from: { transform: "translateX(100%)" },
  });

  return (
    <animated.div
      style={extend}
      className="bg-[#040404] w-full md:w-9/12 lg:w-6/12 xl:w-4/12 h-screen fixed z-40 top-0 left-0 "
    >
      <AiOutlineMenu
        className="text-white w-8 h-8 absolute top-4 left-4"
        onClick={() => dispatch(closemenu())}
      />
      <div className="flex flex-row items-center justify-center w-full mx-auto">
        <img
          className=" object-contain"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="logo"
          width="200"
          height="200"
          objectFit="contain"
        />
      </div>

      <SidebarOption Icon={AiOutlineHome} option="Home" />
      <SidebarOption Icon={AiOutlineSearch} option="Home" />
      <SidebarOption Icon={MdOutlineLibraryMusic} option="Home" />
      <div className=" border-gray-800 m-2 border-b-2 mb-4" />
      <p className="ml-[10px] p-[5px] font-medium text-xl text-center mb-1">
        PLAYLST
      </p>
      {playlists?.items?.map((playlist) => {
        return (
          <SidebarOption
            spotify={spotify}
            title={playlist.name}
            id={playlist.id}
            key={playlist.id}
          />
        );
      })}
    </animated.div>
  );
}

export default SidebarMenu;
