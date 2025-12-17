import { describe, it, expect } from 'vitest';
import { userReducer, type UserState } from './user-reducer';
import {
  checkAuthAction,
  loginAction,
  requireAuthorization,
  setUserData
} from '../action';
import { createMockUserData } from '../../test-utils/mocks';
import { AuthorizationStatus } from '../../const';

const createInitialState = (overrides?: Partial<UserState>): UserState => ({
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  ...overrides
});

describe('userReducer', () => {
  it('should return initial state for unknown action', () => {
    const state = userReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(createInitialState());
  });

  it('should set authorization status with requireAuthorization action', () => {
    const initialState = createInitialState();

    const state = userReducer(initialState, requireAuthorization(AuthorizationStatus.Auth));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set user data with setUserData action', () => {
    const initialState = createInitialState();
    const userData = createMockUserData();

    const state = userReducer(initialState, setUserData(userData));

    expect(state.userData).toEqual(userData);
  });

  it('should reset user data with setUserData(null)', () => {
    const userData = createMockUserData();
    const initialState = createInitialState({ userData });

    const state = userReducer(initialState, setUserData(null));

    expect(state.userData).toBeNull();
  });

  it('should set NoAuth on checkAuthAction.rejected', () => {
    const initialState = createInitialState({
      authorizationStatus: AuthorizationStatus.Unknown
    });

    const state = userReducer(initialState, { type: checkAuthAction.rejected.type });

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should set NoAuth on loginAction.rejected', () => {
    const initialState = createInitialState({
      authorizationStatus: AuthorizationStatus.Unknown
    });

    const state = userReducer(initialState, { type: loginAction.rejected.type });

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
