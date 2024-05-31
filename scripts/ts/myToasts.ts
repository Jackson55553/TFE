import { ToastContent, toast } from 'react-toastify';
import styles from '../../styles/sass/_global.module.scss';
export const errorToast = (message: ToastContent<unknown>) =>
    toast.error(message, { className: `${styles.errorToast}`, bodyClassName: `${styles.bodyErrorToast}` });
export const successToast = (message: ToastContent<unknown>) =>
    toast.success(message, { className: `${styles.successToast}`, bodyClassName: `${styles.bodySuccessToast}` });
export const successToastNoAuto = (message: ToastContent<unknown>) =>
    toast.success(message, {
        className: `${styles.successToast}`,
        bodyClassName: `${styles.bodySuccessToast}`,
        autoClose: false,
    });
export const infoToast = (message: ToastContent<unknown>) =>
    toast.info(message, { className: `${styles.infoToast}`, bodyClassName: `${styles.bodyInfoToast}` });
export const warningToast = (message: ToastContent<unknown>) =>
    toast.warn(message, { className: `${styles.warningToast}`, bodyClassName: `${styles.bodyWarningToast}` });
