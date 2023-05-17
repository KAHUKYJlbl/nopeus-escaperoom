import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { browserHistory } from '../../services/browser-history';
import { getAuthStatus } from '../../store/user/selectors';
import { AppRoute } from '../../const';

import Layout from '../../components/layout/layout';
import LoginForm from '../../components/login-form/login-form';
import PageDecor from '../../components/page-decor/page-decor';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

export default function Login (): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus.auth) {
    browserHistory.back();
    return <LoadingSpinner spinnerType='page' />;
  }

  return (
    <Layout layoutType={AppRoute.Login}>
      <main className="decorated-page login">
        <PageDecor size='small' />
        <div className="container container--size-l">
          <div className="login__form">
            <LoginForm />
          </div>
        </div>
      </main>
    </Layout>
  );
}
