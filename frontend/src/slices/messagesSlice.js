import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(actions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const restEntities = Object.values(state.entities).filter((m) => m.channelId !== channelId);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export default messagesSlice.reducer;
export const { addMessage, addMessages } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages).selectAll;
