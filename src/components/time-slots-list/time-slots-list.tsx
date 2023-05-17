import { TimeSlot } from '../../types/booking/booking';

type TimeSlotsListProps = {
  type: keyof typeof TimeSlotsListTypes;
  timeSlots: TimeSlot[];
};

const TimeSlotsListTypes = {
  today: 'Сегодня',
  tomorrow: 'Завтра',
};

export default function TimeSlotsList ({type, timeSlots}: TimeSlotsListProps): JSX.Element {
  return (
    <fieldset className="booking-form__date-section">
      <legend className="booking-form__date-title">{TimeSlotsListTypes[type]}</legend>
      <div className="booking-form__date-inner-wrapper">
        {timeSlots.map((timeSlot) => (
          <label className="custom-radio booking-form__date" key={type + timeSlot.time}>
            <input
              type="radio"
              name="date"
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
  );
}
