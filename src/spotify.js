//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

export const authEndpoint = "https://accounts.spotify.com/authorize";

//https://zhspotify.netlify.app/
//https://next-spotify-eight.vercel.app/

const redirectUrl = "http://localhost:3000/"; //where are you running your app (local react by default is http://localhost:3000/window.location.origin + "/";
const clientId = "c989adbd53034b19a759e9313d942048"; // clintId you can get at https://developer.spotify.com/dashboard

/**
 * You can read more about Spotify scopes at https://developer.spotify.com/documentation/general/guides/scopes/
 */
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scopes=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
