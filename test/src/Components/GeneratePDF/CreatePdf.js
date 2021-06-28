import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function CreatePdf({ detail }) {
	var columns = [ { title: 'Characters', dataKey: 'characters' }, { title: 'Details', dataKey: 'details' } ];

	var rows = [
		{ characters: 'Name', details: detail.name },
		{ characters: 'Nickname', details: detail.nickname },
		{ characters: 'Category', details: detail.category },
		{ characters: 'Birthday', details: detail.birthday },
		{ characters: 'Status', details: detail.status },
		{ characters: 'Occupation', details: detail.occupation },
		{ characters: 'Portrayed', details: detail.portrayed }
	];

	function generatePdf() {
		var doc = new jsPDF('p', 'pt', 'a4');

		const imgWidth = 180;
		const imgHeight = 250;
		const margin = 220;

		doc.setFontSize(12);
		doc.setTextColor(40);
		doc.addFont('Times New Roman');
		// doc.text(293, 20, 'Breaking Bad', 'center');
		doc.text(180, 60, 'IS BREAKING BAD THE BEST SERIES EVER?');
		doc.text(
			'To justify "Breaking Bad" as the best TV show ever, the world of understanding should lay beyond',
			30,
			100,
			'justify'
		);
		doc.text(
			'the epsiodes and arcs. It should start by analysing the brilliant characters that make the show',
			30,
			115
		);
		doc.text("even more awesome. Let's go!", 30, 130);
		doc.text(`Character of the Day: "${detail.nickname}"`, 30, 160, 'left');

		const pageWidth = doc.internal.pageSize.getWidth();
		doc.addImage(detail.img, 'JPEG', pageWidth / 2 - imgWidth / 2, margin, imgWidth, imgHeight);

		doc.autoTable(columns, rows, {
			startY: doc.autoTableEndPosY() + 520,
			margin: { horizontal: 50 },
			styles: { overflow: 'linebreak' },
			// bodyStyles: { valign: 'top' },
			columnStyles: { email: { columnWidth: 'wrap' } }
			// theme: 'striped',
		});

		doc.save(`${detail.name}.pdf`);
	}

	return <button onClick={generatePdf}>Download</button>;
}
