import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "./dbAPI";

const cancelIfLoading = {
    condition: (_, { getState }) => {
        const state = getState()
        const status = state.user.status;
        if (status === 'fulfilled' || status === 'loading') {
            // Already fetched or in progress, don't need to re-fetch
            return false
        }
    },
}

const getUser = createAsyncThunk(
    'user/getUser',
    async (id) => {
        const users = await db.getAll();
        return users;
    },
    cancelIfLoading
)

const initialState = { userData: {}, status: "idle", errorMsg: '' }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // example: () => "example"
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUser.pending, (state) => {
            state.userData = {};
            state.errorMsg = '';
            state.status = "loading";
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.status = "idle"
        })
        .addCase(getUser.rejected, (state, action) => {
            state.userData = {};
            state.status = "failed";
            state.errorMsg = action.error.message;
        })
    },
  })

export const selectUser = state => state.user;

// export const { example } = userSlice.actions;

export default userSlice.reducer;