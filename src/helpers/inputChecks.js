
// Check username length and add or remove additional ui classes to user input.
export const checkLoginUser = (user) => {
    if (user.trim().length < 3) {
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