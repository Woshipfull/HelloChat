import { createSlice } from '@reduxjs/toolkit';
import { actions } from './channelsSlice';

const initialState = {
  active: null,
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    changeCurrentChannel: (state, { payload }) => {
      // eslint-disable-next-line radix
      state.active = parseInt(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.removeChannel, (state, action) => {
      const channelId = action.payload;
      if (channelId === state.active) {
        state.active = 1;
      }
    });
  },
});

export const { changeCurrentChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
