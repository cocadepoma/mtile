import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { startLoadFactory } from '../../actions/factory';

import { getMachinesByNumberId } from '../../helpers/getMachinesByNumberId';
import { getSectionsByFactoryId } from '../../helpers/getSectionsByFactoryId';
import { getSectionNumbersBySectionId } from '../../helpers/getSectionNumbersBySectionId';

import { ToastContainer, toast } from 'react-toastify';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import moment from "moment";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { TabOperations } from './TabOperations';
import { TabClockInOut } from './TabClockInOut';
import { TabMaterials } from './TabMaterials';
import { clearActiveEvent, startAddOrderEvent, startUpdateOrderEvent } from '../../actions/calendar';

import { disableScroll } from '../../helpers/disable-enable-scroll';
import { BackgroundModal } from '../ui/BackgroundModal';

const initialState = {
    factory: 'default',
    section: 'default',
    machine: 'default',
    number: 'default',
    technician: 'default',
    worker: '',
    orderType: 'default',
    breakdown: 'default',
    start: new Date(),
    end: new Date(),
    startFix: new Date(),
    endFix: new Date(),
    materials: [],
    operations: [],
    clocks: [],
    totalMins: '',
    description: '',
}

export const OrderForm = () => {

    const dispatch = useDispatch();
    const { factories, sections, machines, numbers } = useSelector(state => state.factory);
    const { types, breakdowns, activeEvent } = useSelector(state => state.calendar);
    const { technicians } = useSelector(state => state.crew);

    const [result, setResult] = useState({});

    // Show allowed sections, numbers and machines
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedSectionsNumbers, setSelectedSectionsNumbers] = useState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [breadMessage, setBreadMessage] = useState('*Selecciona una factoría para para desbloquear el siguiente campo');

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
        start,
        end,
        startFix,
        endFix,
        description,
        operations
    } = formValues;

    const history = useHistory();

    // Load and fecth factories, sections, machines and docs from DB
    useEffect(() => {
        dispatch(startLoadFactory());
    }, [dispatch]);

    // Load activeEvent or redirect to /neworder path if there is not an activeEvent
    useEffect(() => {
        if (activeEvent) {
            setBreadMessage('Ok');
            setFormValues(activeEvent);
            const { factory: factoryId } = activeEvent;
            const factorySections = getSectionsByFactoryId(factoryId, sections);
            setSelectedSections(factorySections);

            const { section: sectionId } = activeEvent;
            const { number: numberId } = activeEvent;
            const sectionNumbers = getSectionNumbersBySectionId(sectionId, numbers);
            const sectionMachines = getMachinesByNumberId(numberId, machines);
            setSelectedSectionsNumbers(sectionNumbers);
            setSelectedMachines(sectionMachines);
        } else {
            setFormValues(initialState);
            setSelectedSections([]);
            setSelectedSectionsNumbers([]);
            setSelectedMachines([]);

            if (history.location.pathname === '/order') {
                history.push('/neworder');
            }
        }

    }, [activeEvent, history, machines, numbers, sections]);

    useEffect(() => {
        return () => {
            dispatch(clearActiveEvent());
        }
    }, [dispatch]);


    const countTotalMins = () => {

        let count = 0;

        if (operations && operations.length > 0) {
            for (let i in operations) {
                count += (Number)(operations[i].time * 60);
            }
        }

        setFormValues({
            ...formValues,
            totalMins: count
        });
    }

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

        if (target.name === 'factory') {
            setSelectedSectionsNumbers([]);
            setSelectedMachines([]);
            setBreadMessage('*Selecciona una sección para desbloquear el siguiente campo');

            setFormValues({
                ...formValues,
                [target.name]: target.value,
                section: 'default',
                number: 'default',
                machine: 'default'
            });

            const id = target.value;
            const factorySections = getSectionsByFactoryId(id, sections);
            setSelectedSections(factorySections);
        }

        if (target.name === 'section') {
            setSelectedMachines([]);
            setBreadMessage('*Selecciona el número de sección para desbloquear el resto de campos');

            setFormValues({
                ...formValues,
                [target.name]: target.value,
                number: 'default',
                machine: 'default'
            });

            const id = target.value;
            const sectionNumbers = getSectionNumbersBySectionId(id, numbers);
            setSelectedSectionsNumbers(sectionNumbers);
        }

        if (target.name === 'number') {
            setBreadMessage('Ok');

            setFormValues({
                ...formValues,
                [target.name]: target.value,
                machine: 'default'
            });

            const id = target.value;
            const sectionMachines = getMachinesByNumberId(id, machines);
            setSelectedMachines(sectionMachines);
        }
    }

    // Listen for date changes from start, end, startFix, endFix
    const handleStartDateChange = (e) => {
        setFormValues({ ...formValues, start: e });
        document.querySelector('input[name="start"]').classList.remove('border-red');
    }
    const handleEndDateChange = (e) => {
        setFormValues({ ...formValues, end: e });
        document.querySelector('input[name="end"]').classList.remove('border-red');
    }
    const handleStartFixDateChange = (e) => {
        setFormValues({ ...formValues, startFix: e });
        document.querySelector('input[name="startFix"]').classList.remove('border-red');
    }
    const handleEndFixDateChange = (e) => {
        setFormValues({ ...formValues, endFix: e });
        document.querySelector('input[name="endFix"]').classList.remove('border-red');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let isValid = true;
        let result = {};

        countTotalMins();

        if (!factory || factory === 'default' || factory === '') {
            document.querySelector('select[name="factory"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('select[name="factory"]').classList.remove('border-red');
        }

        if (!section || section === 'default' || section === '') {
            document.querySelector('select[name="section"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('select[name="section"]').classList.remove('border-red');
        }

        if (!number || number === 'default' || number === '') {
            document.querySelector('select[name="number"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('select[name="number"]').classList.remove('border-red');
        }

        if (!machine || machine === 'default' || machine === '') {
            document.querySelector('select[name="machine"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('select[name="machine"]').classList.remove('border-red');
        }

        if (!orderType || orderType === 'default' || orderType === '') {
            document.querySelector('select[name="orderType"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('select[name="orderType"]').classList.remove('border-red');
        }

        if (!breakdown || breakdown === 'default' || breakdown === '') {
            document.querySelector('select[name="breakdown"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('select[name="breakdown"]').classList.remove('border-red');
        }

        if (!technician || technician === 'default' || technician === '') {
            document.querySelector('select[name="technician"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('select[name="technician"]').classList.remove('border-red');
        }

        if (!worker || worker === 'default' || worker === '') {
            document.querySelector('input[name="worker"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('input[name="worker"]').classList.remove('border-red');
        }

        if (moment(start).isSameOrAfter(end)) {
            document.querySelector('input[name="start"]').classList.add('border-red');
            isValid = false;
        } else {
            document.querySelector('input[name="start"]').classList.remove('border-red');
        }

        if (moment(end).isBefore(endFix) || moment(end).isBefore(start)) {
            document.querySelector('input[name="end"]').classList.add('border-red');
            isValid = false;

            if (moment(end).isBefore(endFix)) {
                document.querySelector('input[name="endFix"]').classList.add('border-red');
            }
            if (moment(end).isBefore(start)) {
                document.querySelector('input[name="start"]').classList.add('border-red');
            }

        } else {
            document.querySelector('input[name="end"]').classList.remove('border-red');
        }

        if (moment(startFix).isBefore(start) || moment(startFix).isSameOrAfter(endFix)) {
            document.querySelector('input[name="startFix"]').classList.add('border-red');
            isValid = false;

            if (moment(startFix).isBefore(start)) {
                document.querySelector('input[name="start"]').classList.add('border-red');
            }
            if (moment(startFix).isSameOrAfter(endFix)) {
                console.log('que pasa');
                document.querySelector('input[name="endFix"]').classList.add('border-red');
            }

        } else {
            document.querySelector('input[name="startFix"]').classList.remove('border-red');
        }

        if (moment(endFix).isBefore(startFix) || moment(endFix).isAfter(end) ||
            moment(endFix).isAfter(end) || moment(endFix).isSameOrBefore(startFix)) {

            document.querySelector('input[name="endFix"]').classList.add('border-red');
            isValid = false;

            if (moment(endFix).isBefore(startFix)) {
                document.querySelector('input[name="startFix"]').classList.add('border-red');
            }
            if (moment(endFix).isAfter(end)) {
                document.querySelector('input[name="end"]').classList.add('border-red');
            }

        } else {
            document.querySelector('input[name="endFix"]').classList.remove('border-red');
        }

        if (!isValid) {
            return toast.error('Revise los campos marcados en rojo y revise las fechas debídamente!', { position: 'top-center' });
        }


        if (activeEvent) {
            result = await dispatch(startUpdateOrderEvent(formValues));
        } else {
            result = await dispatch(startAddOrderEvent(formValues));
        }

        setShowModal(true);
        disableScroll();
        setResult(result);

    }

    return (

        <>
            {showModal
                &&
                <BackgroundModal
                    result={result}
                    setShowModal={setShowModal}
                />
            }

            <div className="animate__animated animate__fadeIn animated__fast">
                {activeEvent ? <h1 className="h1-order">Editar Orden</h1> : <h1 className="h1-order">Nueva orden</h1>}

                <form onSubmit={handleSubmit}>
                    {!showModal && <ToastContainer />}

                    <h3 className={`h3-order ${breadMessage === 'Ok' ? 'mb-4' : ''}`}>Datos Orden</h3>

                    <span className={`advise-factory animate__animated animate__fadeIn`}>
                        {breadMessage !== 'Ok' && `${breadMessage}`}
                    </span>

                    <div className="order-form">

                        <div className="factory-wrapper form-grid">
                            <label>Factoría: </label>
                            <select
                                name="factory"
                                value={factory}
                                onChange={handleInputChange}>
                                <option value="default" disabled>Factoría</option>
                                {factories.map(factory =>
                                    <option key={factory.id} value={factory.id}>{factory.name}</option>)}
                            </select>
                        </div>

                        <div className="section-wrapper form-grid">
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
                        </div>

                        <div className="number-wrapper form-grid">
                            <label>Número: </label>
                            <select
                                name="number"
                                value={number}
                                onChange={handleInputChange}
                                disabled={selectedSectionsNumbers.length === 0}
                            >

                                <option value="default" disabled>Elige Sección</option>
                                {selectedSectionsNumbers.length > 0
                                    && selectedSectionsNumbers.map(number =>
                                        <option key={number.id} value={number.id}>{number.number}</option>)}
                            </select>
                        </div>

                        <div className="machine-wrapper form-grid">
                            <label>Máquina: </label>
                            <select
                                name="machine"
                                value={machine}
                                onChange={handleInputChange}
                                disabled={selectedMachines.length === 0}
                            >

                                <option value="default" disabled>Elige Máquina</option>
                                {selectedMachines.length > 0
                                    && selectedMachines.map(machine =>
                                        <option key={machine.id} value={machine.id}>{machine.name}</option>)}
                            </select>
                        </div>


                        <div className="order-type-wrapper form-grid">
                            <label>Tipo orden: </label>
                            <select name="orderType" value={orderType} onChange={handleInputChange}>
                                <option value="default" disabled>Elige Tipo</option>
                                {types.length > 0
                                    && types.map(type =>
                                        <option key={type.id} value={type.id}>{type.name}</option>)}
                            </select>
                        </div>

                        <div className="breakdown-wrapper form-grid">
                            <label>Tipo avería: </label>
                            <select name="breakdown" value={breakdown} onChange={handleInputChange}>
                                <option value="default" disabled>Elige Avería</option>
                                {breakdowns.length > 0
                                    && breakdowns.map(breakdown =>
                                        <option key={breakdown.id} value={breakdown.id}>{breakdown.name}</option>)}
                            </select>
                        </div>

                        <div className="technician-wrapper form-grid">
                            <label>Técnico: </label>
                            <select name="technician" value={technician} onChange={handleInputChange}>
                                <option value="default" disabled>Elige Técnico</option>
                                {technicians.length > 0
                                    && technicians.map(technician =>
                                        <option key={technician.id} value={technician.id}>{technician.name}</option>)}
                            </select>
                        </div>

                        <div className="worker-wrapper form-grid">
                            <label>Avisado por: </label>
                            <input type="text" name="worker" value={worker} onChange={handleInputChange} />
                        </div>
                    </div>

                    <h3 className="h3-order">Fechas Orden</h3>

                    <div className="order-form2">

                        <div className="grid-dates">
                            <div className="start-work-wrapper form-grid limit">
                                <label>Fecha aviso: </label>
                                <DatePicker
                                    selected={start}
                                    onChange={handleStartDateChange}
                                    timeInputLabel="Hora:"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    locale={es}
                                    showTimeInput
                                    name="start"
                                />
                            </div>

                            <div className="end-work-wrapper form-grid limit">
                                <label>Fecha fin: </label>
                                <DatePicker
                                    selected={end}
                                    onChange={handleEndDateChange}
                                    timeInputLabel="Hora:"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    showTimeInput
                                    locale={es}
                                    minDate={start}
                                    name="end"
                                />
                            </div>
                        </div>
                        <div className="grid-dates">
                            <div className="start-fix-wrapper form-grid limit">
                                <label>Inicio trabajo: </label>
                                <DatePicker
                                    selected={startFix}
                                    onChange={handleStartFixDateChange}
                                    timeInputLabel="Hora:"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    locale={es}
                                    showTimeInput
                                    minDate={start}
                                    name="startFix"
                                />
                            </div>

                            <div className="end-fix-wrapper form-grid limit">
                                <label>Fin trabajo: </label>
                                <DatePicker
                                    selected={endFix}
                                    onChange={handleEndFixDateChange}
                                    timeInputLabel="Hora:"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    locale={es}
                                    showTimeInput
                                    minDate={startFix}
                                    name="endFix"
                                />
                            </div>
                        </div>
                    </div>

                    <h3 className="h3-order">Información Adicional</h3>

                    <Tabs>
                        <TabList>
                            <Tab>Notas</Tab>
                            <Tab>Operaciones</Tab>
                            <Tab>Fichajes</Tab>
                            <Tab>Materiales</Tab>
                        </TabList>

                        {/* Notes */}
                        <TabPanel >
                            <div className="tab-table-wrapper">
                                <div className="tab-table-textarea">
                                    <label>Observaciones: </label>
                                    <textarea name='description' value={description} onChange={handleInputChange}></textarea>
                                </div>
                            </div>
                        </TabPanel>

                        {/* Operations */}
                        <TabPanel>
                            <TabOperations
                                formValues={formValues}
                                setFormValues={setFormValues}
                            />
                        </TabPanel>

                        {/* Clock IN and Clock OUT */}
                        <TabPanel>
                            <TabClockInOut
                                formValues={formValues}
                                setFormValues={setFormValues}
                            />
                        </TabPanel>

                        {/* Materials */}
                        <TabPanel>
                            <TabMaterials
                                formValues={formValues}
                                setFormValues={setFormValues}
                            />
                        </TabPanel>

                    </Tabs>

                    <div className="button-wrapper">
                        <button
                            className="btn btn-order-cancel"
                            onClick={() => history.goBack()}
                        >
                            Volver
                        </button>

                        <button className="btn btn-order" type="submit">
                            {activeEvent ? "Guardar" : "Crear Orden"}
                        </button>

                    </div>

                </form>
            </div>
        </>
    )
}
