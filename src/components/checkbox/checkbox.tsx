import classNames from 'classnames';
import { ConnectForm } from '../../hocs/connect-form/connect-form';
import { FormBookingData } from '../../types/booking/booking';

type CheckboxType = {
  classes: string[];
    id: string;
    name: string;
    formField: 'userAgreement' | 'withChildren';
    required: boolean;
    text: JSX.Element;
}

const CheckboxTypes: Record<string, CheckboxType> = {
  bookingChildren: {
    classes: ['booking-form__checkbox', 'booking-form__checkbox--children'],
    id: 'children',
    name: 'children',
    formField: 'withChildren',
    required: false,
    text:
      <>
        Со&nbsp;мной будут дети
      </>,
  },
};

type CheckboxProps = {
  type: keyof typeof CheckboxTypes;
}

export default function Checkbox ({type}: CheckboxProps): JSX.Element {
  return (
    <ConnectForm <FormBookingData> >
      {({ register }) => (
        <label className={classNames('custom-checkbox', CheckboxTypes[type].classes)}>
          <input
            {...register(CheckboxTypes[type].formField, {required: CheckboxTypes[type].required})}
            type="checkbox"
            id={CheckboxTypes[type].id}
            name={CheckboxTypes[type].formField}
          />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <image href="/img/sprite/icon-tick.svg" />
            </svg>
          </span>
          <span className="custom-checkbox__label">
            {CheckboxTypes[type].text}
          </span>
        </label>
      )}
    </ConnectForm>
  );
}
