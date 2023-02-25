import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

export const ToastContext = React.createContext();

const ToastProvider = ({ children }) => {
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
    
    const value = {
        message,
        setMessage,
        toastVariant,
        setToastVariant,
        toastArray,
        onSubmit,
        onDismiss
    }

    return <ToastContext.Provider value={value}>
        {children}
    </ToastContext.Provider>
}

export default ToastProvider;