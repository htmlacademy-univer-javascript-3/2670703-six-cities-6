export enum SortingType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export const COMMENT_MIN_LENGTH = 50;
export const COMMENT_MAX_LENGTH = 300;
export const REVIEW_LIMIT = 10;
export const IMAGE_LIMIT = 6;
export const RATING_MULTIPLIER = 20;
export const DEFAULT_MAP_ZOOM = 12;
export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;
