import React from "react";
import SidebarOption from "./SidebarOption";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { selectPlaylist } from "../features/playlistSlice";
import { useSelector } from "react-redux";

function Sidebar({ spotify }) {
  const playlists = useSelector(selectPlaylist);

  console.log(playlists);
  return (
    <div className="bg-[#040404] w-1/4  text-white hidden lg:flex flex-col mx-auto h-screen">
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
            description={playlist.description}
            images={playlist.images}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;
