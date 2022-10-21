import { toast } from 'react-toastify';

export const successToast = (message) =>
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 7000,
  });

export const errorToast = (message) =>
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 7000,
  });
