import { Navigate } from 'react-router-dom';

import { getAuthStatus } from '../../store/user/selectors';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { AppRoute } from '../../const';
import Layout from '../../components/layout/layout';
import LoginForm from '../../components/login-form/login-form';

export default function Login (): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus.auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <Layout layoutType={AppRoute.Login}>
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" />
            <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt="" />
          </picture>
        </div>
        <div className="container container--size-l">
          <LoginForm />
        </div>
      </main>
    </Layout>
  );
}
