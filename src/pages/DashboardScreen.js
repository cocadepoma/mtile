import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { TableDashboard } from '../components/dashboard/TableDashboard'
import { getColumnsTableDashboard } from '../helpers/getColumnsTables';
import { getOrdersStillOpen } from '../helpers/getOrdersStillOpen';
import Chart from "react-apexcharts";
import { useDispatch } from 'react-redux';
import { startDeleteWarning, startLoadWarnings } from '../actions/warnings';
import { dataBar, dataDonut, optionsBar, optionsDonut } from '../helpers/mockDataCharts';
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


    useEffect(() => {
        dispatch(startLoadWarnings());
    }, [dispatch]);

    const columns = getColumnsTableDashboard;
    const { events } = useSelector(state => state.calendar);
    const ordersStillOpen = getOrdersStillOpen(events);

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

    return (
        <div className='animate__animated animate__fadeIn dashboard-screen'>
            <h1>DashBoard</h1>

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

                <div className="events-alerts-wrapper">
                    <div className="lasts-events-wrapper">
                        <div className="header-warnings">
                            <h3 className="h3-dashboard">
                                <span className="prueba">ó</span>rdenes abiertas
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
                                <span className="prueba">ú</span>ltimos avisos
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
