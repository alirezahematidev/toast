import { create } from "zustand";
import { createId } from "@paralleldrive/cuid2";

interface ToastProps {
  message: string;
  duration: number;
}

type ToastManager = {
  toasts: Map<string, ToastProps>;
};

export const useToastManager = create<ToastManager>(() => ({ toasts: new Map() }));

export const toast = (props: ToastProps): string => {
  const toastId = createId();

  useToastManager.setState(({ toasts }) => ({ toasts: new Map(toasts).set(toastId, props) }));

  return toastId;
};

export const destroy = (toastId: string) => {
  useToastManager.setState(({ toasts }) => ({ toasts: toasts.delete(toastId) ? new Map(toasts) : toasts }));
};
