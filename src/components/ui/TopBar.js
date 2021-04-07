import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { clearEvents } from '../../actions/calendar';

export const TopBar = () => {

    const { name } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearEvents());
        dispatch(logout());
    }

    return (
        <div className="topbar-wrapper">
            <h2 className="logo-topbar">M-tile</h2>
            <div>
                <i className="fas fa-bell"></i>

                <i onClick={handleLogout} className="fas fa-door-open"></i>

                <span>{name}</span>
            </div>


        </div>
    )
}
