import { Link, generatePath } from 'react-router-dom';
import { Quest } from '../../types/quest/quest';
import { AppRoute, QuestFilterNames } from '../../const';

type QuestCardProps = {
  quest: Quest;
};

export default function QuestCard ({quest}: QuestCardProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" src={quest.previewImgWebp} />
          <img src={quest.previewImg} width="344" height="232" alt={quest.title} />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={ generatePath(AppRoute.Quest, { id: quest.id }) }>{quest.title}</Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <image href="/img/sprite/icon-person.svg" />
            </svg>
            {`${quest.peopleMinMax.join('–')} чел`}
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <image href="/img/sprite/icon-level.svg" />
            </svg>
            {QuestFilterNames[quest.level]}
          </li>
        </ul>
      </div>
    </div>
  );
}
