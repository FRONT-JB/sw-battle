import { Monster } from '~/types/monster';
import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../reducer';

const COMMON_SLICE = 'COMMON' as const;

export interface FilterState {
  selectOne: string | undefined;
  selectTwo: string | undefined;
  selectThree: string | undefined;
}

interface CommonState {
  popup: {
    isOpen: boolean;
    content: any;
  };
  selectedInfo: Monster[];
  filterList: string[];
  selectedFilterList: FilterState | {};
}

const initialState: CommonState = {
  popup: {
    isOpen: false,
    content: null,
  },
  selectedInfo: [],
  filterList: [],
  selectedFilterList: {
    selectOne: undefined,
    selectTwo: undefined,
    selectThree: undefined,
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
    clearSelectMonster: (state) => {
      state.selectedInfo = [];
    },
    setFilterList: (state, { payload }: PayloadAction<string[]>) => {
      state.filterList = payload;
    },
    setSelectFilter: (
      state,
      {
        payload,
      }: PayloadAction<{
        filterName: string;
        filterValue: string;
      }>,
    ) => {
      const { filterName, filterValue } = payload;
      const isNotEmptyPayload = !!filterValue;
      state.selectedFilterList = Object.assign(state.selectedFilterList, {
        [filterName]: isNotEmptyPayload ? filterValue : undefined,
      });
    },
    setResetFilter: (state) => {
      const selectedFilterList = Object.values(state.selectedFilterList);
      const isActiveFilter = selectedFilterList.some(Boolean);
      if (isActiveFilter) {
        state.selectedFilterList = {};
      }
    },
    clearSearch: (state) => {
      state.selectedInfo = [];
    },
  },
});

export const {
  openPopup,
  closePopup,
  setSelectMonster,
  clearSelectMonster,
  setFilterList,
  setSelectFilter,
  setResetFilter,
  clearSearch,
} = commonSlice.actions;
export const commonSelector = (state: RootState) => state.common;
export const popupSelector = createSelector(
  [commonSelector],
  (state) => state.popup,
);
export const selectedInfoSelector = createSelector(
  [commonSelector],
  (state) => state.selectedInfo,
);
export const filterListSelector = createSelector([commonSelector], (state) => {
  return {
    filterList: state.filterList,
    selectedFilter: state.selectedFilterList,
  };
});
export default commonSlice;
