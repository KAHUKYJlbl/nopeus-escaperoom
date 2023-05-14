import { useEffect } from 'react';

import { fetchMyQuests } from '../../store/my-quests/api-actions';
import { getMyQuestsLoadingStatus, getMyQuests } from '../../store/my-quests/selectors';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { AppRoute } from '../../const';

import Layout from '../../components/layout/layout'
import PageDecor from '../../components/page-decor/page-decor';
import QuestCard from '../../components/quest-card/quest-card';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import Oops from '../../components/oops/oops';

export default function MyQuests (): JSX.Element {
  const myQuests = useAppSelector(getMyQuests);
  const myQuestsLoadingStatus = useAppSelector(getMyQuestsLoadingStatus)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMyQuests());
  }, [dispatch])

  if (myQuestsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />;
  }

  if (myQuestsLoadingStatus.isFailed) {
    return <Oops type={'my-quests'} />;
  }

  return (
    <Layout layoutType={AppRoute.MyQuests} >
      <main className="page-content decorated-page">
        <PageDecor size='big' />
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>
          <div className="cards-grid">
            {myQuests.length === 0
              ? <h3 className="title" style={{marginTop: '50px', gridColumn: '2/3', textAlign: 'center'}}>
                  Вs еще не забронировали ни одного квеста.
                </h3>
              : myQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest.quest}
                  bookingInfo={quest}
                />
              ))
            }
          </div>
        </div>
      </main>
    </Layout>
  );
}
