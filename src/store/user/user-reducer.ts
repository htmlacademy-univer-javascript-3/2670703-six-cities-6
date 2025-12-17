import { createReducer, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthInfo } from '../../types/auth';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization, setUserData, checkAuthAction, loginAction } from '../action';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: AuthInfo | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action: PayloadAction<AuthInfo | null>) => {
      state.userData = action.payload;
    })
    .addMatcher(isAnyOf(checkAuthAction.rejected), (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addMatcher(isAnyOf(loginAction.rejected), (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

