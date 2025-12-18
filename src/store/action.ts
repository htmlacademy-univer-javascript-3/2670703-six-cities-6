import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { Offer } from '../types/offer';
import type { AuthInfo } from '../types/auth';
import type { CommentSubmission } from '../types/offer';
import { SortingType, AuthorizationStatus } from '../const';
import type { State } from './index';
import type { Review } from '../components/review-item/review-item';

export const changeCity = createAction<string>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');

export const changeSortingType = createAction<SortingType>('offers/changeSortingType');

export const setHoveredOfferId = createAction<string | null>('offers/setHoveredOfferId');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<AuthInfo | null>('user/setUserData');

export const setCurrentOffer = createAction<Offer | null>('offers/setCurrentOffer');

export const setNearbyOffers = createAction<Offer[]>('offers/setNearbyOffers');

export const setComments = createAction<Review[]>('comments/setComments');

export const updateOfferFavoriteStatus = createAction<Offer>('offers/updateOfferFavoriteStatus');

export const setFavoriteOffers = createAction<Offer[]>('offers/setFavoriteOffers');

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<AuthInfo, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.get<AuthInfo>('/login');
      localStorage.setItem('six-cities-token', data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
      return data;
    } catch (error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 401) {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue(error);
    }
  }
);

export type LoginCredentials = {
  email: string;
  password: string;
};

export const loginAction = createAsyncThunk<AuthInfo, LoginCredentials, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { extra: api, dispatch }) => {
    const { data } = await api.post<AuthInfo>('/login', { email, password });
    localStorage.setItem('six-cities-token', data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  (_arg, { dispatch }) => {
    localStorage.removeItem('six-cities-token');
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
  }
);

export const fetchOfferByIdAction = createAsyncThunk<Offer, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOfferById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`/offers/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchNearbyOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<Review[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  }
);

export const submitCommentAction = createAsyncThunk<Review, { offerId: string; comment: CommentSubmission }, {
  state: State;
  extra: AxiosInstance;
}>(
  'offers/submitComment',
  async ({ offerId, comment }, { extra: api }) => {
    const { data } = await api.post<Review>(`/comments/${offerId}`, comment);
    return data;
  }
);

export const toggleFavoriteStatusAction = createAsyncThunk<Offer, { offerId: string; isFavorite: boolean }, {
  state: State;
  extra: AxiosInstance;
}>(
  'offers/toggleFavoriteStatus',
  async ({ offerId, isFavorite }, { extra: api }) => {
    const status = isFavorite ? 1 : 0;
    const { data } = await api.post<Offer>(`/favorite/${offerId}/${status}`);
    return data;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/favorite');
    return data;
  }
);
