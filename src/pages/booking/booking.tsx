import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { fetchBookingSlots } from '../../store/booking/api-actions';
import { getBookingSlots, getBookingSlotsLoadingStatus, getCurrentBookingId } from '../../store/booking/selectors';
import { AppRoute } from '../../const'

import Layout from '../../components/layout/layout'
import PageDecor from '../../components/page-decor/page-decor';
import UserAgreement from '../../components/user-agreement/user-agreement';
import Map from '../../components/map/map';
import Oops from '../../components/oops/oops';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { getQuest } from '../../store/quest/selectors';
import TimeSlotsList from '../../components/time-slots-list/time-slots-list';

export default function Booking (): JSX.Element {
  const {id: questId} = useParams();
  const dispatch = useAppDispatch();
  const currentQuest = useAppSelector(getQuest);
  const bookingSlots = useAppSelector(getBookingSlots);
  const currentBookingId = useAppSelector(getCurrentBookingId);
  const bookingSlotsLoadingStatus = useAppSelector(getBookingSlotsLoadingStatus);
  useEffect(() => {
    dispatch(fetchBookingSlots(questId));
  }, [dispatch]);

  const currentBookingInfo = bookingSlots.find((booking) => booking.id === currentBookingId);

  if (bookingSlotsLoadingStatus.isLoading) {
    return <LoadingSpinner spinnerType='page' />
  }

  if (bookingSlots.length === 0 || !currentBookingId || !currentQuest || !currentBookingInfo) {
    return <Oops type='booking' arg={questId} />
  }


  return (
    <Layout layoutType={AppRoute.Contacts} >
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
          <form className="booking-form">
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <TimeSlotsList type='today' timeSlots={currentBookingInfo.slots.today} />
              <TimeSlotsList type='tomorrow' timeSlots={currentBookingInfo.slots.tomorrow} />
            </fieldset>
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">Ваше имя</label>
                <input type="text" id="name" name="name" placeholder="Имя" required pattern="[А-Яа-яЁёA-Za-z'- ]{1,}" />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
                <input type="tel" id="tel" name="tel" placeholder="Телефон" required pattern="[0-9]{10,}" />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">Количество участников</label>
                <input type="number" id="person" name="person" placeholder="Количество участников" required />
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input type="checkbox" id="children" name="children" checked />
                <span className="custom-checkbox__icon">
                  <svg width="20" height="17" aria-hidden="true">
                    <image href="/img/sprite/icon-tick.svg"></image>
                  </svg>
                </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
              </label>
            </fieldset>
            <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
            <UserAgreement type={'booking'} />
          </form>
        </div>
      </main>
    </Layout>
  );
}
