import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getBookingSlots, getBookingSlotsLoadingStatus, getCurrentBookingId } from '../../store/booking/selectors';
import { fetchBookingSlots } from '../../store/booking/api-actions';
import { getQuest, getQuestsLoadingStatus } from '../../store/quest/selectors';
import { fetchQuestById } from '../../store/quest/api-actions';
import { AppRoute } from '../../const';

import Layout from '../../components/layout/layout';
import PageDecor from '../../components/page-decor/page-decor';
import Map from '../../components/map/map';
import Oops from '../../components/oops/oops';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import BookingForm from '../../components/booking-form/booking-form';

export default function Booking (): JSX.Element {
  const {id: questId} = useParams();
  const dispatch = useAppDispatch();

  const currentQuest = useAppSelector(getQuest);
  const questsLoadingStatus = useAppSelector(getQuestsLoadingStatus);

  const bookingSlots = useAppSelector(getBookingSlots);
  const currentBookingId = useAppSelector(getCurrentBookingId);
  const bookingSlotsLoadingStatus = useAppSelector(getBookingSlotsLoadingStatus);

  useEffect(() => {
    dispatch(fetchBookingSlots(questId));
    dispatch(fetchQuestById(questId));
  }, [dispatch, questId]);

  const currentBookingInfo = bookingSlots.find((booking) => booking.id === currentBookingId);

  if (bookingSlotsLoadingStatus.isLoading || questsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />;
  }

  if (bookingSlots.length === 0 || !currentBookingId || !currentQuest || !currentBookingInfo || !questId) {
    return <Oops type='booking' arg={questId} />;
  }


  return (
    <Layout layoutType={AppRoute.Booking} >
      <main className="page-content decorated-page">
        <PageDecor size='big' />
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">
              Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">
              {currentQuest.title}
            </p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <Map
                  location={bookingSlots[0].location}
                  bookings={bookingSlots}
                  currentBookingId={currentBookingId}
                />
              </div>
              <p className="booking-map__address">Вы&nbsp;выбрали: {currentBookingInfo.location.address}</p>
            </div>
          </div>
          <BookingForm currentBooking={currentBookingInfo} questId={questId} questCapacity={currentQuest.peopleMinMax} />
        </div>
      </main>
    </Layout>
  );
}
