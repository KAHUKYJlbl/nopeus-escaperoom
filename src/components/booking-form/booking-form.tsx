import { FormProvider, RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { BookingInfo, BookingInputsData, FormBookingData } from '../../types/booking/booking';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getBookingPostingStatus } from '../../store/booking/selectors';
import { BookSlot } from '../../store/booking/api-actions';

import TimeSlotsList from '../time-slots-list/time-slots-list';
import Checkbox from '../checkbox/checkbox';
import UserAgreement from '../user-agreement/user-agreement';
import LoadingSpinner from '../loading-spinner/loading-spinner';

type BookingFormProps = {
  currentBooking: BookingInfo;
  questId: string;
  questCapacity: [number, number];
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
      maxLength: 15,
    }
  },
  phone: {
    name: 'phone',
    label: 'Контактный телефон',
    placeholder: 'Телефон',
    registerOptions: {
      pattern: /[0-9]{10,}/,
      required: true,
      minLength: 10,
      maxLength: 11,
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

export default function BookingForm ({currentBooking, questId, questCapacity}: BookingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const formMethods = useForm<FormBookingData>();
  const bookingPostingStatus = useAppSelector(getBookingPostingStatus);

  useEffect(() => {
    formMethods.setValue('dateTime', '', { shouldValidate: false });
  }, [currentBooking, formMethods]);

  const onFormSubmit: SubmitHandler<FormBookingData> = (data) => {
    const {dateTime, userAgreement, ...bookingData} = data;
    const timeIndex = dateTime.search(/[0-9]/);
    const date = dateTime.substring(0, timeIndex);
    const time = dateTime.substring(timeIndex);
    dispatch(BookSlot({...bookingData, date, time , id: questId, placeId: currentBooking.id, peopleCount: +bookingData.peopleCount}));
  };

  const onFormSubmitError: SubmitErrorHandler<FormBookingData> = (errors) => {
    errors.contactPerson && toast.error('Введите ваше имя');
    errors.phone && toast.error('Телефон должен начинаться с 8 и состоять из десяти цифр');
    errors.peopleCount && toast.error(`Число участников должно быть от ${questCapacity[0]} до ${questCapacity[1]}`);
    errors.withChildren && toast.error('Дети');
    errors.userAgreement && toast.error('Соглашение');
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className="booking-form"
        onSubmit={formMethods.handleSubmit(onFormSubmit, onFormSubmitError)}
      >
        <fieldset disabled={bookingPostingStatus.isLoading}>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>
            <TimeSlotsList
              type='today'
              timeSlots={currentBooking.slots.today}
              register={formMethods.register}
            />
            <TimeSlotsList
              type='tomorrow'
              timeSlots={currentBooking.slots.tomorrow}
              register={formMethods.register}
            />
          </fieldset>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            {Object.keys(formFields).map((input) => {
              const {name, label, placeholder, registerOptions} = formFields[input];

              return (
                <div className="custom-input login-form__input" key={name}>
                  <label className="custom-input__label" htmlFor={name}>{label}</label>
                  <input
                    {...formMethods.register(name, {...registerOptions,
                      min: name === 'peopleCount' ? questCapacity[0] : undefined,
                      max: name === 'peopleCount' ? questCapacity[1] : undefined,
                    })}
                    type={name}
                    id={name}
                    name={name}
                    placeholder={
                      placeholder + (name === 'peopleCount'
                        ? ` от ${questCapacity[0]} до ${questCapacity[1]}`
                        : ''
                      )
                    }
                  />
                </div>
              );
            })}
            <Checkbox type={'bookingChildren'} />
          </fieldset>
          <button
            className="btn btn--accent btn--cta booking-form__submit"
            type="submit"
            style={{width: bookingPostingStatus.isLoading ? '250px' : ''}}
          >
            {bookingPostingStatus.isLoading ? <LoadingSpinner spinnerType='button' /> : 'Забронировать'}
          </button>
          <UserAgreement type={'bookingAgreement'} />
        </fieldset>
      </form>
    </FormProvider>
  );
}
