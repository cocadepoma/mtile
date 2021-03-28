import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useSelector } from 'react-redux';
//const pdfjs = import('pdfjs-dist/build/pdf');
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


const options = {
    cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
};

export const PdfPage = ({ file }) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const { modalOpen } = useSelector(state => state.ui)

    useEffect(() => {
        setPageNumber(1);
    }, [file]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <>
            <Document
                file={`${process.env.PUBLIC_URL}/assets/docs/${file}`}
                loading={<img src={`${process.env.PUBLIC_URL}/assets/images/loader.gif`} alt="loading" />}
                onLoadSuccess={onDocumentLoadSuccess}
                error={<p>Error al cargar el archivo</p>}
                renderMode="canvas"
            >
                <Page pageNumber={pageNumber} >
                    {modalOpen

                        &&
                        <div className="pdf-page-buttons">
                            <button className="left-arrow" disabled={pageNumber <= 1} onClick={previousPage}>
                                <i className="fas fa-chevron-left"></i>
                            </button>

                            <span className="info-pages">
                                {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
                            </span>

                            <button className="right-arrow" disabled={pageNumber >= numPages} onClick={nextPage}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>

                    }

                </Page>
            </Document>


        </>
    );

}