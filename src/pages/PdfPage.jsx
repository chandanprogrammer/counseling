import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: "red",
  },
  image: {
    display: "block",
    // backgroundColor: "#000",
    width: "80%",
    // height: "4rem",
    paddingTop: 40,
  }
});

const PdfPage = () => {
  return (
    <>
      <PDFViewer
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Document>
          <Page size="A4" style={styles.page}>
            <Image style={styles.image} src="../../images/banner_ggv.png" />
            <View style={styles.section}>
              <Text>Registration Conformation Page </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PdfPage;
