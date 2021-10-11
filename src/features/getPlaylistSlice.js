import { createSlice } from "@reduxjs/toolkit";
export const getPlaylistSlice = createSlice({
  name: "getPlaylist",
  initialState: {
    currentPlaylist: null,
    tracks: null,
    music: null,
  },
  reducers: {
    getCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    getTracks: (state, action) => {
      state.tracks = action.payload;
    },
    getMusic: (state, action) => {
      state.music = action.payload;
    },
  },
});

export const { getCurrentPlaylist, getTracks, getMusic } =
  getPlaylistSlice.actions;

export const selectCurrentPlaylist = (state) =>
  state.getPlaylist.currentPlaylist;

export const selectTracks = (state) => state.getPlaylist.tracks;

export const selectMusic = (state) => state.getPlaylist.music;

export default getPlaylistSlice.reducer;
