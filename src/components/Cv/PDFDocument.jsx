import React from "react";
import { Page, Document, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 50,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  content: {
    fontSize: 12,
  },
});

const PDFDocument = ({ result }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>INFORMATIONS PERSONNELLES</Text>
          <View style={styles.content}>
            <Text>Nom: {result.fullName}</Text>
            <Text>Date de naissance: {result.dateOfBirth}</Text>
            <Text>Adresse: {result.address}</Text>
            <Text>Téléphone: {result.phone}</Text>
            <Text>Email: {result.email}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>FORMATION</Text>
          {result.education.map((edu) => (
            <View key={edu.school} style={styles.content}>
              <Text style={{ fontWeight: "bold" }}>{edu.school}</Text>
              <Text>{edu.degree}</Text>
              <Text>{edu.date}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>EXPÉRIMENTATION PROFESSIONNELLE</Text>
          {result.workExperience.map((work) => (
            <View key={work.company} style={styles.content}>
              <Text style={{ fontWeight: "bold" }}>{work.company}</Text>
              <Text>{work.position}</Text>
              <Text>{work.date}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>COMPÉTENCES</Text>
          <Text style={styles.content}>{result.skills}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;