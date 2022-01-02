import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSignInMutation } from '~/api/auth';
import { signInFormList } from '~/constants/form';
import { ROUTE_PATH } from '~/routes/path';
import { InputBox, LogoIcons } from '../common';

const SigninForm = () => {
  const navigate = useNavigate();
  const [signIn, { isSuccess, isError, data }] = useSignInMutation();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [account, setAccount] = useState(signInFormList);

  useEffect(() => {
    if (isError) {
      setError('Login failed. Please check your account.');
      setDisabled(false);
    }
    if (isSuccess) {
      navigate(ROUTE_PATH.ROOT, { replace: true });
    }
  }, [isSuccess, isError, error]);

  const handleAccount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const str_space = /\s/;
    if (str_space.test(value)) return;
    setAccount((prev) =>
      prev.map((input) =>
        input.name !== name ? input : Object.assign(input, { value: value }),
      ),
    );
  }, []);

  const handleSignIn = async (signInParams) => {
    try {
      await signIn(signInParams);
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  };

  const handleSubmit = () => {
    setDisabled(true);
    const isNotNullValue = account.map((input) => input.value).every(Boolean);
    const isNullUserName = account[0].value === '';
    const isNullPassword = account[1].value === '';
    const signInParams = Object.assign(
      {},
      { username: account[0].value, password: account[1].value },
    );

    switch (true) {
      case isNullUserName:
        setError('Check Your Name');
        setDisabled(false);
        break;
      case isNullPassword:
        setError('Check Your Password');
        setDisabled(false);
        break;
      case isNotNullValue:
        handleSignIn(signInParams);
        break;
      default:
    }
  };

  return (
    <div className='wrapper'>
      <div className='container form'>
        <div className='form'>
          <div className='form__logo'>
            <LogoIcons />
          </div>
          <div className='form__input'>
            {account.map(({ name, label, value, type }) => (
              <InputBox
                key={name}
                id={name}
                name={name}
                value={value}
                label={label}
                type={type}
                onChange={handleAccount}
              />
            ))}
          </div>
          {error && <p className='form__error-message'>{error}</p>}
          <div className='form__actions'>
            <button
              type='button'
              className='btn btn-signin'
              disabled={disabled}
              onClick={handleSubmit}
            >
              <span className='btn__label'>Sign in</span>
            </button>
            <span className='line line-or'></span>
            <button
              type='button'
              className='btn btn-signup'
              disabled={disabled}
              onClick={() => navigate(ROUTE_PATH.SIGNUP)}
            >
              <span className='btn__label'>Sign up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
