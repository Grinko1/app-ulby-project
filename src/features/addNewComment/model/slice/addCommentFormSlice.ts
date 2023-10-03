import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
  text: '',
  error: '',
};

export const AddCommentFormSlice = createSlice({
  name: 'AddCommentForm',
  initialState,
  reducers: {
    setText(state, action) {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
    // .addCase(loginByUsername.pending, (state) => {
    //     state.error = undefined;
    //     state.isLoading = true;
    // })
    // .addCase(loginByUsername.fulfilled, (state) => {
    //     state.isLoading = false;
    // })
    // .addCase(loginByUsername.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    // });
  },
});

export const { actions:addCommentFormActions } = AddCommentFormSlice;
export const { reducer: AddCommentFormReducer } = AddCommentFormSlice;
