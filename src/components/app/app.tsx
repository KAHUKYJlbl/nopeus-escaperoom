import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import { getAuthStatus } from '../../store/user/selectors';
import HistoryRouter from '../history-router/history-router';
import { browserHistory } from '../../services/browser-history';
import PrivateRoute from '../../hocs/private-route/private-route';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { AppRoute } from '../../const';

import Oops from '../oops/oops';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import NotFound from '../../pages/not-found/not-found';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Contacts from '../../pages/contacts/contacts';
import Quest from '../../pages/quest/quest';
import Booking from '../../pages/booking/booking';
import MyQuests from '../../pages/my-quests/my-quests';

export default function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus.unknown) {
    return <LoadingSpinner spinnerType='page' />;
  }

  return (
    <ErrorBoundary fallback={<Oops type='error-boundary' />}>
      <Suspense fallback={<LoadingSpinner spinnerType='page' />}>
        <HistoryRouter history={browserHistory}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={
                <Main />
              }
            />
            <Route
              path={AppRoute.Login}
              element={<Login />}
            />
            <Route
              path={AppRoute.Contacts}
              element={<Contacts />}
            />
            <Route
              path={AppRoute.Quest}
              element={<Quest />}
            />
            <Route
              path={AppRoute.Booking}
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.MyQuests}
              element={
                <PrivateRoute>
                  <MyQuests />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </HistoryRouter>
      </Suspense>
    </ErrorBoundary>
  );
}
