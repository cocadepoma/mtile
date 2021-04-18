import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleResponsive } from '../../actions/nav';

export const ResponsiveNav = () => {

    const { admin } = useSelector(state => state.auth);
    const { showResponsive } = useSelector(state => state.nav);
    const dispatch = useDispatch();

    const handleClickAway = (e) => {
        console.log(e.view.innerHeight, e.view.innerWidth);
        console.log('fuera del responsive nav');
    }

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

            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={`responsive-nav-main-wrapper ${showResponsive ? 'show-responsive' : ''}`}>
                    <div className="responsive-nav-wrapper">
                        <NavLink exact to="/" activeClassName="active-link">
                            <i className="fas fa-home"></i><span >Dashboard</span>
                        </NavLink>

                        {
                            admin &&
                            <NavLink to="/admin" activeClassName="active-link">
                                <i className="fas fa-user-shield"></i><span >Administrador</span>
                            </NavLink>
                        }

                        <NavLink to="/neworder" activeClassName="active-link">
                            <i className="far fa-plus-square"></i><span >Nueva orden</span>
                        </NavLink>

                        <NavLink to="/crew" activeClassName="active-link">
                            <i className="fas fa-users"></i><span >Técnicos</span>
                        </NavLink>

                        <NavLink to="/calendar" activeClassName="active-link">
                            <i className="far fa-calendar-alt"></i><span >Calendario</span>
                        </NavLink>

                        <NavLink to="/docs" activeClassName="active-link">
                            <i className="far fa-file"></i><span >Documentación</span>
                        </NavLink>

                        <NavLink to="/warehouse" activeClassName="active-link">
                            <i className="fas fa-boxes"></i><span >Almacén</span>
                        </NavLink>

                        <NavLink to="/statistics" activeClassName="active-link">
                            <i className="far fa-chart-bar"></i><span >Estadísticas</span>
                        </NavLink>

                        <NavLink to="/history" activeClassName="active-link">
                            <i className="fas fa-history"></i><span >Histórico</span>
                        </NavLink>

                    </div>
                </div>

            </ClickAwayListener>
        </div>
    )
}
