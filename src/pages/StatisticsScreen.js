import React from 'react';
import Chart from "react-apexcharts";

import { dataBar, dataDonut, optionsBar, optionsDonut } from '../helpers/mockDataCharts';

export const StatisticsScreen = () => {
    return (

        <div className='animate__animated animate__fadeIn dashboard-screen'>

            <h1>Estadísticas</h1>

            <div className='main-content_dashboard'>

                <div className="charts">
                    <div className="chart-wrapper">
                        <h3 className="h3-dashboard charts-header">Intervenciones por sección</h3>
                        <Chart
                            options={optionsBar}
                            series={dataBar}
                            type="bar"
                            width="100%"
                        />
                    </div>
                    <div className="chart-wrapper">
                        <h3 className="h3-dashboard charts-header">Intervenciones Ayer</h3>

                        <Chart
                            className="chart-pie"
                            options={optionsDonut}
                            series={dataDonut}
                            type="donut"
                            width="100%"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}
