import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleResponsive } from '../../actions/nav';

export const ResponsiveNav = () => {

    const { admin } = useSelector(state => state.auth);
    const { showResponsive } = useSelector(state => state.nav);
    const dispatch = useDispatch();

    const showResponsiveNav = () => {
        dispatch(toggleResponsive());
    }

    return (
        <div className="responsive-nav-main-container">

            <div className={`burger ${showResponsive ? 'hide-burger' : ''}`} onClick={showResponsiveNav}>
                <div className={`line ${showResponsive ? 'rotate-line-1' : ''}`}></div>
                <div className={`line ${showResponsive ? 'hide-line' : ''}`}></div>
                <div className={`line ${showResponsive ? 'rotate-line-2' : ''}`}></div>
            </div>

            <div className={`responsive-nav-main-wrapper ${showResponsive ? 'show-responsive' : ''}`}>
                <div className="responsive-nav-wrapper">
                    <NavLink
                        exact to="/"
                        activeClassName="active-link"
                        className={`${showResponsive ? 'show-link' : ''}`}>
                        <i className="fas fa-home"></i><span >Dashboard</span>
                    </NavLink>

                    {
                        admin &&
                        <NavLink
                            to="/admin"
                            activeClassName="active-link"
                            className={`${showResponsive ? 'show-link' : ''}`}>
                            <i className="fas fa-user-shield"></i><span >Administrador</span>
                        </NavLink>
                    }

                    <NavLink
                        to="/neworder"
                        activeClassName="active-link"
                        className={`${showResponsive ? 'show-link' : ''}`}>
                        <i className="far fa-plus-square"></i><span >Nueva orden</span>
                    </NavLink>

                    <NavLink
                        to="/crew"
                        activeClassName="active-link"
                        className={`${showResponsive ? 'show-link' : ''}`}>
                        <i className="fas fa-users"></i><span >Técnicos</span>
                    </NavLink>

                    <NavLink
                        to="/calendar"
                        activeClassName="active-link"
                        className={`${showResponsive ? 'show-link' : ''}`}>
                        <i className="far fa-calendar-alt"></i><span >Calendario</span>
                    </NavLink>

                    <NavLink
                        to="/docs"
                        activeClassName="active-link"
                        className={`${showResponsive ? 'show-link' : ''}`}>
                        <i className="far fa-file"></i><span >Documentación</span>
                    </NavLink>

                    <NavLink
                        to="/warehouse"
                        activeClassName="active-link"
                        className={`${showResponsive ? 'show-link' : ''}`}>
                        <i className="fas fa-boxes"></i><span >Almacén</span>
                    </NavLink>

                    <NavLink
                        to="/statistics"
                        activeClassName="active-link"
                        className={`${showResponsive ? 'show-link' : ''}`}>
                        <i className="far fa-chart-bar"></i><span >Estadísticas</span>
                    </NavLink>

                    <NavLink
                        to="/history"
                        activeClassName="active-link"
                        className={`${showResponsive ? 'show-link' : ''}`}>
                        <i className="fas fa-history"></i><span >Histórico</span>
                    </NavLink>

                </div>
            </div>
        </div>
    )
}
