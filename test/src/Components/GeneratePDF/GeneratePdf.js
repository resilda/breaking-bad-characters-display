import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Table, TableBody, TableHeader, TableCell, DataTableCell } from '@david.kucsai/react-pdf-table';

const styles = StyleSheet.create({
	page: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#fff',
		width: '100%',
		orientation: 'portrait',
		margin: '5px'
	},
	section: {
		display: 'flex',
		flexDirection: 'column',
		margin: '20px',
		padding: '10px',
		flexGrow: 1
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'center',
		color: 'grey'
	},
	image: {
		width: '200px',
		height: '270px',
		alignSelf: 'center',
		marginTop: '20px',
		border: '1px solid #377867'
	},
	text: {
		margin: 12,
		marginTop: 20,
		fontSize: 10,
		textAlign: 'justify',
		fontFamily: 'Times-Roman'
	},
	table: {
		// width: '70%',
		display: 'flex',
		flexDirection: 'row',
		marginTop: '80px',
		border: '1px solid black'
	},
	tableRow: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		border: '1px solid black'
	},
	cell: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'flex-start',
		textAlign: 'center',
		flexWrap: 'wrap',
		fontSize: 12,
		fontStyle: 'italic',
		padding: '5px',
		paddingRight: '35px'
		// border: '1px solid black'
	}
	// cell: {
	// 	display: 'flex',
	// 	flexDirection: 'column',
	// 	justifyContent: 'center',
	// 	alignContent: 'flex-end',
	// 	textAlign: 'center',
	// 	flexWrap: 'wrap',
	// 	fontSize: 12,
	// 	padding: '5px',
	// 	paddingLeft: '35px'
	// }
});

function GeneratePdf({ detail }) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View>
					<Text style={styles.header} fixed>
						{detail.nickname}
					</Text>
					<Image src={detail.img} alt={detail.name} style={styles.image} />
					<View style={styles.table}>
						<View style={[ styles.tableRow ]}>
							<Text style={[ styles.cell ]}>Name</Text>
							<Text style={[ styles.cell ]}>Nickname</Text>
							<Text style={[ styles.cell ]}>Category</Text>
							<Text style={[ styles.cell ]}>Birthday</Text>
							<Text style={[ styles.cell ]}>Status</Text>
							<Text style={[ styles.cell ]}>Occupation</Text>
							<Text style={[ styles.cell ]}>Portrayed</Text>
						</View>
						<View style={[ styles.tableRow ]}>
							<Text style={[ styles.cell ]}>{detail.name}</Text>
							<Text style={[ styles.cell ]}>{detail.nickname}</Text>
							<Text style={[ styles.cell ]}>{detail.category}</Text>
							<Text style={[ styles.cell ]}>{detail.birthday}</Text>
							<Text style={[ styles.cell ]}>{detail.status}</Text>
							<Text style={[ styles.cell ]}>{detail.occupation}</Text>
							<Text style={[ styles.cell ]}>{detail.portrayed}</Text>
						</View>
					</View>
					{/* <TableDetails detail={detail} /> */}
				</View>
			</Page>
		</Document>
	);
}

export default GeneratePdf;
