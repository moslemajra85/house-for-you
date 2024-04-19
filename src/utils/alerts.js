import { toast } from 'react-toastify';

export const notify = (message) => {
  toast.info(message);
};

export const warn = (message) => {
  toast.error(message);
};
