import React, {useEffect, useState} from "react";
import { ScrollView, Text, View, ActivityIndicator, RefreshControl, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit'
import { Card } from "react-native-paper";
import FetchPredictionData from "./FetchPredictionData";


// Variables to display current day of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();
const dayOfWeek = daysOfWeek[today.getDay()];


// MACHINE LEARNING INSIGHTS SCREEN
export function MLScreen() {
  // For wait refresh function
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  // state variables
  const [refreshing, setRefreshing] = useState(0);
  const [value, setValue] = useState();
  const [lastValueIndex, setLastValueIndex] = useState(0);
  const [arr, setMyArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect Hooks
  // initial Google Sheets API call
  useEffect(() => {
    async function fetchData() {
      const data = await FetchPredictionData();
      setValue(data);
    }
    fetchData();
  }, []);

  // set lastValueIndex and populate arr (array) with Google Sheet data
  useEffect(() => {
    if (value) {
      setLastValueIndex(value.length);
      const newArray = value.slice(0, lastValueIndex).map(row => parseFloat(row[2]));
      setMyArray(newArray);
      data.datasets[0].data = newArray;
    }
  }, [value, lastValueIndex]);

  // check if arr is still being populated
  useEffect(() => {
    if (arr.length > 0) {
      setIsLoading(false);
    }
  }, [arr]);

  // data that LineChart uses to display graph / data points
  const data = {
    labels: ['6AM', '8', '10', '12PM', '2', '4', '6', '8', '10', '12AM'],
    datasets: [
      {
        data: arr,
      },
    ],
  };

  // test to see if arr is populated correctly
  console.log(arr);

  // Refresh function which creates a new call to the API to read real-time data
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchData() {
      const data = await FetchPredictionData();
      setValue(data);
    }
    fetchData();
    wait(600).then(() => setRefreshing(false));
  }, []);

   // ActivityIndicator style used in if statement below
   const stylesLoader = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });

  // if statement to check if arr is still being populated / loading
  // if arr is still being populated, display loading indicator
  if (isLoading) {
    return (
      <View style={[stylesLoader.container, stylesLoader.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          >
        <Card style={stylesML.container}> 
            <Card.Content style={styles.content}>      
                <Text style={stylesML.title}> {dayOfWeek} {} </Text>
                <LineChart
                    data={data}
                    width={350}
                    height={250}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                      paddingRight: 45
                    }
                    }
                />
                <Text 
                    style={stylesML.paragraph}>
                    This line chart displays the results of our ML model which uses Time Series
                    Analysis/Forecasting to predict real-time parking lot capacities relative to 
                    certain times and days of the week.
              
                    The predicted total number of cars in the parking lot is on the y-axis and
                    time of day is on the x-axis.
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
      marginBottom: 5,
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
  
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    backgroundColor: 'black',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 0, // optional, default 3
    barPercentage: 0.75,
    useShadowColorFromDataset: false // optional
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
      marginTop: 5
    }
  })