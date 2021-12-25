import { RefObject, useEffect } from 'react';

type Handler = (e?: Event) => void;

const useOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'touchstart' = 'mousedown',
) => {
  useEffect(() => {
    const listen = (e: Event) => {
      const el = ref?.current;
      if (!el || el.contains(e.target as Node)) {
        return;
      }
      handler(e);
    };
    document.addEventListener(mouseEvent, listen);
    return () => {
      document.removeEventListener(mouseEvent, listen);
    };
  }, [ref, handler]);
};

export default useOutside;
