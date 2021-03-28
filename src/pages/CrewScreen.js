
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTechnician } from '../actions/technician';
import { uiOpenModal } from '../actions/ui';

import { ButtonNew } from '../components/ui/ButtonNew';
import { CrewModal } from '../components/crew/CrewModal';

export const CrewScreen = () => {

    const { technicians } = useSelector(state => state.crew);

    const dispatch = useDispatch();

    const openModalTechnician = (e) => {

        const id = e.target.attributes[1].value;
        const clickedTechnician = technicians.find((technician) => {
            return technician.id.toString() === id;
        });

        dispatch(setActiveTechnician(clickedTechnician));
        dispatch(uiOpenModal());

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

                                <img src={technician.image} alt={`${technician.name}`} />

                                <div className="wrapper-technician-button">
                                    <button className="btn btn-detail-crew" data-id={technician.id} onClick={openModalTechnician}>Ver más</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
            <ButtonNew iconData={iconData} page="crew" />
            <CrewModal />
        </>
    )
}


/* <div key={technician.name} className="technician-wrapper">

                                <div className="technician-name-surname">
                                    <span>{technician.surname},</span>
                                    <span>{technician.name}</span>
                                </div>

                                <div className="technician-data-wrapper">
                                    <img src={technician.image} alt={`${technician.name}`} />

                                    <div className="technician-data">

                                        <div className="grid-crew-screen">
                                            <div className="grid-crew-screen-child">
                                                <span>Factoría:</span>
                                                <input type="text" value={technician.factory} disabled />
                                            </div>

                                            <div className="grid-crew-screen-child">
                                                <span>Horario:</span>
                                                <input type="text" value={technician.schedule} disabled />
                                            </div>
                                        </div>

                                        <div className="grid-crew-screen">
                                            <div className="grid-crew-screen-child-2">
                                                <span>Fecha Nac.:</span>
                                                <input type="text" value={moment(technician.birthDate).format('L')} disabled />
                                            </div>

                                            <div className="grid-crew-screen-child-2">
                                                <span>DNI:</span>
                                                <input type="text" value={technician.identityDocument} disabled />
                                            </div>
                                        </div>

                                        <div className="technician-address">
                                            <span>Ciudad:</span>
                                            <span>{technician.city}</span>

                                            <span>Dirección:</span>
                                            <span>{technician.address}</span>
                                        </div>

                                        <div className="technician-phone-number">
                                            <span>Teléfono:</span>
                                            <span>{technician.phoneNumber}</span>

                                            <span>Email:</span>
                                            <span>{technician.email}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="technician-notes">
                                    <label><small>Observaciones:</small> </label>
                                    <textarea value={technician.notes} disabled></textarea>
                                </div>

                                <div className="wrapper-technician-button">
                                    <button className="btn btn-update-technician" id={technician.id} onClick={openModalTechnician}>Editar</button>
                                </div>
                            </div> */