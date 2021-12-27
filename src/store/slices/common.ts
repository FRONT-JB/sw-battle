import { Monster } from '~/types/monster';
import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../reducer';

const COMMON_SLICE = 'COMMON' as const;

interface CommonState {
  selectedInfo: Monster[];
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
    setSelectMonster: (state, { payload }: PayloadAction<Monster>) => {
      const isActiveMonster = state.selectedInfo.find(
        (monster) => monster.id === payload.id,
      );
      if (isActiveMonster) {
        state.selectedInfo = [...state.selectedInfo].filter(
          (monster) => monster.id !== payload.id,
        );
      } else {
        state.selectedInfo = [...state.selectedInfo, payload];
      }
    },
  },
});

export const { openPopup, closePopup, setSearchValue, setSelectMonster } =
  commonSlice.actions;
export const commonSelector = (state: RootState) => state.common;
export const popupSelector = createSelector(
  [commonSelector],
  (state) => state.popup,
);
export const searchValueSelector = createSelector(
  [commonSelector],
  (state) => state.searchValue,
);
export const selectedInfoSelector = createSelector(
  [commonSelector],
  (state) => state.selectedInfo,
);
export default commonSlice;
