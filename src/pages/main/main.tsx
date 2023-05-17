import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getQuests, getQuestsLoadingStatus } from '../../store/quest/selectors';
import { fetchQuests } from '../../store/quest/api-actions';
import { getCurrentLevelFilter, getCurrentTypeFilter } from '../../store/app/selectors';
import { AppRoute, Filters, QuestLevel, QuestType } from '../../const';

import Layout from '../../components/layout/layout';
import QuestCard from '../../components/quest-card/quest-card';
import FilterItemList from '../../components/filter-item-list/filter-item-list';
import Oops from '../../components/oops/oops';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

export default function Main (): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchQuests());
  }, [dispatch]);
  const quests = useAppSelector(getQuests);
  const currentLevelFilter = useAppSelector(getCurrentLevelFilter);
  const currentTypeFilter = useAppSelector(getCurrentTypeFilter);
  const questsLoadingStatus = useAppSelector(getQuestsLoadingStatus);

  if (questsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />;
  }

  if (quests.length === 0) {
    return <Oops type={'main'} />;
  }

  const filteredQuests = quests
    .filter((quest) => currentLevelFilter === QuestLevel.Any ? true : quest.level === currentLevelFilter)
    .filter((quest) => currentTypeFilter === QuestType.All ? true : quest.type === currentTypeFilter);

  return (
    <Layout layoutType={AppRoute.Main}>
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге</h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>
          <div className="page-content__item">
            <form className="filter" action="#" method="get">
              <fieldset className="filter__section">
                <legend className="visually-hidden">Тематика</legend>
                <FilterItemList filterBy={Filters.Type} />
              </fieldset>
              <fieldset className="filter__section">
                <legend className="visually-hidden">Сложность</legend>
                <FilterItemList filterBy={Filters.Level} />
              </fieldset>
            </form>
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          <div className="cards-grid">
            {
              filteredQuests.length === 0
                ? (
                  <h3 className="title" style={{marginTop: '50px', gridColumn: '2/3', textAlign: 'center'}}>
                    Нет подходящих квестов
                  </h3>
                ) : (
                  filteredQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                    />
                  ))
                )
            }
          </div>
        </div>
      </main>
    </Layout>
  );
}
