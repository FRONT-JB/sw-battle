import { toast } from 'react-toastify';

const useToastify = () => {
  const setToast = (toastValue: string, delay?: number) => {
    toast.dark(`${toastValue}`, {
      position: 'top-center',
      autoClose: delay || 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  return { setToast };
};

export default useToastify;
