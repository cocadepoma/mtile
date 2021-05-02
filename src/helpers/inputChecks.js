
// Check username length and add or remove additional ui classes to user input.
export const checkLoginUser = (user) => {

    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(user)) {
        document.querySelector('input[name="user"]').classList.add('border-red');
        document.querySelector('.message-error-login-user').classList.add('show-error');
        return false;
    } else {
        document.querySelector('input[name="user"]').classList.remove('border-red');
        document.querySelector('.message-error-login-user').classList.remove('show-error');
        return true;
    }
}

// Check password length and add or remove additional ui classes to password input.
export const checkLoginPassword = (password) => {
    if (password.trim().length < 4) {
        document.querySelector('input[name="password"]').classList.add('border-red');
        document.querySelector('.message-error-login-password').classList.add('show-error');
        return false;
    } else {
        document.querySelector('input[name="password"]').classList.remove('border-red');
        document.querySelector('.message-error-login-password').classList.remove('show-error');
        return true;
    }
}