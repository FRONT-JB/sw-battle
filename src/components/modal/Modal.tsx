import classNames from 'classnames';

const Modal = () => {
  return (
    <div className={classNames('modal')}>
      <div className='modal__dimm' />
      <div className='modal__wrapper'>
        <p>Modal</p>
      </div>
    </div>
  );
};

export default Modal;
