import React, { useEffect, useState } from 'react';
import { PdfLoader } from '../components/doc/PdfLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDoc, startLoadFactory } from '../actions/factory';
import { getSectionsByFactoryId } from '../helpers/getSectionsByFactoryId';
import { getDocsBySectionId } from '../helpers/getDocsBySectionId';
import ClickAwayListener from 'react-click-away-listener';
import { disableScroll } from '../helpers/disable-enable-scroll';
import { PdfModal } from '../components/doc/PdfModal';
import { getDocById } from '../helpers/getDocById';
import { uiOpenModal } from '../actions/ui';
import { ButtonNew } from '../components/ui/ButtonNew';
import { PdfModalAdd } from '../components/doc/PdfModalAdd';



export const DocsScreen = () => {

    const { factories } = useSelector(state => state.factory);
    const { sections } = useSelector(state => state.factory);
    const { docs } = useSelector(state => state.factory);
    const { admin } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Array of sections from factory
    const [showSections, setShowSections] = useState([]);
    // Array of docs from a section
    const [showPdf, setShowPdf] = useState([]);
    // State to know if the Select is opened or closed
    const [isRotateFactory, setIsRotateFactory] = useState(false);
    // State to know if the Select is opened or closed
    const [isRotateSection, setIsRotateSection] = useState(false);
    // Breadcrumb
    const [optionsSelected, setOptionsSelected] = useState({ factory: '', section: '' });

    const [showModalDoc, setShowModalDoc] = useState(false);

    // This function depends on ClickAwayListener. Will close customs selects 
    // if the user clicks outside the component
    const handleClickAway = () => {
        isRotateFactory && toggleFactory();
        isRotateSection && toggleSection();
    };

    // Load and fecth factories, sections, machines and docs from DB
    useEffect(() => {
        dispatch(startLoadFactory());
    }, [dispatch]);

    // Reset data from custom select and breadcrumbs
    const resetData = () => {
        setOptionsSelected({ factory: '', section: '' });
        setShowSections([]);
        setShowPdf([]);
    }


    // When click Factory select, will set breadcrumb text,
    // close select, will show sections and set the array of documents to an empty array. 
    const handleClickFactory = ({ target }) => {

        // Set factory breadcrumb
        setOptionsSelected({ factory: target.innerText, section: '' });

        // Get sections from factory
        const id = target.attributes[0].value;
        const factorySections = getSectionsByFactoryId(id, sections);

        // Show sections select
        setShowSections(factorySections);
        // Hide previous documents by setting an empty array
        setShowPdf([]);
    }

    const handleClickSection = ({ target }) => {

        // Set section breadcrumb
        setOptionsSelected({ ...optionsSelected, section: target.innerText });

        // Get docs from section
        const id = target.attributes[0].value;
        const sectionDocs = getDocsBySectionId(id, docs);

        // Show PDF's
        setShowPdf(sectionDocs);
    }

    const handleDocClick = (id) => {
        const docData = getDocById(id, docs);
        disableScroll();
        setShowModalDoc(true);
        dispatch(setActiveDoc(docData));
        dispatch(uiOpenModal());
    }

    // Show & Hide Custom Select for Factories. Removing and Adding additional css classes.
    const toggleFactory = () => {
        const clicker = document.querySelector('.clicker');
        const clickerSelect = document.querySelector('.factory-selector');

        if (!clicker || !clickerSelect) {
            return;
        }

        if (!isRotateFactory) {
            clicker.classList.add('rotate');
            clickerSelect.classList.add('showlist');
        } else {
            clicker.classList.remove('rotate');
            clickerSelect.classList.remove('showlist');
        }

        setIsRotateFactory(!isRotateFactory);

    }

    // Show & Hide Custom Select for Sections. Removing and Adding additional css classes.
    const toggleSection = () => {

        if (!isRotateSection) {
            document.querySelector('.clicker-2').classList.add('rotate');
            document.querySelector('.section-selector').classList.add('showlist');
        } else {
            document.querySelector('.clicker-2').classList.remove('rotate');
            document.querySelector('.section-selector').classList.remove('showlist');
        }

        setIsRotateSection(!isRotateSection);

    }


    // Button Add new Item
    const iconData = {
        icon: <i className="fas fa-file-upload"></i>,
        className: 'button-new doc',
    }


    return (
        <div className="docs-main-container">
            <h1 className="h1-docs">Documentaciones</h1>

            {/*  breadcrumb */}
            <p className={`doc-breadcrumb ${optionsSelected.factory ? 'show-bread animate__animated animate__fadeIn animate__fast' : ''}`}>
                Factoría {optionsSelected.factory && `${optionsSelected.factory}`}
                {optionsSelected.factory && <i className="fas fa-caret-right bread-arrow"></i>}

                {optionsSelected.section && `${optionsSelected.section}`}
            </p>

            {/*  Factories Custom select */}
            <div className="doc-selectors">
                <div className="factory-header-selects animate__animated animate__fadeIn animate__fast">
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div className="factory-header" onClick={toggleFactory}>
                            <div className="grid-name">
                                <i className="fas fa-industry"></i>
                                <h4>Factorías</h4>
                            </div>
                            <i className="fas fa-sort-down clicker" onClick={toggleFactory}></i>
                        </div>
                    </ClickAwayListener>

                    <div className="factory-selector">
                        <ul onClick={handleClickFactory}>
                            {
                                factories.map
                                    (
                                        factory =>
                                            <li key={factory.id} value={factory.id}>
                                                {factory.name}
                                            </li>
                                    )
                            }
                        </ul>
                    </div>
                </div>

                {/*  Sections Custom select */}
                {
                    showSections.length > 0
                    &&
                    <div className="section-header-selects animate__animated animate__fadeIn animate__fast">
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div className="section-header" onClick={toggleSection}>
                                <div className="grid-name">
                                    <i className="fas fa-project-diagram"></i>
                                    <h4>Secciones</h4>
                                </div>
                                <i className="fas fa-sort-down clicker-2" onClick={toggleSection}></i>
                            </div>
                        </ClickAwayListener>

                        <div className="section-selector">
                            <ul onClick={handleClickSection}>

                                {
                                    showSections.length > 0
                                    &&
                                    showSections.map
                                        (
                                            section =>
                                                <li key={section.id} value={section.id}>
                                                    {section.name}
                                                </li>
                                        )
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>

            {/*  Documents */}

            {
                (showPdf.length > 0)
                    ? <div className="pdf-wrapper">
                        {showPdf.map(pdf =>
                            <div key={pdf.id} className="single-pdf-wrapper animate__animated animate__fadeIn" onClick={() => { handleDocClick(pdf.id) }}>
                                <PdfLoader pdf={pdf} />
                            </div>
                        )}
                    </div>

                    : (optionsSelected.section && showPdf.length === 0) && <h3 className="h3-docs animate__animated animate__zoomIn">No se ha encontrado documentación</h3>
            }

            {showModalDoc && <PdfModal setShowModalDoc={setShowModalDoc} resetData={resetData} />}

            {!showModalDoc && <PdfModalAdd resetData={resetData} />}


            {
                admin && <ButtonNew iconData={iconData} />
            }

        </div>
    );

}
