import { configureStore, combineReducers } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import activeChannelSlice from './activeChannelSlice';

const appReducer = combineReducers({
  channels: channelsSlice,
  messages: messagesSlice,
  currentChannel: activeChannelSlice,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
