import { Navigate } from 'react-router-dom';

import { useCheckAuthQuery } from '../../store/user/user-api';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const { isSuccess } = useCheckAuthQuery();

  return (
    isSuccess
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
