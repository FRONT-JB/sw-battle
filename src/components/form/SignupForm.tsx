import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSignUpMutation } from '~/api/auth';
import { signUpFormList } from '~/constants/form';
import { ROUTE_PATH } from '~/routes/path';
import { InputBox } from '../common';

const SignupForm = () => {
  const navigate = useNavigate();
  const [signUp, { isSuccess, isError }] = useSignUpMutation();
  const [account, setAccount] = useState(signUpFormList);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isError) {
      setError('Account conflict. Please check your username.');
    }
    if (isSuccess) {
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
    setError('');
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
        setError('The passwords are not the same.');
        setDisabled(false);
        break;
      case isNotNullValue:
        await signUp(signUpParams);
        break;
      default:
        setError('Please check the name and password.');
        setDisabled(false);
    }
  };

  return (
    <div className='wrapper'>
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
            {error && <p className='form__error-message'>{error}</p>}
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
    </div>
  );
};

export default SignupForm;
