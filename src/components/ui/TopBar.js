import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { clearEvents } from '../../actions/calendar';
import { clearFactory } from '../../actions/factory';
import { clearTechnicians } from '../../actions/technician';
import { clearWarehouse } from '../../actions/warehouse';
import { clearWarnings } from '../../actions/warnings';

export const TopBar = () => {

    const { name } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearEvents());
        dispatch(clearFactory());
        dispatch(clearTechnicians());
        dispatch(clearWarnings());
        dispatch(clearWarehouse());
        dispatch(clearTechnicians());
        dispatch(logout());
    }

    return (
        <div className="topbar-wrapper">
            <h2 className="logo-topbar">M-tile</h2>
            <div>
                {/* <i className="fas fa-bell"></i> */}

                <span>{name}</span>
                <i onClick={handleLogout} className="fas fa-sign-out-alt"></i>

            </div>


        </div>
    )
}
