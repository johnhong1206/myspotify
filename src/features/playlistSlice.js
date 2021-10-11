import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: null,
    weeklyPlaylist: null,
  },
  reducers: {
    getPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    getWeeklyPlaylist: (state, action) => {
      state.weeklyPlaylist = action.payload;
    },

    removePlaylist: (state) => {
      state.playlist = null;
      state.weeklyPlaylist = null;
    },
  },
});

export const { getPlaylist, getWeeklyPlaylist, removePlaylist } =
  playlistSlice.actions;

export const selectPlaylist = (state) => state.playlist.playlist;
export const selectWeeklyPlaylist = (state) => state.playlist.weeklyPlaylist;

export default playlistSlice.reducer;
