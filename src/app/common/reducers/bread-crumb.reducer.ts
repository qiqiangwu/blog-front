import { Action, createReducer, on } from '@ngrx/store';
import { BreadCrumbItem } from '../types/bread-crumb-item';
import { BreadCrumbActions } from '../actions';

export const breadCrumbFeatureKey = 'breadCrumb';

export interface State {
  items: BreadCrumbItem[];
  // 跳转索引位置
  jumpToIndex: number;
}

export const initialState: State = {
  items: [],
  jumpToIndex: -1,
};

export const reducer = createReducer(
  initialState,
  on(BreadCrumbActions.add, (state, { item, ignore }) => {
    return {
      ...state,
      items: ignore ? state.items : [...state.items, item],
      jumpToIndex: -1,
    };
  }),
  on(BreadCrumbActions.pop, (state) => ({
    ...state,
    items: state.items.slice(0, state.items.length - 1),
  })),
  on(BreadCrumbActions.reset, (state, { item }) => ({
    ...state,
    items: item ? [item] : [],
  })),
  on(BreadCrumbActions.jumpTo, (state, { index }) => ({
    jumpToIndex: index,
    items: index >= 0 ? [...state.items].slice(0, index + 1) : state.items,
  }))
);

export const selectItems = (state) => state.items;
export const selectJumpToIndex = (state) => state.jumpToIndex;
