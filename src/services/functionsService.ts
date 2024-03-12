import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

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

export default {
    presentAlertError,
    presentAlertWarning,
    presentAlertSuccess
};
