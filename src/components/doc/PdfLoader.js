import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
//const pdfjs = import('pdfjs-dist/build/pdf');
const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry');
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const PdfLoader = ({ pdf }) => {

    // eslint-disable-next-line no-unused-vars
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        setPageNumber(1);
    }, [pdf]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <>
            <Document
                file={`${process.env.PUBLIC_URL}/assets/docs/${pdf.name}`}
                loading={<img src={`${process.env.PUBLIC_URL}/assets/images/loader.gif`} alt="loading" />}
                onLoadSuccess={onDocumentLoadSuccess}
                error={<p>Error al cargar el archivo</p>}
                renderMode="svg"
            >
                <Page pageNumber={pageNumber} />
                <span className="pdf-title">{pdf.info}</span>
            </Document>
        </>
    );

}
