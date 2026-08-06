import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setError } = postsSlice.actions;

export default postsSlice.reducer;
