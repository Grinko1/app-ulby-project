import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollUISchema } from '../types/scrollSchema';

const initialState: ScrollUISchema = {
  scroll: {},
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
      state.scroll[payload.path] = payload.position;
    },
  },
  extraReducers: (builder) => {
    // builder
    //     .addCase(loginByUsername.pending, (state) => {
    //         state.error = undefined;
    //         state.isLoading = true;
    //     })
    //     .addCase(loginByUsername.fulfilled, (state) => {
    //         state.isLoading = false;
    //     })
    //     .addCase(loginByUsername.rejected, (state, action) => {
    //         state.isLoading = false;
    //         state.error = action.payload;
    //     });
  },
});

// Action creators are generated for each case reducer function
export const { actions: scrollActions } = scrollSlice;
export const { reducer: scrollReducer } = scrollSlice;
