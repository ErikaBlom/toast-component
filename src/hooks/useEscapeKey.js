import { useEffect } from 'react';

export const useEscapeKey = (array, onEscape) => {
    useEffect(() => {
        const onKeydown = (e) => {
            if (e.code === 'Escape')  {
                array.map(a => onEscape(a.id));
            }
        }
    
        window.addEventListener('keydown', onKeydown);

        return () => {
            window.removeEventListener('keydown', onKeydown);
        }
    }, [array, onEscape]);
}