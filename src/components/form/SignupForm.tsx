import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSignUpMutation } from '~/api/auth';
import { signUpFormList } from '~/constants/form';
import { TOASTIFY_ALERT } from '~/constants/toastify';
import useToastify from '~/hooks/useToastify';
import { ROUTE_PATH } from '~/routes/path';
import { InputBox, Loading } from '../common';

const SignupForm = () => {
  const navigate = useNavigate();
  const [signUp, { isSuccess, isError, isLoading }] = useSignUpMutation();
  const [account, setAccount] = useState(signUpFormList);
  const [disabled, setDisabled] = useState(false);
  const { setToast } = useToastify();

  useEffect(() => {
    if (isError) {
      setToast('Account conflict. Please check your username.', 3000);
    }
    if (isSuccess) {
      setToast(TOASTIFY_ALERT.SUCCESS('SignUp'));
      navigate(ROUTE_PATH.ROOT);
    }
  }, [isError, isSuccess]);

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

  const handleSubmit = async () => {
    setDisabled(true);
    const isNotNullValue = account.map((input) => input.value).every(Boolean);
    const firstPassword = account.find(
      (input) => input.name === 'password',
    )?.value;
    const confirmPassword = account.find(
      (input) => input.name === 'passwordConfirm',
    )?.value;
    const signUpParams = Object.assign(
      {},
      { username: account[0].value, password: account[1].value },
    );

    switch (true) {
      case firstPassword !== confirmPassword:
        setToast('The passwords are not the same.', 3000);
        setDisabled(false);
        break;
      case isNotNullValue:
        await signUp(signUpParams);
        break;
      default:
        setToast('Please check the name and password.', 3000);
        setDisabled(false);
    }
  };

  if (isLoading) return <Loading isFullSize={true} />;

  return (
    <div className='container form'>
      <div className='form'>
        <div className='form__logo'>
          <div className='text'>SIGN UP</div>
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
              className='btn btn-signup'
              disabled={disabled}
            >
              <span className='btn__label' onClick={handleSubmit}>
                Submit
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
