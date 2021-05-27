import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { TableDashboard } from '../components/dashboard/TableDashboard'
import { getColumnsTableDashboard } from '../helpers/getColumnsTables';
import { getOrdersStillOpen } from '../helpers/getOrdersStillOpen';
import Chart from "react-apexcharts";
import { useDispatch } from 'react-redux';
import { startDeleteWarning, startLoadWarnings } from '../actions/warnings';
import { ModalToastify } from '../components/ui/ModalToastify';
import { toast, ToastContainer } from 'react-toastify';
import { ModalWarning } from '../components/dashboard/ModalWarning';
import { uiOpenModal } from '../actions/ui';
import { disableScroll } from '../helpers/disable-enable-scroll';
import { Link } from 'react-router-dom';

export const DashboardScreen = () => {

    const dispatch = useDispatch();
    const { warnings } = useSelector(state => state.warning);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showLabels, setShowLabels] = useState(true);


    useEffect(() => {
        dispatch(startLoadWarnings());
    }, [dispatch]);

    useEffect(() => {
        const width = window.innerWidth;

        if (width<500) {
            setShowLabels(false);
        }
    }, []);

    const columns = getColumnsTableDashboard;
    const { events } = useSelector(state => state.calendar);
    const ordersStillOpen = getOrdersStillOpen(events);

    const { weeks, threeWeekSections, lastWeekByOrderType } = useSelector(state => state.statistics);


    const handleAddWarning = () => {
        setShowWarningModal(true);
        disableScroll();
        dispatch(uiOpenModal());
    };

    const showDeleteWarning = (id, i) => {

        toast.warn(<ModalToastify
            handleDeleteItem={() => handleDeleteWarning(id)}
            code={warnings[i].description}
            message="Estás seguro de borrar el aviso " />,
            {
                position: toast.POSITION.TOP_CENTER,
                closeOnClick: false,
                autoClose: false,
                toastId: '1'
            });

    }
    const handleDeleteWarning = (id) => {
        dispatch(startDeleteWarning(id));
    };

    const optionsDonut = {
        labels: lastWeekByOrderType.names,
        chart: {
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
            }
        },
        legend: {
            show: showLabels
        }
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
        legend: {
            show: showLabels,
            position: "bottom",
            containerMargin: {
                top: 30
            }
        },
        responsive: [
            {
                breakpoint: 500,
                options: {
                    legend: {
                        fontSize: "8px"
                    }
                }
            }
        ]
    };

    return (
        <div className='animate__animated animate__fadeIn dashboard-screen'>
            <h1>DashBoard</h1>

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
                            lastWeekByOrderType && lastWeekByOrderType?.quantities?.length > 0 && lastWeekByOrderType?.names?.length > 0 &&

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

                <div className="events-alerts-wrapper">
                    <div className="lasts-events-wrapper">
                        <div className="header-warnings">
                            <h3 className="h3-dashboard">
                                Eventos activos
                            </h3>
                            <Link to="/neworder"><i className="fas fa-plus-circle"></i></Link>
                        </div>

                        <div className="lasts-events">
                            {ordersStillOpen.length > 0 && <TableDashboard columns={columns} data={ordersStillOpen} />}
                        </div>
                    </div>

                    <div className="lasts-alerts-wrapper">
                        <div className="header-warnings">
                            <h3 className="h3-dashboard">
                                Avisos
                            </h3>
                            <i className="fas fa-plus-circle" onClick={handleAddWarning}></i>
                        </div>

                        <div className="alerts-wrapper">

                            {warnings &&

                                warnings.map((warning, i) => {

                                    return <div key={warning.id} className="warnings">
                                        <div className="warning">
                                            <p>{warning.description}</p>
                                            <i className="far fa-trash-alt" onClick={() => showDeleteWarning(warning.id, i)}></i>
                                        </div>
                                    </div>

                                })
                            }
                        </div>
                    </div>
                </div>

                {showWarningModal && <ModalWarning setShowWarningModal={setShowWarningModal} />}

                <ToastContainer />
            </div>
        </div>
    )
}
