import clsx from 'clsx';
import { ReactNode } from 'react';

import './modal.scss';

interface Props {
  isOpen: boolean;
  children: ReactNode | ReactNode[];
  className?: string;
  close: () => void;
  title: string;
}

export default function Modal(props: Props) {
  const { children, className, close, isOpen, title } = props;

  const classNames = clsx('Modal', className, { open: isOpen });

  return (
    <div className={classNames}>
      <div className="content">
        <header>
          <h3>{ title }</h3>
          <button onClick={close}>&#10799;</button>
        </header>
        <div>
            { children }
        </div>
      </div>
    </div>
  );
}
