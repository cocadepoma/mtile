import React, { useEffect } from 'react';
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import { startloadingStatistics } from '../actions/statistics';


export const StatisticsScreen = () => {


    const dispatch = useDispatch();
    const {
        weeks,
        threeWeekSections,
        lastWeekByOrderType,
        interventionsWeeks,
        totalTimeByWeek,
        lastWeekByBreakdown,
        lastWeekByTechnician,
    } = useSelector(state => state.statistics);

    const { weeksIntervetions, weeksInterventionsCounts } = interventionsWeeks;
    const { weeksTime, weeksTotalTime } = totalTimeByWeek;

    useEffect(() => {
        dispatch(startloadingStatistics());
    }, [dispatch])


    const optionsDonutOrderType = {
        title: {
            text: 'Intervenciones',
            style: {
                fontSize: '11px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        labels: lastWeekByOrderType.names,
        chart: {
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
            }
        },
    };

    const optionsDonutBreakdown = {
        title: {
            text: 'Averías',
            style: {
                fontSize: '11px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        labels: lastWeekByBreakdown.names,
        chart: {
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
            }
        },
    };

    const optionsDonutTechnician = {
        series: lastWeekByTechnician.quantities,
        options: {
            title: {
                text: 'Intervenciones',
                style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#263238'
                },
            },
            legend: {
                show: true
            },
            chart: {
                type: 'polarArea',
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                }
            },
            stroke: {
                colors: ['#fff']
            },
            fill: {
                opacity: 0.8
            },
            labels: lastWeekByTechnician.names,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };

    const optionsBar = {
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
            categories: weeks,
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


    const dataBarInterventionsWeeks = {
        series: [{
            data: weeksInterventionsCounts
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            colors: ['#028ffb', '#ff4560', '#feb019', '#01e396'],
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            yaxis: {
                title: {
                    text: 'Intervenciones'
                }
            },
            xaxis: {
                categories: weeksIntervetions,
                labels: {
                    style: {
                        colors: ['#028ffb', '#ff4560', '#feb019', '#01e396'],
                        fontSize: '12px'
                    }
                },
                title: {
                    text: 'Semana'
                }
            }
        }
    }

    const dataBarTotalTimeWeeks = {

        series: [{
            name: "Horas",
            data: weeksTotalTime
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            yaxis: {
                title: {
                    text: 'Horas'
                }
            },
            xaxis: {
                categories: weeksTime,

                title: {
                    text: 'Semana'
                }
            }
        }
    }



    return (

        <div className='animate__animated animate__fadeIn dashboard-screen'>

            <h1>Estadísticas</h1>

            <div className='main-content_dashboard'>

                <div className="charts">
                    <div className="chart-wrapper">
                        <h3 className="h3-dashboard charts-header">Intervenciones por sección/semana</h3>

                        {
                            threeWeekSections.length > 0 && weeks.length > 0 &&
                            < Chart
                                options={optionsBar}
                                series={threeWeekSections}
                                type="bar"
                                width="100%"
                            />
                        }

                    </div>
                    <div className="chart-wrapper">
                        <h3 className="h3-dashboard charts-header">Intervenciones semana previa</h3>

                        {
                            lastWeekByOrderType && lastWeekByOrderType.quantities.length > 0 && lastWeekByOrderType.names.length > 0 &&

                            <Chart
                                className="chart-pie"
                                options={optionsDonutOrderType}
                                series={lastWeekByOrderType.quantities}
                                type="donut"
                                width="100%"
                            />
                        }
                    </div>
                </div>

                <div className="charts2 mt-3">
                    <div className="chart-wrapper">
                        <h3 className="h3-dashboard charts-header">Total intervenciones/semana</h3>

                        {
                            interventionsWeeks && weeksIntervetions.length > 0 && weeksInterventionsCounts.length > 0 &&


                            < Chart
                                options={dataBarInterventionsWeeks.options}
                                series={dataBarInterventionsWeeks.series}
                                type="bar"
                                width="100%"
                            />

                        }
                    </div>
                    <div className="chart-wrapper">
                        <h3 className="h3-dashboard charts-header">Total horas/semana intervenciones</h3>
                        {
                            totalTimeByWeek && weeksTime.length > 0 && weeksTotalTime.length > 0 &&


                            < Chart
                                options={dataBarTotalTimeWeeks.options}
                                series={dataBarTotalTimeWeeks.series}
                                type="line"
                                width="100%"
                            />

                        }
                    </div>
                </div>

                <div className="charts2 mt-3">
                    <div className="chart-wrapper">
                        <h3 className="h3-dashboard charts-header">Intervenciones por técnico semana previa</h3>

                        {
                            lastWeekByTechnician && lastWeekByTechnician.quantities.length > 0 && lastWeekByTechnician.names.length > 0 &&

                            <Chart
                                className="chart-pie"
                                options={optionsDonutTechnician.options}
                                series={optionsDonutTechnician.series}
                                type="polarArea"
                                width="100%"
                            />
                        }

                    </div>
                    <div className="chart-wrapper">
                        <h3 className="h3-dashboard charts-header">Tipo averías semana previa</h3>

                        {
                            lastWeekByBreakdown && lastWeekByBreakdown.quantities.length > 0 && lastWeekByBreakdown.names.length > 0 &&

                            <Chart
                                className="chart-pie"
                                options={optionsDonutBreakdown}
                                series={lastWeekByBreakdown.quantities}
                                type="donut"
                                width="100%"
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
