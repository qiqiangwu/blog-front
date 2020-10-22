import { createAction, props } from '@ngrx/store';
import { BreadCrumbItem } from '../types/bread-crumb-item';

export const add = createAction(
  '[Bread Crumb] Add',
  props<{ item: BreadCrumbItem; ignore: boolean }>()
);

export const pop = createAction('[Bread Crumb] Pop');

export const reset = createAction(
  '[Bread Crumb] Reset',
  props<{ item?: BreadCrumbItem }>()
);

export const jumpTo = createAction(
  '[Bread Crumb] Jumb To',
  props<{ index: number }>()
);
