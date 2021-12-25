import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../reducer';

const COMMON_SLICE = 'COMMON' as const;

interface CommonState {
  selectedInfo: [];
  popup: {
    isOpen: boolean;
    content: any;
  };
}

const initialState: CommonState = {
  selectedInfo: [],
  popup: {
    isOpen: false,
    content: null,
  },
};

const commonSlice = createSlice({
  name: COMMON_SLICE,
  initialState,
  reducers: {
    openPopup: (state, payload) => {
      state.popup.isOpen = true;
      state.popup.content = payload;
      document.querySelector('body')!.style.overflow = 'hidden';
    },
    closePopup: (state) => {
      state.popup.isOpen = false;
      state.popup.content = null;
      document.querySelector('body')!.removeAttribute('style');
    },
  },
});

export const { openPopup, closePopup } = commonSlice.actions;
export const commonSelector = (state: RootState) => state.common;
export const popupSelector = createSelector([commonSelector], (state) => state.popup);
export const selectedInfoSelector = createSelector([commonSelector], (state) => state.selectedInfo);
export default commonSlice;
