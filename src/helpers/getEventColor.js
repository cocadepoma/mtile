
// Depends on orderType of the event, color badge on calendar will be different
export const getEventColor = (event) => {

    const colors = {
        backgroundColor: '#0E377F',
        textColor: 'white'
    }

    switch (event?.orderType) {
        // orange
        case 'Directiva':
            colors.backgroundColor = '#FACC2E';
            break;
        // blue
        case 'Planificada':
            colors.backgroundColor = '#0E377F';
            break;
        // green
        case 'Mant. Preventivo':
            colors.backgroundColor = '#31B404';
            break;
        // red
        case 'Mant. Correctivo':
            colors.backgroundColor = '#FF4000';
            break;
        // turquoise
        case 'Varios':
            colors.backgroundColor = '#04B4AE';
            break;
        // break white
        default:
            colors.backgroundColor = '#F7F8E0';
            break;
    }

    return colors;

}