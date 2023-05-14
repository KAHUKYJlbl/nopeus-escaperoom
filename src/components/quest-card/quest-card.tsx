import { Link, generatePath } from 'react-router-dom';
import { Quest } from '../../types/quest/quest';
import { AppRoute, QuestFilterNames } from '../../const';
import { BookingInfo } from '../../types/booking/boking';

type QuestCardProps = {
  quest: Quest;
  bookingInfo?: Omit<BookingInfo, 'quest'>
};

export default function QuestCard ({quest, bookingInfo}: QuestCardProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={quest.previewImgWebp} />
          <img src={quest.previewImg.slice(0, quest.previewImg.indexOf(' ') + 1)} srcSet={quest.previewImg} width="344" height="232" alt={quest.title} />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={ generatePath(AppRoute.Quest, { id: quest.id }) }
          >
            {quest.title}
          </Link>
          <span className="quest-card__info">
            {bookingInfo &&
              `${bookingInfo.date}, ${bookingInfo.time}, ${bookingInfo.location.address}`
            }
            [сегодня,&nbsp;17:00. наб. реки Карповки&nbsp;5, лит&nbsp;П<br />м. Петроградская]
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <image href="/img/sprite/icon-person.svg" />
            </svg>
            {bookingInfo ? bookingInfo.peopleCount : `${quest.peopleMinMax.join('–')} чел`}
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <image href="/img/sprite/icon-level.svg" />
            </svg>
            {QuestFilterNames[quest.level]}
          </li>
        </ul>
        {bookingInfo &&
          <button
            className="btn btn--accent btn--secondary quest-card__btn"
            type="button"
          >
            Отменить
          </button>
        }
      </div>
    </div>
  );
}
