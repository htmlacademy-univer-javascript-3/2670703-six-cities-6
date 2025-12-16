import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../mocks/offers';
import { SortingType } from '../const';

export const changeCity = createAction<string>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');

export const changeSortingType = createAction<SortingType>('offers/changeSortingType');

export const setHoveredOfferId = createAction<number | null>('offers/setHoveredOfferId');
