import { toast } from "react-toastify";

import styles from "./toastMessages.module.css";

export const displaySuccessMessage = (text) => {
    toast.success(text, {
        className: styles.toastSuccess
      });
}

export const displayErrorMessage = (text) => {
    toast.error(text, {
        className: styles.toastError,
      });
}