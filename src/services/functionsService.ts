import { format } from 'date-fns';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'
import { es } from 'date-fns/locale';

const toastrOptions = {
    positionClass : 'toast-top-center',
    hideDuration: 300,
    timeOut: 3000
};

const presentAlertError = (message: any) => {
    toastr.options = { ...toastrOptions };
    toastr.error(message);
};

const presentAlertWarning = (message: any) => {
    toastr.options = { ...toastrOptions };
    toastr.warning(message);
}

const presentAlertSuccess = (message: any) => {
    toastr.options = { ...toastrOptions };
    toastr.success(message);
};

const presentConfirm = (fn: (arg0: boolean) => void, title: any) => {
    if (confirm(title)) {
        fn(true);
    } else {
        fn(false);
    }
}

const transformDateTime = (dateString: any) => {
        return format(new Date(dateString), 'PPpp');
}

const formatCurrentDateTime = () => {
    const now = new Date();
    return format(now, "EEEE d 'de' MMMM 'de' yyyy 'a las' hh:mm:ss aaa", { locale: es });
};

export default {
    presentAlertError,
    presentAlertWarning,
    presentAlertSuccess,
    presentConfirm,
    transformDateTime,
    formatCurrentDateTime
};
