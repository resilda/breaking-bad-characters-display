import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width:"100%",
        orientation:"portrait", 
        margin: '5px'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    text: {
        margin: 12,
        marginTop: 20,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
     },
});
  
function GeneratePdf({ detail }) {
    return (
        <PDFViewer key={detail.char_id}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.header} fixed>
                            {detail.nickname}
                        </Text>
                        <Image src={detail.img} alt={detail.name} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.text}>Name: {detail.name}</Text>
                        <Text style={styles.text}>Nickname: {detail.nickname}</Text>
                        <Text style={styles.text}>Category: {detail.category}</Text>
                        <Text style={styles.text}>Birthday: {detail.birthday}</Text>
                        <Text style={styles.text}>Status: {detail.status}</Text>
                        <Text style={styles.text}>Occupation: {detail.occupation}</Text>
                        <Text style={styles.text}>Portrayed: {detail.portrayed}</Text>
                    </View>
                    </Page>
            </Document>
        </PDFViewer>
    )
}

export default GeneratePdf;