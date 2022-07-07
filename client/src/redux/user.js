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

const checkForError = data => { if (data.error) throw new Error(data.error)}

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userFields) => {
        const user = await db.createUser(userFields);
        checkForError(user)
        return user;
    },
    cancelIfLoading
)

export const addText = createAsyncThunk(
    'user/addDocument',
    async ({id, snippet}) => {
        const updated = await db.addSnippet(id, snippet);
        checkForError(updated);
        return updated;
    }
)

const initialState = { userData: {}, status: "idle", errorMsg: '' }

const setPending = (state) => {
    state.errorMsg = '';
    state.status = "loading";
}

const setFulfilled = (state, action) => {
    state.status = 'idle';
    if (action.payload.error) {
        state.errorMsg = action.payload.error;
        return;
    }
    state.userData = action.payload.user;
}

const setRejected = (state, action) => {
    state.status = "failed";
    state.errorMsg = action.error.message;
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // example: () => "example"
    },
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, setPending)
        .addCase(createUser.fulfilled, setFulfilled)
        .addCase(createUser.rejected, setRejected)
        .addCase(addText.pending, setPending)
        .addCase(addText.fulfilled, setFulfilled)
        .addCase(addText.rejected, setRejected)
    },
  })

export const selectUser = state => state.user;

// export const { example } = userSlice.actions;

export default userSlice.reducer;