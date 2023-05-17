import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { getAuthStatus } from '../../store/user/selectors';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';
import { logout } from '../../store/user/api-actions';

type HeaderProps = {
  headerType: AppRoute;
};

const navLinks = [
  {
    name: 'Квесты',
    link: AppRoute.Main,
    private: false,
  },
  {
    name: 'Контакты',
    link: AppRoute.Contacts,
    private: false,
  },
  {
    name: 'Мои бронирования',
    link: AppRoute.MyQuests,
    private: true,
  },
];

export default function Header ({headerType}: HeaderProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container container--size-l">
        <Logo logoType={headerType} />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {navLinks.map((navLink) => (
              (authStatus.auth || !navLink.private) &&
              <li className="main-nav__item" key={navLink.link}>
                <Link
                  className={classnames('link', {
                    'active': navLink.link === headerType,
                    'not-disabled': navLink.link !== headerType,
                  })}
                  to={navLink.link}
                >
                  {navLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__side-nav">
          {
            headerType !== AppRoute.Login &&
            <Link
              className={classnames('btn header__side-item', {
                'btn--accent': authStatus.auth,
                'header__login-btn': authStatus.noAuth,
              })}
              to={authStatus.auth ? '' : AppRoute.Login}
              onClick={authStatus.auth ? handleLogout : undefined}
            >
              {authStatus.auth ? 'Выйти' : 'Вход'}
            </Link>
          }
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}
