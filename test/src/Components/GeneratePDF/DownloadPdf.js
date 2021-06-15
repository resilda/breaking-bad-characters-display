import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

function DownloadPdf({  detail, renderComponent }) {
    return (
        <div>
            <PDFDownloadLink document={renderComponent} fileName={`${detail.nickname}.pdf`}>
                {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download')}
            </PDFDownloadLink>
        </div>
    )
}

export default DownloadPdf;
