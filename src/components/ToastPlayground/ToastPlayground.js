import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import Button from '../Button';
import ToastShelf from '../ToastShelf/ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('notice');
  const [toastArray, setToastArray] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newToastArray = [...toastArray, { id: uuid(), variant: toastVariant, message }];
    setToastArray(newToastArray);

       //reset values
       setMessage('');
       setToastVariant('notice');
  }

  const onDismiss = (toastId) => {
    const newToastArray = toastArray.filter(toast => toast.id !== toastId);
    setToastArray(newToastArray);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {toastArray.length > 0 && <ToastShelf toastArray={toastArray} dismiss={onDismiss} />}
      <form onSubmit={onSubmit}>
      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={e => setMessage(e.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(variant => <label key={variant} htmlFor={`variant-${variant}`}>
              <input
                id={`variant-${variant}`}
                type="radio"
                name="variant"
                value={variant}
                checked={variant === toastVariant}
                onChange={() => setToastVariant(variant)}
              />
              {variant}
            </label>)}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
