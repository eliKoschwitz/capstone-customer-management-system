import {toast} from "react-toastify";
import {AxiosError} from "axios";

export default function ToastError(e: any | AxiosError) {

    toast.error(JSON.stringify(e.response.data, null, 2).replaceAll(":", " ")
        .replaceAll("{", "").replaceAll("}", "")
        .replaceAll(",", " ").replaceAll('"', " "), {
        className: "toast-message"});
}


