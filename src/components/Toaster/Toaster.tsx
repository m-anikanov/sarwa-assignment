import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToasterProps {
  toasts: React.ReactNode[];
}

const Toaster: React.FC<ToasterProps> = ({ toasts }) => {
  return (
    <ToastContainer className="p-3" position="bottom-end">
      {toasts.map((toast) => (
        <Toast>
          <Toast.Body>
            {toast}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default React.memo(Toaster);
