import { ChangeEvent } from 'react';

interface Props {
  label?: string;
  id: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: 'off' | 'on' | undefined;
  placeHolder?: string;
}

const InboxBox = ({
  label,
  id,
  name,
  onChange,
  autoComplete = 'off',
  placeHolder = '',
}: Props) => {
  return (
    <span className='inpbox'>
      {label && (
        <label className='inpbox__label' htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className='inpbox__input'
        type='text'
        id={id}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeHolder}
      />
    </span>
  );
};

export default InboxBox;
