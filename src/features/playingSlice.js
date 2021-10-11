import { createSlice } from "@reduxjs/toolkit";

export const playingSlice = createSlice({
  name: "playing",
  initialState: {
    music: null,

    playing: false,
    volume: 30,
    repeat: null,
    shuffle: false,
  },
  reducers: {
    playMusic: (state, action) => {
      if (!state.playing) {
        if (state.music) {
          state.playing = action.payload;
        }
      } else {
        if (state.music) {
          state.playing = action.payload;
        }
      }
    },
    playCurrentMusic: (state, action) => {
      state.music = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    setShuffle: (state, action) => {
      state.shuffle = action.payload;
    },
  },
});

export const { playMusic, playCurrentMusic, setVolume, setRepeat, setShuffle } =
  playingSlice.actions;

export const isPlaying = (state) => state.playing.playing;
export const selectAudio = (state) => state.playing.music;
export const selectRepeat = (state) => state.playing.repeat;
export const selectVolume = (state) => state.playing.volume;
export const selectShuffle = (state) => state.playing.shuffle;

export default playingSlice.reducer;
