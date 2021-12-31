import { ChangeEvent, memo } from 'react';

interface Props {
  label?: string;
  id: string;
  name?: string;
  value?: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: 'off' | 'on' | undefined;
  placeHolder?: string;
}

const InboxBox = ({
  label,
  id,
  name,
  value,
  type = 'text',
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
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeHolder}
      />
    </span>
  );
};

export default memo(InboxBox);
