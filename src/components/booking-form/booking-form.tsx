import { RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { BookingData, BookingInfo, BookingInputsData } from '../../types/booking/booking';
import TimeSlotsList from '../time-slots-list/time-slots-list';
import Checkbox from '../user-agreement/user-agreement';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getUserLoadingStatus } from '../../store/user/selectors';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';

type BookingFormProps = {
  currentBooking: BookingInfo,
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
      pattern: /[А-Яа-яЁёA-Za-z'- ]{1,}/,
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

export default function BookingForm ({currentBooking}: BookingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<BookingData>();
  // const userLoadingStatus = useAppSelector(getUserLoadingStatus)

  const onFormSubmit: SubmitHandler<BookingData> = (data) => {
    // dispatch(login(data));
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
          )
        })}
        <Checkbox type={'bookingChildren'} />
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
      <Checkbox type={'bookingAgreement'} />
    </form>
  );
}
