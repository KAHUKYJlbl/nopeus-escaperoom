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
  Quests = '/quest',
  Quest = '/quest/:questId',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  User = 'USER',
  Quest = 'QUEST',
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
