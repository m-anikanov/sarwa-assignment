import React, { useRef, useState, useCallback, useEffect } from 'react';

function useToastsState(maxCount: number = 3): [React.ReactNode[], (newToast: React.ReactNode, timeout?: number) => void] {
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [toasts, setToasts] = useState<React.ReactNode[]>([]);

  const hideToast = useCallback(() => {
    const oldestTimeout = timeouts.current.shift();
    clearTimeout(oldestTimeout);
    setToasts((prevState) => prevState.slice(1));
  }, [timeouts]);

  const pushToast = useCallback((newToast: React.ReactNode, timeout: number = 3000) => {
    let stateLength = 0;
    setToasts((prevState) => {
      const nextState = [
        ...prevState,
        newToast,
      ];
      stateLength = nextState.length;
      return nextState;
    });

    const timeoutRef = setTimeout(() => hideToast(), timeout);
    timeouts.current.push(timeoutRef);

    if (stateLength > maxCount) {
      hideToast();
    }
  }, [hideToast]);

  useEffect(() => () => {
    timeouts.current.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }, []);

  return [toasts, pushToast];
}

export { useToastsState };