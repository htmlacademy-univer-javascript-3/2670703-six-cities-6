import type { City, Offer } from '../types/offer';
import type { AuthInfo } from '../types/auth';

export const createMockCity = (overrides?: Partial<City>): City => {
  const location = {
    latitude: overrides?.location?.latitude ?? 48.8566,
    longitude: overrides?.location?.longitude ?? 2.3522,
    zoom: overrides?.location?.zoom ?? 13
  };

  return {
    name: overrides?.name ?? 'Paris',
    location
  };
};

export const createMockOffer = (overrides?: Partial<Offer>): Offer => {
  const city = overrides?.city ?? createMockCity();

  return {
    id: '1',
    title: 'Test offer',
    type: 'apartment',
    price: 100,
    rating: 4,
    isFavorite: false,
    isPremium: false,
    city,
    location: overrides?.location ?? {
      latitude: city.location.latitude,
      longitude: city.location.longitude,
      zoom: city.location.zoom
    },
    previewImage: 'img/apartment-01.jpg',
    ...overrides
  };
};

export const createMockUserData = (overrides?: Partial<AuthInfo>): AuthInfo => ({
  name: 'User',
  email: 'user@example.com',
  avatarUrl: 'img/avatar.jpg',
  isPro: false,
  token: 'token',
  ...overrides
});


