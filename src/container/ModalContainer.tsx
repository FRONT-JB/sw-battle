import { createPortal } from 'react-dom';
import { Modal } from '~/components/modal';

const ModalContainer = () => {
  return createPortal(<Modal />, document.getElementById('modal')!);
};

export default ModalContainer;
