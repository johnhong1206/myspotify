import { loginUrl } from "../spotify";

function login() {
  return (
    <div className="grid bg-black h-screen place-items-center">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="logo"
        className=" object-contain"
      />
      <a
        className="bg-green-600 p-5 text-white font-medium rounded-3xl"
        href={loginUrl}
      >
        Login with Spotify
      </a>
    </div>
  );
}

export default login;
