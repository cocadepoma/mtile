import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadFactory } from '../../actions/factory';
import { getMachinesBySectionId } from '../../helpers/getMachinesBySectionId';
import { getSectionsByFactoryId } from '../../helpers/getSectionsByFactoryId';
import { getSectionNumbersBySectionId } from '../../helpers/getSectionNumbersBySectionId';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import moment from "moment";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { TabOperations } from './TabOperations';
import { TabClockInOut } from './TabClockInOut';

const initialState = {
    factory: 'default',
    section: 'default',
    machine: 'default',
    number: 'default',
    technician: 'default',
    worker: '',
    orderType: 'default',
    breakdown: 'default',
    startWork: new Date(),
    endWork: moment().add('1', 'hours').toDate(),
    startFix: moment().add('1', 'hours').toDate(),
    endFix: moment().add('1', 'years').toDate(),
    materials: [
        {
            id: '123123',
            name: 'correa multidentada 1500h100',
            quantity: '2'
        },
        {
            id: '123323',
            name: 'Sensor PNP 15cm',
            quantity: '1'
        },
    ],
    operations: [
        {
            id: new Date().getTime(),
            time: '1.5',
            operation: 'Cambiar correa rodillera mesa'
        },
        {
            id: moment().add('1', 'hours').toDate().getTime(),
            time: '0.5',
            operation: 'Ajuste velocidades mesa'
        },
    ],
    clocks: [{

        userId: '213123',
        user: 'pepele',
        start: new Date(),
        end: moment().add('1', 'hours').toDate()

    }],
    totalMins: '',
    description: '',
}

