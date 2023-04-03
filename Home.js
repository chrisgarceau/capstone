import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, Linking, Text, RefreshControl, StyleSheet} from 'react-native';
import { Button, Card } from "react-native-paper";
import FetchData from "./FetchData";


// HOME SCREEN 
export function HomeScreen() {
    // For wait refresh function
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    // state variables
    const [refreshing, setRefreshing] = useState(0);
    const [value, setValue] = useState();
    const [lastValueIndex, setLastValueIndex] = useState(0);

    // useEffect Hooks
    // sets state variable to the last row of the spreadsheet
    useEffect(() => {
      if (value) {
        setLastValueIndex(value.length)
      }
    }, [value])

    // initial Google Sheets API call
    useEffect(() => {
      let data = async () => {
        setValue(await FetchData());
      };
      data();
    }, []);

    // Refresh function which creates a new call to the API to read real-time data
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      let data = async () => {
      setValue(await FetchData());
      };
      data();
      wait(600).then(() => setRefreshing(false));
    }, []);
  
    if (!value) {
      return (
        <ActivityIndicator
        style={{
          marginTop: 350
          }}
          size = "large"
          animating = {true}
          color = "#808080"
          justifyContent = 'center'
        />
      );
    }
  
    // screen design 
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          >
            <Card style={styles.container}>
              <Card.Cover source={require('./assets/kelly.png')} />
              <Card.Content style={styles.content}>
                <Text 
                  style={{
                    fontSize: 36,
                    fontWeight: "bold",
                    marginRight: 15,
                    color: "#ffffff",
                    marginTop: 8
                  }}>
                  Kelly Commons
                </Text>
              </Card.Content>
              <Card.Content>
                <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginRight: 15,
                    color: "#ffffff",
                    marginTop: 0
                }}>
                Address
                </Text>
                <Text
                style={{
                    fontSize: 15,
                    marginRight: 15,
                    color: "#000000",
                    marginTop: 2
                }}>
                3900 Waldo Ave, Manhattan College 
                </Text>
                <Text
                style={{
                    fontSize: 15,
                    marginRight: 15,
                    color: "#000000",
                    marginTop: 0,
                    marginBottom: 10
                    }}>
                Bronx, NY 10463
                </Text>
                <Button
                style={{
                    marginBottom: 10,
                }}
                    icon="car" 
                    mode="contained" 
                    color="black"
                    onPress={() => Linking.openURL('https://www.google.com/maps/dir//Kelly+Student+Commons,+3900+Waldo+Ave,+The+Bronx,+NY/@40.8887627,-73.9380364,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c2f3bb74196d89:0x4e1c70ae459b92d5!2m2!1d-73.9029312!2d40.8887031')}>
                Directions
                </Button>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text 
                    style={styles.title}>Current capacity:{}
                </Text>
                <Text style={styles.paragraph}>
                    {lastValueIndex ? value[lastValueIndex - 1][4] : "loading..."} {"/ 25  "}
                </Text>
                <Text 
                    style={styles.title}>Available spots:{}
                </Text>
                <Text style={styles.paragraph}>
                    {lastValueIndex ? 25 - value[lastValueIndex - 1][4] : "loading..."}
                </Text>
              </Card.Content>
            </Card>
      </ScrollView>
    );
  }
  
  // styles 
  const styles = StyleSheet.create({
    container: {
      margin: 10,
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
      marginRight: 15,
      color: "#ffffff"
    },
    paragraph: {
      fontWeight: "bold",
      fontSize: 20,
      color: "white"
    },
  });