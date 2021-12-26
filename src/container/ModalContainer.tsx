import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { Modal } from '~/components/modal';
import { popupSelector } from '~/store/slices/common';

const ModalContainer = () => {
  const { isOpen } = useSelector(popupSelector);
  if (!isOpen) return null;
  return createPortal(<Modal />, document.getElementById('modal')!);
};

export default ModalContainer;
