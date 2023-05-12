import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getAuthStatus } from '../../store/user/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus.auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
