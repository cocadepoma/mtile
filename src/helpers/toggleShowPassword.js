export const toggleShowPassword = () => {
    const input = document.querySelector('input[name="password"]');
    const icon = document.querySelector('.icon-pwd');

    input.type === 'password' ? input.type = "text" : input.type = "password";

    if (icon.classList.contains('fa-eye-slash')) {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}