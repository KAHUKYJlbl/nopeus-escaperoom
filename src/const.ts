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
  MyQuests = '/reservation',
  Canceling = '/reservation/:reservationId',
  Quests = '/quest',
  Quest = '/quest/:questId',
  Booking = '/quest/:id/booking',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  App = 'App',
  User = 'User',
  Quest = 'Quest',
  Booking = 'Booking',
  MyQuests = 'MyQuests'
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}
export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed',
}

export enum Filters {
  Type = 'type',
  Level = 'level',
}

export enum QuestType {
  All = 'all',
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

export enum QuestLevel {
  Any = 'any',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export const QuestFilterNames: Record<QuestType | QuestLevel, string> = {
  [QuestType.All]: 'Все квесты',
  [QuestType.Adventures]: 'Приключения',
  [QuestType.Horror]: 'Ужасы',
  [QuestType.Mystic]: 'Мистика',
  [QuestType.Detective]: 'Детектив',
  [QuestType.SciFi]: 'Sci-fi',
  [QuestLevel.Any]: 'Любой',
  [QuestLevel.Easy]: 'Легкий',
  [QuestLevel.Medium]: 'Средний',
  [QuestLevel.Hard]: 'Сложный',
};

export const TimeSlotsListTypes = {
  today: 'Сегодня',
  tomorrow: 'Завтра',
};
