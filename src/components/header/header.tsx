import classnames from 'classnames';

import { AppRoute } from '../../const';
import Logo from '../logo/logo';
// import { useCheckAuthQuery } from '../../store/user/user-api';
import { Link } from 'react-router-dom';

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
  // const { isSuccess } = useCheckAuthQuery();
  const isSuccess = false;

  return (
    <header className="header">
      <div className="container container--size-l">
        <Logo logoType={headerType} />
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {navLinks.map((navLink) => (
              (!navLink.private && !isSuccess) &&
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
          <Link
            className={classnames('btn header__side-item', {
              'btn--accent': isSuccess,
              'header__login-btn': !isSuccess,
            })}
            to={isSuccess ? '' : AppRoute.Login}
          >
            {isSuccess ? 'Выйти' : 'Вход'}
          </Link>
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}
