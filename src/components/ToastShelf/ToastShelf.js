import React, { useContext, useEffect } from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

import { ToastContext } from '../ToastProvider';

function ToastShelf() {
  const { toastArray, onDismiss } = useContext(ToastContext);

  useEffect(() => {
    const dismissToasts = (e) => {
      if (e.code === 'Escape')  {
        toastArray.map(toast => {
          return onDismiss(toast.id);
        })
      }
    }
    
    window.addEventListener('keydown', dismissToasts);

    return () => {
      window.removeEventListener('keydown', dismissToasts);
    }
  }, [onDismiss, toastArray]);

  return (
    <ol 
      className={styles.wrapper} 
      role="region"
      aria-live="assertive"
      aria-label="Notification">
      {toastArray.map(toast =>  
      <li key={toast.id} className={styles.toastWrapper}>
        <Toast variant={toast.variant} dismiss={() => onDismiss(toast.id)}>{toast.message}</Toast>
      </li> )}
    </ol>
  );
}

export default ToastShelf;
