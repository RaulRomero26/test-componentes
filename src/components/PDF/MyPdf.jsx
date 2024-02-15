import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font,Image } from '@react-pdf/renderer';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
  },
  left: {
    width: '40%',//<- working alternative
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 300,
  },

  right: {
    padding: 5,
    width: '60%', //<- working alternative
    flexShrink: 1,
    flexGrow: 2,
  },
});

const MyDoc = () => (
  <Document>
    <Page style={styles.body} orientation="landscape">
       <Text >
      	Ficha de identificacion
      	</Text>
      
        <View style={[styles.row]}>
        	<View  style={styles.left}>
          		<Image
        			style={styles.image}
        			src={{ uri:'http://172.18.0.25/sarai/public/files/Remisiones/19863/FotosHuellas/264019/rostro_frente.jpeg', method: "GET"}} 
      			/>
        	</View>
        	<View debug style={styles.right}>
              <Text>
                DATOS DE LA REMISIÓN
              </Text>
          		<Text>
            	  FICHA: REMISION: ZONA: VECTOR: STATUS REMISION: REMITIDIO A:
          		</Text>
              <Text>
            	  DATOS DEL DETENIDO: 
          		</Text>
        	</View>
      	</View>
      
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);


export const MyPdf = () => {
  return (
    <div className="App">
      <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink> 
   
    </div>
  );
}
