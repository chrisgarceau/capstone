import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import FetchData from "../FetchData";

export default function Data() {
  
  const [value, setValue] = useState();
  useEffect(() => {
    let data = async () => {
      setValue(await FetchData());
    };
    data();
  }, []);

  if (!value) {
    return (
      <ActivityIndicator
        size="large"
        animating={true}
        color="#228647"
      />
    );
  }

  return (
    <ScrollView>
      {value.map((files, index) => (
        <Card key={index} style={styles.container}>
          <Card.Content style={styles.content}>
            <Text style={styles.title}>car_entered:</Text>
            <Text style={styles.paragraph}>
              {!files[0] ? "Not Given" : files[0]}
            </Text>
          </Card.Content>
          <Card.Content style={styles.content}>
            <Text style={styles.title}>car_exited:</Text>
            <Text style={styles.paragraph}>
              {!files[0] ? "Not Given" : files[1]}
            </Text>
          </Card.Content>
          <Card.Content style={styles.content}>
            <Text style={styles.title}>date:</Text>
            <Text style={styles.paragraph}>
              {!files[0] ? "Not Provided" : files[2]}
            </Text>
          </Card.Content>
          <Card.Content style={styles.content}>
            <Text style={styles.title}>time:</Text>
            <Text style={styles.paragraph}>
              {!files[0] ? "Not Provided" : files[3]}
            </Text>
          </Card.Content>
          <Card.Content style={styles.content}>
            <Text style={styles.title}>total_cars:</Text>
            <Text style={styles.paragraph}>
              {!files[0] ? "Not Provided" : files[4]}
              {" / 50"}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: "#228647",
    borderColor: "#228647",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
    color: "#ffffff"
  },
  paragraph: {
    fontSize: 20,
    
  },
});