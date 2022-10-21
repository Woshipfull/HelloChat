/* eslint-disable comma-dangle */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter({
  activeChannel: (state) => state.currentChannelId,
});

const initialState = channelsAdapter.getInitialState({
  ids: [],
  entities: {},
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
});

export default channelsSlice.reducer;
export const { actions } = channelsSlice;
export const channelsAll = channelsAdapter.getSelectors(
  (state) => state.channels
).selectAll;
export const channelsIds = channelsAdapter.getSelectors(
  (state) => state.channels
).selectIds;
