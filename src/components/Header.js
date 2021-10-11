import React from "react";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { openmenu } from "../features/menuSlice";

function Header() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  return (
    <div className="flex items-center p-2 justify-between space-x-0 md:space-x-1 lg:space-x-4">
      <div>
        <AiOutlineMenu
          className="text-white w-8 h-8 lg:hidden inline-flex mx-4"
          onClick={() => dispatch(openmenu())}
        />
      </div>

      <div className="relative flex w-full md:w-2/3 p-2 md:p-4 bg-gray-100 rounded-full">
        <AiOutlineSearch className="w-6 h-6 text-gray-600" />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
          className="w-full outline-none bg-transparent cursor-pointer h-full rounded-l-md focus:outline-none"
        />
      </div>
      <div className="flex flex-row items-center mx-4">
        <img
          src={user?.images[0]?.url}
          alt={user?.display_name}
          width="60"
          height="60"
          className="rounded-full cursor-pointer"
        />
        <h4 className="hidden lg:inline-flex font-medium text-xs ml-2">
          {user?.display_name}
        </h4>
      </div>
    </div>
  );
}

export default Header;
