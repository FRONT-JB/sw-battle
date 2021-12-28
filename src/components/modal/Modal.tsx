import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <p>Modal</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