export const OrderForm = ({ type }) => {

    const dispatch = useDispatch();
    const { factories } = useSelector(state => state.factory);
    const { sections } = useSelector(state => state.factory);
    const { machines } = useSelector(state => state.factory);
    const { numbers } = useSelector(state => state.factory);
    const { types } = useSelector(state => state.calendar);
    const { breakdowns } = useSelector(state => state.calendar);
    const { technicians } = useSelector(state => state.crew);


    // Show allowed sections, numbers and machines
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedSectionsNumbers, setSelectedSectionsNumbers] = useState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);

    // Formvalues deconstruction
    const [formValues, setFormValues] = useState(initialState);
    const { factory,
        section,
        machine,
        number,
        technician,
        worker,
        orderType,
        breakdown,
        startWork,
        endWork,
        startFix,
        endFix,
        materials,
        operations,
        clocks,
        totalMins,
        description,
    } = formValues;

    // Load and fecth factories, sections, machines and docs from DB
    useEffect(() => {
        dispatch(startLoadFactory());
    }, [dispatch]);

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });


        if (target.name === 'factory') {
            setFormValues({ ...formValues, [target.name]: target.value, section: 'default', machine: 'default' });
            setSelectedMachines({});

            const id = target.value;
            const factorySections = getSectionsByFactoryId(id, sections);
            setSelectedSections(factorySections);
        }

        if (target.name === 'section') {
            setFormValues({ ...formValues, [target.name]: target.value, machine: 'default' });

            const id = target.value;
            const sectionNumbers = getSectionNumbersBySectionId(id, numbers);
            const sectionMachines = getMachinesBySectionId(id, machines);
            setSelectedSectionsNumbers(sectionNumbers);
            setSelectedMachines(sectionMachines);
        }

    }

    // Listen for date changes from startWork, endWork, startFix, endFix
    const handleStartDateChange = (e) => {
        setFormValues({ ...formValues, startWork: e })
    }
    const handleEndDateChange = (e) => {
        setFormValues({ ...formValues, endWork: e })
    }
    const handleStartFixDateChange = (e) => {
        setFormValues({ ...formValues, startFix: e })
    }
    const handleEndFixDateChange = (e) => {
        setFormValues({ ...formValues, endFix: e })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(formValues)
    }

    return (
        <div className="animate__animated animate__fadeIn animated__fast">
            {type === 'update' ? <h1 className="h1-order">Ver orden</h1> : <h1 className="h1-order">Nueva orden</h1>}

            <form onSubmit={handleSubmit}>
                <label>Factoría: </label>
                <select

                    name="factory"
                    value={factory}
                    onChange={handleInputChange}>
                    <option value="default" disabled>Factoría</option>
                    {factories.map(factory =>
                        <option key={factory.id} value={factory.id}>{factory.name}</option>)}
                </select>

                <label>Sección: </label>
                <select
                    name="section"
                    value={section}
                    onChange={handleInputChange}
                    disabled={selectedSections.length === 0}
                >
                    <option value="default" disabled>Elige</option>
                    {selectedSections.length > 0
                        && selectedSections.map(section =>
                            <option key={section.id} value={section.id}>{section.name}</option>)}
                </select>

                <label>Número: </label>
                <select
                    name="number"
                    value={number}
                    onChange={handleInputChange}
                    disabled={selectedSections.length === 0}
                >

                    <option value="default" disabled>Elige Sección</option>
                    {selectedSectionsNumbers.length > 0
                        && selectedSectionsNumbers.map(number =>
                            <option key={number.id} value={number.id}>{number.number}</option>)}
                </select>

                <label>Máquina: </label>
                <select
                    name="machine"
                    value={machine}
                    onChange={handleInputChange}
                    disabled={selectedSections.length === 0}
                >

                    <option value="default" disabled>Elige Máquina</option>
                    {selectedMachines.length > 0
                        && selectedMachines.map(machine =>
                            <option key={machine.id} value={machine.id}>{machine.name}</option>)}
                </select>

                <label>Tipo orden: </label>
                <select name="orderType" value={orderType} onChange={handleInputChange}>
                    <option value="default" disabled>Elige Tipo</option>
                    {types.length > 0
                        && types.map(type =>
                            <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>

                <label>Tipo avería: </label>
                <select name="breakdown" value={breakdown} onChange={handleInputChange}>
                    <option value="default" disabled>Elige Avería</option>
                    {breakdowns.length > 0
                        && breakdowns.map(breakdown =>
                            <option key={breakdown.id} value={breakdown.id}>{breakdown.name}</option>)}
                </select>

                <label>Técnico: </label>
                <select name="technician" value={technician} onChange={handleInputChange}>
                    <option value="default" disabled>Elige Técnico</option>
                    {technicians.length > 0
                        && technicians.map(technician =>
                            <option key={technician.id} value={technician.id}>{technician.name}</option>)}
                </select>

                <label>Avisado por: </label>
                <input type="text" name="worker" value={worker} onChange={handleInputChange} />



                <div>
                    <label>Fecha aviso: </label>
                    <DatePicker
                        selected={startWork}
                        onChange={handleStartDateChange}
                        timeInputLabel="Hora:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                        locale={es}
                    />
                </div>
                <div>
                    <label>Fecha fin: </label>
                    <DatePicker
                        selected={endWork}
                        onChange={handleEndDateChange}
                        timeInputLabel="Hora:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                        locale={es}
                        minDate={startWork}
                    />
                </div>
                <div>
                    <label>Inicio trabajo: </label>
                    <DatePicker
                        selected={startFix}
                        onChange={handleStartFixDateChange}
                        timeInputLabel="Hora:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                        minDate={startWork}
                    />
                </div>
                <div>
                    <label>Fin trabajo: </label>
                    <DatePicker
                        selected={endFix}
                        onChange={handleEndFixDateChange}
                        timeInputLabel="Hora:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                        minDate={startWork}
                    />
                </div>

                <Tabs >
                    <TabList>
                        <Tab>Notas</Tab>
                        <Tab>Operaciones</Tab>
                        <Tab>Fichajes</Tab>
                        <Tab>Materiales</Tab>
                    </TabList>

                    {/* Notes */}
                    <TabPanel className="animate__animated animated__fadeIn">
                        <div className="tab-table-textarea">
                            <p>Observaciones: </p>
                            <textarea name='description' value={description} onChange={handleInputChange}></textarea>
                        </div>
                    </TabPanel>

                    {/* Operations */}
                    <TabPanel>
                        <TabOperations
                            operations={operations}
                            formValues={formValues}
                            setFormValues={setFormValues}
                        />
                    </TabPanel>

                    {/* Clock IN and Clock OUT */}
                    <TabPanel>
                        {/* TODO: add fichajes */}
                        <TabClockInOut
                            formValues={formValues}
                            setFormValues={setFormValues}
                        />
                    </TabPanel>

                    {/* Materials */}
                    <TabPanel>
                        <div className="tab-table-wrapper">
                            <div className="button-add-tab-wrapper">
                                <i className="fas fa-boxes"></i><span>Nuevo item</span>
                            </div>

                            <div className="header-tab-table">
                                <div>
                                    <p>Cantidad</p>
                                </div>
                                <div>
                                    <p>Materiales</p>
                                </div>
                            </div>
                            {
                                materials.length > 0
                                &&
                                materials.map((material, i) =>
                                (<div className="header-tab-body" key={i}>
                                    <div>
                                        <p>{material.quantity}</p>
                                    </div>
                                    <div>
                                        <p>{material.name}</p>
                                    </div>
                                    <div>
                                        <i className="far fa-trash-alt"></i>
                                        <i className="far fa-edit"></i>
                                    </div>
                                </div>)
                                )
                            }
                        </div>
                    </TabPanel>

                </Tabs>

                <div className="button-wrapper">
                    <button className="btn btn-table" type="submit">Crear Orden</button>
                </div>
            </form>
        </div>
    )
}
