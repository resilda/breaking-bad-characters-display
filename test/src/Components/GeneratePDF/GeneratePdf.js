import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: "100%",
        orientation:"portrait", 
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
        color: 'grey',
    },
    image: {
        width: '200px',
        height: '270px', 
        alignSelf: 'center',
        marginTop: '20px', 
        border: '1px solid #377867', 
    },
    text: {
        margin: 12,
        marginTop: 20,
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
     },
    table: {
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '80px'
        // border: '1px solid black'
    },
    tableRow:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    cell1: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignContent: 'flex-start',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 12,
        fontStyle: 'italic',
        padding: '5px', 
        paddingRight: '35px', 
        // border: '1px solid black'
    }, 
    cell2: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignContent: 'flex-end',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontSize: 12,
        padding: '5px', 
        paddingLeft: '35px', 
        // border: '1px solid black'
    }
});
  
function GeneratePdf({ detail }) {
    return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.header} fixed>
                            {detail.nickname}
                        </Text>
                        <Image src={detail.img} alt={detail.name} style={styles.image}/>
                        <View style={styles.table}>
                        <View style={[styles.tableRow]}> 
                            <Text style={[styles.cell1]}>Name</Text>
                            <Text style={[styles.cell1]}>Nickname</Text>
                            <Text style={[styles.cell1]}>Category</Text>
                            <Text style={[styles.cell1]}>Birthday</Text>
                            <Text style={[styles.cell1]}>Status</Text>
                            <Text style={[styles.cell1]}>Occupation</Text>
                            <Text style={[styles.cell1]}>Portrayed</Text>
                        </View>
                        <View style={[styles.tableRow]}> 
                            <Text style={[styles.cell2]}>{detail.name}</Text>
                            <Text style={[styles.cell2]}>{detail.nickname}</Text>
                            <Text style={[styles.cell2]}>{detail.category}</Text>
                            <Text style={[styles.cell2]}>{detail.birthday}</Text>
                            <Text style={[styles.cell2]}>{detail.status}</Text>
                            <Text style={[styles.cell2]}>{detail.occupation}</Text>
                            <Text style={[styles.cell2]}>{detail.portrayed}</Text>
                        </View>
                    </View>
                    </View>
                </Page>
            </Document>
    )
}

export default GeneratePdf;