
// Depends on orderType of the event, color badge on calendar will be different
export const getEventColor = (event, types) => {

    let colors = {
        backgroundColor: '#0E377F',
        textColor: 'white'
    }

    if (types && types.length > 0) {
        const typeId = event.orderType;

        const type = types.find(type => type.id === typeId);

        if (type) {
            switch (type.name) {
                // orange
                case 'Directiva':
                    colors.backgroundColor = '#FACC2E';
                    break;
                // blue
                case 'Planificada':
                    colors.backgroundColor = '#0E377F';
                    break;
                // green
                case 'Preventiva':
                    colors.backgroundColor = '#31B404';
                    break;
                // red
                case 'Correctiva':
                    colors.backgroundColor = '#FF4000';
                    break;
                // turquoise
                case 'Otros':
                    colors.backgroundColor = '#04B4AE';
                    break;
                // break white
                default:
                    colors.backgroundColor = '#000';
                    break;
            }

        }

    }

    return colors;

}