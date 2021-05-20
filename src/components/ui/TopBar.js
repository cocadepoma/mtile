import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { clearEvents } from '../../actions/calendar';
import { clearFactory } from '../../actions/factory';
import { clearTechnicians } from '../../actions/technician';
import { clearWarehouse } from '../../actions/warehouse';
import { clearWarnings } from '../../actions/warnings';
import { useHistory } from 'react-router';
import { statisticsClear } from '../../actions/statistics';
import { uiToggleAlerts } from '../../actions/ui';
import ClickAwayListener from 'react-click-away-listener';

export const TopBar = () => {

    const { name } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const history = useHistory();
    const { modalAlert } = useSelector(state => state.ui);
    const { itemsToOrder } = useSelector(state => state.warehouse);

    const handleLogout = () => {
        dispatch(clearEvents());
        dispatch(clearFactory());
        dispatch(clearTechnicians());
        dispatch(clearWarnings());
        dispatch(clearWarehouse());
        dispatch(clearTechnicians());
        dispatch(statisticsClear());
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
    }

    const handleLogoClick = () => {
        history.push('/');
    }

    const handleToggleAlerts = (e) => {

        if (modalAlert) {
            if (e.target.className === 'bell-alert' && !e.nativeEvent) {
                return;
            }
        }
        if (!modalAlert) {
            if (e.target.className !== 'bell-alert' && !e.nativeEvent) {
                return;
            }
        }
        if (!modalAlert) {
            if (e.target.className === 'bell-alert' && !e.nativeEvent) {
                return;
            }
        }
        dispatch(uiToggleAlerts());
    }

    return (
        <div className="topbar-wrapper">
            {/* <h2 className="logo-topbar">M-tile</h2> */}

            <img src={`${process.env.PUBLIC_URL}/assets/images/m_tile_topbar.png`} alt="logo_mtile" onClick={handleLogoClick} />
            {/* <img src={`${process.env.PUBLIC_URL}/assets/images/m_tile_white.png`} alt="logo_mtile" /> */}

            <div className="topbar-user-options">

                <span className="user">{name}</span>

                <div className="wrapper-bell-alert">
                    <img className="bell-alert" src={`${process.env.PUBLIC_URL}/assets/images/bell.png`}
                        alt="logo_bell"
                        onClick={handleToggleAlerts} />

                    {
                        itemsToOrder && itemsToOrder.length > 0 &&
                        <div className="circle-alert">!</div>
                    }

                    {

                        <ClickAwayListener onClickAway={handleToggleAlerts}>
                            <div className={`wrapper-alerts ${modalAlert ? 'extend-alerts' : ''}`}>
                                {
                                    itemsToOrder && itemsToOrder.length > 0

                                        ? itemsToOrder.map(item => {
                                            return (
                                                modalAlert
                                                && <div key={item.id} className="alert-text animate__animated animate__fadeIn">
                                                    <span className="bold-orange">{item.quantity <= 0 ? "Producto agotado" : "Producto casi agotado"}</span>
                                                    <span>
                                                        <span className="bold">Item:</span>
                                                        {item.description}
                                                    </span>
                                                    <span>
                                                        <span className="bold">Referencia:</span>
                                                        {item.code}
                                                    </span>
                                                </div>
                                            );
                                        })
                                        : modalAlert
                                        && <div className="alert-text-default">
                                            <span className="no-alert-text animate__animated animate__fadeIn">No hay alertas</span>
                                        </div>

                                }
                            </div>
                        </ClickAwayListener>
                    }

                </div>

                <i onClick={handleLogout} className="fas fa-sign-out-alt"></i>
            </div>


        </div>
    )
}
