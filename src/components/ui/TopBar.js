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

export const TopBar = () => {

    const { name } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(clearEvents());
        dispatch(clearFactory());
        dispatch(clearTechnicians());
        dispatch(clearWarnings());
        dispatch(clearWarehouse());
        dispatch(clearTechnicians());
        dispatch(statisticsClear());
        dispatch(logout());
        localStorage.clear();
    }

    const handleLogoClick = () => {
        history.push('/');
    }

    return (
        <div className="topbar-wrapper">
            {/* <h2 className="logo-topbar">M-tile</h2> */}

            <img src={`${process.env.PUBLIC_URL}/assets/images/m_tile_topbar.png`} alt="logo_mtile" onClick={handleLogoClick} />
            {/* <img src={`${process.env.PUBLIC_URL}/assets/images/m_tile_white.png`} alt="logo_mtile" /> */}

            <div>
                {/* <i className="fas fa-bell"></i> */}

                <span>{name}</span>
                <i onClick={handleLogout} className="fas fa-sign-out-alt"></i>

            </div>


        </div>
    )
}
