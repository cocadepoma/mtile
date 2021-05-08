export const checkTokenDate = () => {
    let time = 0;
    const now = new Date().getTime();
    const dateToken = parseInt(localStorage.getItem('token-init-date')) || 0;
    time = (now - dateToken) / 1000;
    time /= 3600;
    time = Math.abs(Math.round(time));

    return time;
}