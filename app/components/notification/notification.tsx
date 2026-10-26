import clsx from 'clsx';

import './notification.scss';

enum Type {
  default,
  success,
  warning,
  error
}

interface Props {
  type?: Type;
  children: any;
}

function Notification (props: Props) {
  const { type = Type.default, children } = props;

  const classNames: string = clsx(
    'Notification', 
    {
      success: type === Type.success, 
      warning: type === Type.warning, 
      error: type === Type.error,
    }
  );

  return (
  <div className={classNames}>
    {children}
  </div>
  );
}

Notification.Type = Type;

export default Notification;