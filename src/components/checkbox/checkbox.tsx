import classNames from 'classnames';

const UserAgreementTypes = {
  loginAgreement: {
    classes: ['login-form__checkbox'],
    id: 'id-order-agreement',
    name: 'user-agreement',
    required: true,
    text:
      <>
        Я&nbsp;согласен с&nbsp;
        <a className="link link--active-silver link--underlined" href="#">
          правилами обработки персональных данных
        </a>
        &nbsp;и пользовательским соглашением
      </>,
  },
  bookingAgreement: {
    classes: ['booking-form__checkbox', 'booking-form__checkbox--agreement'],
    id: 'id-order-agreement',
    name: 'user-agreement',
    required: true,
    text:
      <>
        Я&nbsp;согласен с&nbsp;
        <a className="link link--active-silver link--underlined" href="#">
          правилами обработки персональных данных
        </a>
        &nbsp;и пользовательским соглашением
      </>,
  },
  bookingChildren: {
    classes: ['booking-form__checkbox', 'booking-form__checkbox--children'],
    id: 'children',
    name: 'children',
    required: false,
    text:
      <>
        Со&nbsp;мной будут дети
      </>,
  },
};

type UserAgreementProps = {
  type: keyof typeof UserAgreementTypes;
}

export default function Checkbox ({type}: UserAgreementProps): JSX.Element {
  return (
    <label className={classNames('custom-checkbox', UserAgreementTypes[type].classes)}>
      <input
        type="checkbox"
        id={UserAgreementTypes[type].id}
        name={UserAgreementTypes[type].name}
        required={UserAgreementTypes[type].required}
      />
      <span className="custom-checkbox__icon">
        <svg width="20" height="17" aria-hidden="true">
          <image href="/img/sprite/icon-tick.svg" />
        </svg>
      </span>
      <span className="custom-checkbox__label">
        {UserAgreementTypes[type].text}
      </span>
    </label>
  );
}
