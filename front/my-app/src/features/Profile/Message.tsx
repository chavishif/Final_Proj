import React, { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  children: ReactNode;
};

function Message({ variant, children }: Props) {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  );
}

export default Message;
