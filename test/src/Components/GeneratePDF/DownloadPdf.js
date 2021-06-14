import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import GeneratePdf from './GeneratePdf';

function DownloadPdf() {
    return (
        <div>
            <PDFDownloadLink document={<GeneratePdf />} fileName="random.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div>
    )
}

export default DownloadPdf;