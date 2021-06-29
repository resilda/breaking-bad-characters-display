import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	pdfButton: {
		width: '100px',
		height: '27px',
		color: 'white',
		background: '#7198A9',
		border: 0,
		borderRadius: 3,
		cursor: 'pointer'
	}
}));

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

	const classes = useStyles();

	function generatePdf() {
		var doc = new jsPDF('p', 'pt', 'a4');

		const firstImgWidth = 180;
		const firstImgHeight = 250;
		const secondImgWidth = 280;
		const secondImgHeight = 150;
		const margin = 200;

		doc.setFontSize(12);
		doc.setTextColor(40);
		doc.addFont('Times New Roman');
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
		var imgData =
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRa4NhVASihdeFLAr7DSF6O3ld1XJfU7bSyA&usqp=CAU';

		if (detail.img) {
			doc.addImage(detail.img, 'JPEG', pageWidth / 2 - firstImgWidth / 2, margin, firstImgWidth, firstImgHeight);
		} else {
			doc.addImage(imgData, 'JPEG', pageWidth / 2 - secondImgWidth / 2, margin, secondImgWidth, secondImgHeight);
		}

		doc.autoTable(columns, rows, {
			startY: doc.autoTableEndPosY() + 520,
			margin: { horizontal: 50 },
			styles: { overflow: 'linebreak' },
			columnStyles: { email: { columnWidth: 'wrap' } }
		});

		doc.save(`${detail.name}.pdf`);
	}

	return (
		<button className={classes.pdfButton} onClick={generatePdf}>
			Download
		</button>
	);
}
