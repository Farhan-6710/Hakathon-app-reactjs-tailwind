// src/redux/imageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  imageUrl: string | null;
}

const initialState: ImageState = {
  imageUrl: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageUrl(state, action: PayloadAction<string>) {
      state.imageUrl = action.payload;
    },
    clearImage(state) {
      state.imageUrl = null;
    },
  },
});

export const { setImageUrl, clearImage } = imageSlice.actions;

export default imageSlice.reducer;
