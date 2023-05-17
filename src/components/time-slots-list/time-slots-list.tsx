import { UseFormRegister } from 'react-hook-form';
import { FormBookingData, TimeSlot } from '../../types/booking/booking';
import { ConnectForm } from '../../hocs/connect-form/connect-form';
import { TimeSlotsListTypes } from '../../const';

type TimeSlotsListProps = {
  type: keyof typeof TimeSlotsListTypes;
  timeSlots: TimeSlot[];
  register: UseFormRegister<FormBookingData>;
};

export default function TimeSlotsList ({type, timeSlots}: TimeSlotsListProps): JSX.Element {
  return (
    <ConnectForm <FormBookingData> >
      {({ register }) => (
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">{TimeSlotsListTypes[type]}</legend>
          <div className="booking-form__date-inner-wrapper">
            {timeSlots.map((timeSlot) => (
              <label className="custom-radio booking-form__date" key={type + timeSlot.time}>
                <input
                  {...register('dateTime', {required: true})}
                  type="radio"
                  name="dateTime"
                  id={type + timeSlot.time}
                  value={type + timeSlot.time}
                  disabled={!timeSlot.isAvailable}
                  required
                />
                <span className="custom-radio__label">{timeSlot.time}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </ConnectForm>
  );
}
