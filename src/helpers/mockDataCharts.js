export const dataBar =
    [{
        name: 'Prensas',
        data: [44, 55, 57, 56]
    }, {
        name: 'Esmaltadoras',
        data: [76, 85, 101, 98]
    }, {
        name: 'Hornos',
        data: [35, 41, 36, 26]
    },
    {
        name: 'Clasificación',
        data: [45, 18, 87, 1]
    },
    {
        name: 'Hornos',
        data: [12, 78, 25, 67]
    },
    {
        name: 'LGV',
        data: [2, 10, 12, 8]
    }, {
        name: 'Almacén',
        data: [20, 47, 89, 13]
    }, {
        name: 'Depuradora',
        data: [0, 2, 5, 2]
    },];

export const optionsBar = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['18', '19', '20', '21'],
        title: {
            text: 'Semana'
        }
    },
    yaxis: {
        title: {
            text: 'Intervenciones'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + " intervenciones"
            }
        }
    },



};


export const dataDonut = [23, 42, 56, 75];
export const optionsDonut = {
    labels: ['Directiva', 'Correctiva', 'Preventiva', 'Regulación'],
    chart: {
        toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
        }
    },
};

