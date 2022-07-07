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

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userFields) => {
        const result = await db.signInUser(userFields);
        checkForError(result);
        return result;
    }
)

export const addNewSnippet = createAsyncThunk(
    'user/addNewSnippet',
    async (snippet, { getState }) => {
        const state = getState();
        const id = state.user.userData._id;
        const updated = await db.addSnippet(id, snippet);
        checkForError(updated);
        return updated;
    }
)

export const deleteSnippet = createAsyncThunk(
    'user/deleteSnippet',
    async (snippetId, { getState }) => {
        const state = getState();
        const id = state.user.userData._id;
        const updated = await db.deleteSnippet(id, snippetId);
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
        resetError: (state) => {
            state.errorMsg = '';
            state.status = "idle"
        },
        signOut: (state) => {
            state.userData = {};
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, setPending)
        .addCase(createUser.fulfilled, setFulfilled)
        .addCase(createUser.rejected, setRejected)
        .addCase(addNewSnippet.pending, setPending)
        .addCase(addNewSnippet.fulfilled, setFulfilled)
        .addCase(addNewSnippet.rejected, setRejected)
        .addCase(loginUser.pending, setPending)
        .addCase(loginUser.fulfilled, setFulfilled)
        .addCase(loginUser.rejected, setRejected)
        .addCase(deleteSnippet.pending, setPending)
        .addCase(deleteSnippet.fulfilled, setFulfilled)
        .addCase(deleteSnippet.rejected, setRejected)
    },
  })

export const selectUser = state => state.user.userData;
export const selectStatus = state => state.user.status;
export const selectIfSignedIn = state => Object.keys(state.user.userData).length;
export const selectError = state => state.user.errorMsg;
export const selectSnippet = id => state => state.user.userData.snippets
    ? state.user.userData.snippets.find(snippet => snippet._id === id)
    : false;

export const { resetError, signOut } = userSlice.actions;

export default userSlice.reducer;