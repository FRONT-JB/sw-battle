import { Monster } from '~/types/monster';
import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../reducer';

const COMMON_SLICE = 'COMMON' as const;
interface CommonState {
  selectedInfo: Monster[];
  filterList: string[];
  selectedFilterList: string[];
}

const initialState: CommonState = {
  selectedInfo: [],
  filterList: [],
  selectedFilterList: [],
};

const commonSlice = createSlice({
  name: COMMON_SLICE,
  initialState,
  reducers: {
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
    setSelectFilter: (state, { payload }: PayloadAction<string[]>) => {
      state.selectedFilterList = payload;
    },
    setResetFilter: (state) => {
      state.selectedFilterList = [];
    },
    clearSearch: (state) => {
      state.selectedInfo = [];
    },
  },
});

export const {
  setSelectMonster,
  clearSelectMonster,
  setFilterList,
  setSelectFilter,
  setResetFilter,
  clearSearch,
} = commonSlice.actions;
export const commonSelector = (state: RootState) => state.common;

export const selectedInfoSelector = createSelector(
  [commonSelector],
  ({ selectedInfo }) => selectedInfo,
);

export const filterListSelector = createSelector(
  [commonSelector],
  ({ filterList, selectedFilterList }) => {
    return {
      filterList: filterList,
      selectedFilter: selectedFilterList,
    };
  },
);

export default commonSlice;
