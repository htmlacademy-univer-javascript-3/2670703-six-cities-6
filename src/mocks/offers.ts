export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  isFavorite: boolean;
  isPremium: boolean;
  city: City;
  location: Location;
  description: string;
  goods: string[];
  host: Host;
  bedrooms: number;
  maxAdults: number;
  previewImage: string;
  images: string[];
};

export const offers: Offer[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious studio at great location',
    type: 'Apartment',
    price: 120,
    rating: 4.8,
    isFavorite: false,
    isPremium: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.390955,
      longitude: 4.853096,
      zoom: 8,
    },
    description: 'A quiet cozy and picturesque place that hides behind a river.',
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Cable TV',
      'Washing machine',
      'Coffee machine',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    bedrooms: 3,
    maxAdults: 4,
    previewImage: 'img/apartment-01.jpg',
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
  },
  {
    id: 2,
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    rating: 4,
    isFavorite: true,
    isPremium: false,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 12,
      },
    },
    location: {
      latitude: 50.957361,
      longitude: 6.950974,
      zoom: 8,
    },
    description: 'Charming room close to the city center with everything you need.',
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Fridge',
      'Towels',
    ],
    host: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    bedrooms: 1,
    maxAdults: 2,
    previewImage: 'img/room.jpg',
    images: [
      'img/room.jpg',
      'img/apartment-small-03.jpg',
      'img/apartment-small-04.jpg',
    ],
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    rating: 4.6,
    isFavorite: false,
    isPremium: false,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.889976,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    description: 'Lovely canal view apartment in the heart of Amsterdam.',
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Dishwasher',
      'Baby seat',
      'Washing machine',
    ],
    host: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    bedrooms: 2,
    maxAdults: 4,
    previewImage: 'img/apartment-02.jpg',
    images: [
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    rating: 5,
    isFavorite: true,
    isPremium: true,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12,
      },
    },
    location: {
      latitude: 48.85761,
      longitude: 2.348499,
      zoom: 8,
    },
    description: 'Spacious apartment in a quiet street close to the main attractions.',
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Dishwasher',
      'Coffee machine',
      'Cable TV',
    ],
    host: {
      name: 'Remy',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    bedrooms: 4,
    maxAdults: 6,
    previewImage: 'img/apartment-03.jpg',
    images: [
      'img/apartment-03.jpg',
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
    ],
  },
];

