import { ReactNode } from 'react';

import Modal from '@/components/modal';

import './confirm.scss';

interface Props {
  children: ReactNode | ReactNode[];
  close: () => void;
  confirm: () => void;
  isOpen: boolean;
  title: string;
}

export default function Confirm(props: Props) {
  const { children, close, confirm, isOpen, title } = props;

  function onConfirm() {
    close();
    confirm();
  }

  return (
    <Modal className="Confirm" close={close} isOpen={isOpen} title={ title }>
      { children }
      <footer>
        <button onClick={onConfirm}>OK</button>
        <button onClick={close}>Cancel</button>
      </footer>
    </Modal>
  );  
}