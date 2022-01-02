import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSignUpMutation } from '~/api/auth';
import { signUpFormList } from '~/constants/form';
import { ROUTE_PATH } from '~/routes/path';
import { InputBox } from '../common';

const SignupForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading, isError }] = useSignUpMutation();
  const [account, setAccount] = useState(signUpFormList);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isError) {
      console.log('error');
    }
  }, [isError]);

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
        break;
      case isNotNullValue:
        await signUp(signUpParams).then(() => navigate(ROUTE_PATH.SIGNIN));
        break;
      default:
        setError('Please check the name and password.');
    }
  };

  return (
    <div className='wrapper'>
      <div className='container form'>
        <div className='form'>
          <div className='form__logo'>
            <div className='text'>SIGN UP</div>
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
              className='btn btn-signup'
              disabled={isLoading}
            >
              <span className='btn__label' onClick={handleSubmit}>
                Submit
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
