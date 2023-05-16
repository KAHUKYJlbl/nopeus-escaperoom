import { RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getUserLoadingStatus } from '../../store/user/selectors';
import { login } from '../../store/user/api-actions';
import { AuthData } from '../../types/api/login';

import LoadingSpinner from '../loading-spinner/loading-spinner';
import Checkbox from '../user-agreement/user-agreement';

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
      pattern: /^(?=.*[0-9])(?=.*[a-zA-Z]).{3,}$/,
      required: true,
      minLength: 3,
      maxLength: 15,
    }
  },
};

export default function LoginForm (): JSX.Element {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<AuthData>();
  const userLoadingStatus = useAppSelector(getUserLoadingStatus)

  const onFormSubmit: SubmitHandler<AuthData> = (data) => {
    dispatch(login(data));
  };

  const onFormSubmitError: SubmitErrorHandler<AuthData> = (errors) => {
    errors.email && toast.error('Введите верный e-mail');
    errors.password && toast.error('Пароль должен содержать хотя бы одну букву и одну цифру');
  };

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}
    >
      <fieldset disabled={userLoadingStatus.isLoading}>
        <div className="login-form__inner-wrapper">
          <h1 className="title title--size-s login-form__title">Вход</h1>
          <div className="login-form__inputs">
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
          </div>
          <button className="btn btn--accent btn--general login-form__submit" type="submit">
            {userLoadingStatus.isLoading ? <LoadingSpinner spinnerType='button' /> : 'Войти'}
          </button>
        </div>
        <Checkbox type={'loginAgreement'} />
      </fieldset>
    </form>
  );
}
