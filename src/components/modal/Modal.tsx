import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <div className='modal'>
      <p>Modal</p>
      {children}
    </div>
  );
};

export default Modal;
