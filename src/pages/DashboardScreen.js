import React from 'react'

export const DashboardScreen = () => {
    return (
        <div className='animate__animated animate__fadeIn dashboard-screen'>
            <h1>DashBoard</h1>

            <div className='main-content_dashboard'>
                <div className="lasts-events-wrapper">
                    <h3>Órdenes Abiertas</h3>
                </div>

                <div className="alerts-wrapper">
                    <h3>Avisos</h3>
                </div>

                <div className="chart-last-week">

                </div>
            </div>
        </div>
    )
}
