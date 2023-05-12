import { Message, SubmitErrorHandler, SubmitHandler, Validate, ValidationRule, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { AuthData } from '../../types/api/login';
import { login } from '../../store/user/api-actions';
import { toast } from 'react-toastify';
import UserAgreement from '../user-agreement/user-agreement';

export type RegisterOptions = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number>;
  minLength: ValidationRule<number>;
  pattern: ValidationRule<RegExp>;
  validate: Validate<string, AuthData> | Record<string, Validate<string, AuthData>>;
}>;


type FormFieldsData = {
  name: keyof AuthData;
  label: string;
  placeholder: string;
  registerOptions: RegisterOptions;
};

const formFields: Record<string, FormFieldsData> = {
  email: {
    name: 'email',
    label: 'E-mail',
    placeholder: 'Адрес электронной почты',
    registerOptions: {
      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      required: true,
    }
  },
  password: {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    registerOptions: {
      pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{2,}$/,
      required: true,
      minLength: 3,
      maxLength: 15,
    }
  },
};

export default function LoginForm (): JSX.Element {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<AuthData>();

  const onFormSubmit: SubmitHandler<AuthData> = (data) => {
    dispatch(login(data));
  };

  const onFormSubmitError: SubmitErrorHandler<AuthData> = (errors) => {
    errors.email && toast.error('Введите верный e-mail');
    errors.password && toast.error('Пароль должен содержать хотя бы одну букву и одну цифру');
  };

  return (
    <div className="login__form">
      <form
        className="login-form"
        onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}
      >
        <div className="login-form__inner-wrapper">
          <h1 className="title title--size-s login-form__title">Вход</h1>
          <div className="login-form__inputs">
            {Object.keys(formFields).map((input) => {
              const {name, label, placeholder, registerOptions} = formFields[input];
              return (
                <div className="custom-input login-form__input" id={name}>
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
          </div>
          <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
        </div>
        <UserAgreement />
      </form>
    </div>
  );
}
