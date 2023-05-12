import { Navigate } from 'react-router-dom';

import { getAuthStatus } from '../../store/user/selectors';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { AppRoute } from '../../const';
import Layout from '../../components/layout/layout';
import LoginForm from '../../components/login-form/login-form';
import PageDecor from '../../components/page-decor/page-decor';

export default function Login (): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus.auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <Layout layoutType={AppRoute.Login}>
      <main className="decorated-page login">
      <PageDecor size='small' />
        <div className="container container--size-l">
          <LoginForm />
        </div>
      </main>
    </Layout>
  );
}
