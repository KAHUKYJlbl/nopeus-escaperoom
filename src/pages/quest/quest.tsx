import { useEffect } from 'react';
import { Link, generatePath, useParams } from 'react-router-dom';

import { AppRoute, QuestFilterNames } from '../../const';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { fetchQuestById } from '../../store/quest/api-actions';
import { getQuest, getQuestsLoadingStatus } from '../../store/quest/selectors';

import PageDecor from '../../components/page-decor/page-decor';
import Layout from '../../components/layout/layout';
import Oops from '../../components/oops/oops';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

export default function Quest (): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchQuestById(id));
  }, [dispatch]);

  const quest = useAppSelector(getQuest);
  const questsLoadingStatus = useAppSelector(getQuestsLoadingStatus);

  if (questsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />;
  }

  if (quest === null || id === undefined) {
    return <Oops type={'quest'} arg={id} />;
  }

  return (
    <Layout layoutType={AppRoute.Quest}>
      <main className="decorated-page quest-page">
        <PageDecor size='small' img={quest.coverImg} imgWebp={quest.coverImgWebp} />
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{quest.title}</h1>
            <p className="subtitle quest-page__subtitle">
              <span className="visually-hidden">Жанр:</span>{QuestFilterNames[quest.type]}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="20" height="25" aria-hidden="true">
                  <image width="20" height="25" href="/img/sprite/icon-person.svg" />
                </svg>
                {`${quest.peopleMinMax.join('–')} чел`}
              </li>
              <li className="tags__item">
                <svg width="25" height="25" aria-hidden="true">
                  <image width="25" height="25" href="/img/sprite/icon-level.svg" />
                </svg>
                {QuestFilterNames[quest.level]}
              </li>
            </ul>
            <p className="quest-page__description">{quest.description}</p>
            <Link className="btn btn--accent btn--cta quest-page__btn" to={generatePath(AppRoute.Booking, {id})}>Забронировать</Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
