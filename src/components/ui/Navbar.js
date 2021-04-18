import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleNav } from '../../actions/nav';

export const Navbar = () => {

    const { navExtended } = useSelector(state => state.nav);
    const { admin } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleToggleNav = () => {
        dispatch(toggleNav());
    }
    const handleClickAway = () => {
        if (!navExtended) {
            return;
        }

        dispatch(toggleNav());
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <nav className={!navExtended ? '' : 'nav-large'}>

                <div className="nav-icons-wrapper">

                    <div className="mb-3">

                        <NavLink exact to="/" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                            <i className="fas fa-home"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Dashboard</span>
                        </NavLink>

                        {
                            admin &&
                            <NavLink to="/admin" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                                <i className="fas fa-user-shield"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Administrador</span>
                            </NavLink>
                        }

                        <NavLink to="/neworder" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                            <i className="far fa-plus-square"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Nueva orden</span>
                        </NavLink>

                        <NavLink to="/crew" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                            <i className="fas fa-users"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Técnicos</span>
                        </NavLink>

                        <NavLink to="/calendar" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                            <i className="far fa-calendar-alt"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Calendario</span>
                        </NavLink>

                        <NavLink to="/docs" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                            <i className="far fa-file"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Documentación</span>
                        </NavLink>

                        <NavLink to="/warehouse" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                            <i className="fas fa-boxes"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Almacén</span>
                        </NavLink>

                        <NavLink to="/statistics" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                            <i className="far fa-chart-bar"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Estadísticas</span>
                        </NavLink>

                        <NavLink to="/history" className={navExtended ? 'nav-icon-wrapper' : 'nav-icon-wrapper nav-icon-wrapper-reset-grid'} activeClassName="active-link">
                            <i className="fas fa-history"></i><span className={!navExtended ? 'nav-text' : 'nav-text show-text'}>Histórico</span>
                        </NavLink>

                    </div>


                    {
                        (!navExtended)
                            ?
                            (
                                <div className="nav-icon-wrapper extend-nav" onClick={handleToggleNav}>
                                    <i className="fas fa-chevron-right animate__animated animate__fadeIn"></i>
                                </div>
                            )
                            :
                            (
                                <div className="nav-icon-wrapper reduce-nav nav-icon-wrapper-reset-grid animate__animated animate__fadeIn animate__slow" onClick={handleToggleNav}>
                                    <i className="fas fa-chevron-left"></i>
                                </div>
                            )
                    }
                </div>

            </nav>
        </ClickAwayListener>
    )
}
