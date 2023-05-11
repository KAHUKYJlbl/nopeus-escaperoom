export enum AppRoute {
  Main = '/',
  Login = '/login',
  Contacts = '/contacts',
  Quest = '/quest/:id',
  Booking = '/quest/:id/booking',
  MyQuests = '/my-quests',
  NotFound = '/not-found',
}

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/:hotelId',
  Nearby = '/hotels/:hotelId/nearby',
  Comments = '/comments/:hotelId',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  ToggleFavorite = '/favorite/:hotelId/:status',
}

export enum NameSpace {
  UserApi = 'USER_API',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed',
}
