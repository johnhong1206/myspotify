import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import userReducer from "../features/userSlice";
import playlistReducer from "../features/playlistSlice";
import getPlaylistReducer from "../features/getPlaylistSlice";
import playingReducer from "../features/playingSlice";
import menuReducer from "../features//menuSlice";

const reducers = combineReducers({
  user: userReducer,
  playlist: playlistReducer,
  getPlaylist: getPlaylistReducer,
  playing: playingReducer,
  menu: menuReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
