import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../reducer';

const COMMON_SLICE = 'COMMON' as const;

interface CommonState {
  selectedInfo: [];
  popup: {
    isOpen: boolean;
    content: any;
  };
  searchValue: string;
}

const initialState: CommonState = {
  selectedInfo: [],
  popup: {
    isOpen: false,
    content: null,
  },
  searchValue: '',
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
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
  },
});

export const { openPopup, closePopup, setSearchValue } = commonSlice.actions;
export const commonSelector = (state: RootState) => state.common;
export const popupSelector = createSelector([commonSelector], (state) => state.popup);
export const searchValueSelector = createSelector([commonSelector], (state) => state.searchValue);
export const selectedInfoSelector = createSelector([commonSelector], (state) => state.selectedInfo);
export default commonSlice;
