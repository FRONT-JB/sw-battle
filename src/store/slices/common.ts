import { Monster } from '~/types/monster';
import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../reducer';
import { Board } from '~/types/board';

const COMMON_SLICE = 'COMMON' as const;

interface CommonState {
  popup: {
    isOpen: boolean;
    content: any;
  };
  selectedInfo: Monster[];
  detailInfo: Board | undefined;
}

const initialState: CommonState = {
  popup: {
    isOpen: false,
    content: null,
  },
  selectedInfo: [],
  detailInfo: undefined,
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
    setSelectMonster: (state, { payload }: PayloadAction<Monster>) => {
      const isActiveMonster = state.selectedInfo.find(
        (monster) => monster.id === payload.id,
      );

      if (isActiveMonster) {
        state.selectedInfo = [...state.selectedInfo].filter(
          (monster) => monster.id !== payload.id,
        );
      } else {
        const isOverSelected = state.selectedInfo.length > 2;
        state.selectedInfo = isOverSelected
          ? state.selectedInfo
          : [...state.selectedInfo, payload];
      }
    },
    setDetailInfo: (state, { payload }: PayloadAction<Board | undefined>) => {
      state.detailInfo = payload;
    },
    clearSearch: (state) => {
      state.selectedInfo = [];
      state.detailInfo = undefined;
    },
  },
});

export const {
  openPopup,
  closePopup,
  setSelectMonster,
  setDetailInfo,
  clearSearch,
} = commonSlice.actions;
export const commonSelector = (state: RootState) => state.common;
export const popupSelector = createSelector(
  [commonSelector],
  (state) => state.popup,
);
export const detailInfoSelector = createSelector(
  [commonSelector],
  (state) => state.detailInfo,
);
export const selectedInfoSelector = createSelector(
  [commonSelector],
  (state) => state.selectedInfo,
);
export default commonSlice;
