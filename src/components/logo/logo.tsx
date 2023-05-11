import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  logoType: AppRoute;
};

export default function Logo ({logoType}: LogoProps): JSX.Element {
  return logoType === AppRoute.Main
    ? (
      <span className="logo header__logo">
        <svg width="134" height="52" aria-hidden="true">
          <image href="img/sprite/logo.svg" />
        </svg>
      </span>
    ) : (
      <Link className="logo header__logo" to={AppRoute.Main} aria-label="Перейти на Главную">
        <svg width="134" height="52" aria-hidden="true">
          <image href="img/sprite/logo.svg" />
        </svg>
      </Link>
    );
}
