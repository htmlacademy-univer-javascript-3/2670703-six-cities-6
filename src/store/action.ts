import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../mocks/offers';

export const changeCity = createAction<string>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');
