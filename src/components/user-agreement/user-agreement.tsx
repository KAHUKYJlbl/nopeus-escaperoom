import classNames from 'classnames'

const UserAgreementTypes = {
  login: {
    classes: ['login-form__checkbox']
  },
  booking: {
    classes: ['booking-form__checkbox', 'booking-form__checkbox--agreement']
  },
}

type UserAgreementProps = {
  type: keyof typeof UserAgreementTypes,
}

export default function UserAgreement ({type}: UserAgreementProps): JSX.Element {
  return (
    <label className={classNames('custom-checkbox', UserAgreementTypes[type])}>
      <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
      <span className="custom-checkbox__icon">
        <svg width="20" height="17" aria-hidden="true">
          <image href="/img/sprite/icon-tick.svg" />
        </svg>
      </span>
      <span className="custom-checkbox__label">Я&nbsp;согласен с<a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением</span>
    </label>
);
}
