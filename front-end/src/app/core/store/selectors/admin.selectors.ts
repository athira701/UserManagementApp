import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from '../admin.state';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectAdminToken = createSelector(
  selectAdminState,
  (state) => state.adminToken
);

export const selectAdminUsers = createSelector(
  selectAdminState,
  (state) => state.users
);

export const selectAdminLoading = createSelector(
  selectAdminState,
  (state) => state.loading
);

export const selectAdminError = createSelector(
  selectAdminState,
  (state) => state.error
);
