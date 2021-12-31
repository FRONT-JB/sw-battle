import { ChangeEvent, ReactNode, useCallback, useState } from 'react';
import { signInFormList } from '~/constants/form';
import { InputBox, LogoIcons } from '../common';

const SigninForm = () => {
  const [account, setAccount] = useState(signInFormList);

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
          <div className='form__actions'>
            <button type='button' className='btn btn-signin'>
              <span className='btn__label'>Sign in</span>
            </button>
            <span className='line line-or'></span>
            <button type='button' className='btn btn-signup'>
              <span className='btn__label'>Sign up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
