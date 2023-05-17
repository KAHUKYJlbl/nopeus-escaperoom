import { RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { BookingData, BookingInfo, BookingInputsData } from '../../types/booking/booking';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';

import TimeSlotsList from '../time-slots-list/time-slots-list';
import Checkbox from '../checkbox/checkbox';
import { BookSlot } from '../../store/booking/api-actions';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getBookingPostingStatus } from '../../store/booking/selectors';
import { useEffect } from 'react';

type BookingFormProps = {
  currentBooking: BookingInfo;
  questId: string;
}

type FormFieldsData = {
  name: keyof BookingInputsData;
  label: string;
  placeholder: string;
  registerOptions: RegisterOptions;
};

const formFields: Record<string, FormFieldsData> = {
  contactPerson: {
    name: 'contactPerson',
    label: 'Ваше имя',
    placeholder: 'Имя',
    registerOptions: {
      pattern: /[А-Яа-яЁёA-Za-z'-]{1,}/,
      required: true,
    }
  },
  phone: {
    name: 'phone',
    label: 'Контактный телефон',
    placeholder: 'Телефон',
    registerOptions: {
      pattern: /[0-9]{10,}/,
      required: true,
    }
  },
  peopleCount: {
    name: 'peopleCount',
    label: 'Количество участников',
    placeholder: 'Количество участников',
    registerOptions: {
      pattern: /[0-9]{1,}/,
      required: true,
    }
  },
};

export default function BookingForm ({currentBooking, questId}: BookingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<BookingData>();
  const bookingPostingStatus = useAppSelector(getBookingPostingStatus);

  useEffect(() => {
    if (bookingPostingStatus.isSuccess) {
      // setNewComment({
      //   rating: '',
      //   review: '',
      // });
    }
  }, [bookingPostingStatus]);

  const onFormSubmit: SubmitHandler<BookingData> = (data) => {
    dispatch(BookSlot({...data, id: questId}));
  };

  const onFormSubmitError: SubmitErrorHandler<BookingData> = (errors) => {
    errors.contactPerson && toast.error('Введите ваше имя');
    errors.phone && toast.error('Телефон должен начинаться с 8 и состоять из десяти цифр');
    errors.peopleCount && toast.error('Введите число участников');
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}
    >
      <fieldset disabled={bookingPostingStatus.isLoading}>
        <fieldset className="booking-form__section">
          <legend className="visually-hidden">Выбор даты и времени</legend>
          <TimeSlotsList type='today' timeSlots={currentBooking.slots.today} />
          <TimeSlotsList type='tomorrow' timeSlots={currentBooking.slots.tomorrow} />
        </fieldset>
        <fieldset className="booking-form__section">
          <legend className="visually-hidden">Контактная информация</legend>
          {Object.keys(formFields).map((input) => {
            const {name, label, placeholder, registerOptions} = formFields[input];
            return (
              <div className="custom-input login-form__input" key={name}>
                <label className="custom-input__label" htmlFor={name}>{label}</label>
                <input
                  {...register(name, registerOptions)}
                  type={name}
                  id={name}
                  name={name}
                  placeholder={placeholder}
                />
              </div>
            );
          })}
          <Checkbox type={'bookingChildren'} />
        </fieldset>
        <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
        <Checkbox type={'bookingAgreement'} />
      </fieldset>
    </form>
  );
}
