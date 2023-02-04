import React from "react";
import { ScrollView, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit'
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";


// MACHINE LEARNING INSIGHTS SCREEN
export function MLScreen() {
    return (
    <ScrollView contentContainerStyle={styles.scrollView}>
        <Card style={stylesML.container}> 
            <Card.Content style={styles.content}>      
                <Text style={stylesML.title}> Monday {} </Text>
                <LineChart
                    data={data}
                    width={350}
                    height={220}
                    chartConfig={chartConfig}
                />
                <Text 
                    style={stylesML.paragraph}>
                    This line chart displays the results of our ML model based on Time Series
                    Analysis/Forecasting to predict real-time parking lot capacities relative to 
                    certain times and days of the week.
                    {}
                </Text>
            </Card.Content>
        </Card>
    </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      margin: 12,
      borderWidth: 0,
      borderRadius: 15,
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
      fontSize: 20,
      fontWeight: "",
      marginRight: 15,
      color: "#ffffff"
    },
    paragraph: {
      fontWeight: "bold",
      fontSize: 20,
      color: "white"
    },
  });
  //
  const data = {
    labels: ['6AM', '8', '10', '12PM', '2', '4', '6', '8', '10', '12AM'],
    datasets: [
      {
        data: [6, 23, 30, 30, 30, 25, 25, 18, 10, 1],
      },
    ],
  };

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    backgroundColor: 'black',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0.75,
    useShadowColorFromDataset: false// optional
  };
  
const stylesML = StyleSheet.create ({
    container: {
      margin: 10,
      borderWidth: 0,
      borderRadius: 12,
      backgroundColor: "#000000",
      borderColor: "#000000",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginRight: 15,
      color: "white",
      marginBottom: 15
    },
    paragraph: {
      fontSize: 15,
      color: "white",
      marginTop: 12
    }
  })