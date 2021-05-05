import React, { useEffect } from 'react';
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import { startloadingStatistics } from '../actions/statistics';


export const StatisticsScreen = () => {


    const dispatch = useDispatch();
    const { weeks, threeWeekSections, lastWeekByOrderType } = useSelector(state => state.statistics);

    useEffect(() => {
        dispatch(startloadingStatistics());
    }, [dispatch])


    const optionsDonut = {
        labels: lastWeekByOrderType.names,
        chart: {
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
            }
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
                                options={optionsDonut}
                                series={lastWeekByOrderType.quantities}
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
