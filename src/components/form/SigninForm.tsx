import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useSignInMutation } from '~/api/auth';
import { signInFormList } from '~/constants/form';
import { TOASTIFY_ALERT } from '~/constants/toastify';
import useToastify from '~/hooks/useToastify';
import { ROUTE_PATH } from '~/routes/path';
import { authUserSelector } from '~/store/slices/auth';
import { InputBox, Loading, LogoIcons } from '../common';

const SigninForm = () => {
  const navigate = useNavigate();
  const authInfo = useSelector(authUserSelector);
  const [signIn, { isError, isLoading }] = useSignInMutation();
  const [disabled, setDisabled] = useState(false);
  const [account, setAccount] = useState(signInFormList);
  const { setToast } = useToastify();

  useEffect(() => {
    if (isError) {
      setToast(TOASTIFY_ALERT.FAILED('Login'));
      setDisabled(false);
    }
    if (authInfo && authInfo.role === 'Pending') {
      navigate(ROUTE_PATH.PENDING);
    }
  }, [isError, authInfo]);

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

  const handleSignIn = async (signInParams: {
    username: string;
    password: string;
  }) => {
    try {
      await signIn(signInParams);
    } catch (error) {
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
        toast('Check Your Name');
        setDisabled(false);
        break;
      case isNullPassword:
        toast('Check Your Password');
        setDisabled(false);
        break;
      case isNotNullValue:
        handleSignIn(signInParams);
        break;
      default:
    }
  };

  if (isLoading) return <Loading isFullSize={true} />;

  return (
    <div className='container form'>
      <div className='form'>
        <div className='form__logo'>
          <LogoIcons />
        </div>
        <form>
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
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
