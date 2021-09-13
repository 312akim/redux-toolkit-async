import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: true
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        toggle(state) {
            state.isOpen = !state.isOpen;
        },
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;