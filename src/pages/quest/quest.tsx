import Layout from '../../components/layout/layout';
import PageDecor from '../../components/page-decor/page-decor';
import { AppRoute } from '../../const';

export default function Quest (): JSX.Element {
  return (
    <Layout layoutType={AppRoute.Quest}>
      <main className="decorated-page quest-page">
        <PageDecor size='small' />
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">Маньяк</h1>
            <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>Ужасы
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="11" height="14" aria-hidden="true">
                  <use xlinkHref="img/sprite/icon-person.svg"></use>
                </svg>3&ndash;6&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="img/sprite/icon-level.svg"></use>
                </svg>Средний
              </li>
            </ul>
            <p className="quest-page__description">В&nbsp;комнате с&nbsp;приглушённым светом несколько человек, незнакомых друг с&nbsp;другом, приходят в&nbsp;себя. Никто не&nbsp;помнит, что произошло прошлым вечером. Руки и&nbsp;ноги связаны, но&nbsp;одному из&nbsp;вас получилось освободиться. На&nbsp;стене висит пугающий таймер и&nbsp;запущен отсчёт 60&nbsp;минут. Сможете&nbsp;ли вы&nbsp;разобраться в&nbsp;стрессовой ситуации, помочь другим, разобраться что произошло и&nbsp;выбраться из&nbsp;комнаты?</p>
            <a className="btn btn--accent btn--cta quest-page__btn" href="booking.html">Забронировать</a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
