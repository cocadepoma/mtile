
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTechnician } from '../actions/technician';
import { uiOpenModal } from '../actions/ui';

import { ButtonNew } from '../components/ui/ButtonNew';
import { CrewModal } from '../components/crew/CrewModal';
import { disableScroll } from '../helpers/disable-enable-scroll';

export const CrewScreen = () => {

    const { technicians } = useSelector(state => state.crew);
    const { admin } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const openModalTechnician = (e) => {

        const id = e.target.attributes[1].value;
        const clickedTechnician = technicians.find((technician) => {
            return technician.id.toString() === id;
        });

        dispatch(setActiveTechnician(clickedTechnician));
        dispatch(uiOpenModal());
        disableScroll();
    }

    // Button Add new Technician
    const iconData = {
        icon: <i className="fas fa-user-plus"></i>,
        className: 'button-new technician'
    }

    return (
        <>
            <h1 className="technician-h1">Técnicos</h1>
            <div className="crew-wrapper animate__animated animate__fadeIn">

                {
                    technicians.map((technician) => {

                        return (
                            <div key={technician.id} className="technician-wrapper">

                                <div className="technician-name-surname">
                                    <span>{technician.surname},</span>
                                    <span>{technician.name}</span>
                                    <span></span>
                                </div>

                                <img src={technician.image === null
                                    ? `${process.env.PUBLIC_URL}/assets/images/user-default.png`
                                    : `${process.env.PUBLIC_URL}/assets/images/${technician.image}`}
                                    alt={`${technician.name}`}
                                />

                                {
                                    admin
                                    &&
                                    <div className="wrapper-technician-button">
                                        <button className="btn btn-detail-crew" data-id={technician.id} onClick={openModalTechnician}>Ver más</button>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div >
            {
                admin && <ButtonNew iconData={iconData} page="crew" />
            }
            <CrewModal />
        </>
    )
}
