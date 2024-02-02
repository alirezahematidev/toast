import { Children, ReactElement, memo, startTransition, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { destroy, useToastManager } from ".";
import { useShallow } from "zustand/react/shallow";
import { isCuid } from "@paralleldrive/cuid2";

interface ToastComponentProps {
  id: string;
  message: string;
  duration: number;
}

const ToastComponent = memo(({ id, duration, message }: ToastComponentProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => destroy(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id]);

  return (
    <div data-toast-id={id} className="w-full p-4 bg-red-400">
      {message}
    </div>
  );
});

interface ToastValidatorProps {
  children: ReactElement<ToastComponentProps>[];
}

const ToastValidator = ({ children }: ToastValidatorProps) => {
  const validatedChildren = useMemo(() => Children.map(children, (child) => (isCuid(child.props.id) ? child : null)), [children]);

  return <div className="toast-container w-[400px] right-0 top-0">{validatedChildren}</div>;
};

const ToastContainer = () => {
  const disabled = useRef<boolean>(true);

  const toasts = useToastManager(useShallow((state) => Array.from(state.toasts.entries())));

  useEffect(() => {
    const unsubscribe = useToastManager.subscribe(({ toasts }) => {
      disabled.current = toasts.size === 0;
    });

    return unsubscribe;
  }, []);

  if (disabled.current) return null;

  return (
    <ToastValidator>
      {toasts.map(([id, props]) => (
        <ToastComponent key={id} id={id} {...props} />
      ))}
    </ToastValidator>
  );
};

export const Toast = (): JSX.Element => {
  return createPortal(<ToastContainer />, document.body);
};
