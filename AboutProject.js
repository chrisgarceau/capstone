import React from "react";
import {ScrollView, StyleSheet, Text, View} from 'react-native';

//ABOUT PROJECT SCREEN
export function AboutProjectScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollView} >
        <View style={styles.container}>
      <Text style={styles.heading}>Capstone: Smart Parking System</Text>
      <Text style={styles.paragraph}>
      The project is a year long effort over two semesters. Our team consisted of two Electrical Engineering 
      majors (Gustavo Aguilar and Eoin McGirl) and two Computer Engineering majors (Christopher Garceau and 
      Christian Prashad).
      </Text>
      <Text style={styles.heading}>Goal</Text>
      <Text style={styles.paragraph}>
      The goal of the project is to create a system by integrating software and hardware that is capable 
      of maintaining real-time parking lot capacities, use ML to generate parking lot capacities predictions 
      based on certain times and days of the week, and allow users to view this data in an application.
      </Text>
      <Text style={styles.heading}>Hardware</Text>
      <Text style={styles.paragraph}>
      Pneumatic traffic tubes connected to a differential air pressure sensor which was wired to an ESP32 
      microcontroller. The tubes are about 25 ft long and are laid in parallel across the entry/exit point 
      of a parking lot. We are able to determine whether a car is entering or exiting based on which tube 
      is rolled over first. When a car rolls over a tube, we either increment or decrement a car counter 
      variable on the ESP32 and time stamp this data.
      </Text>
      <Text style={styles.paragraph}>
      In order to power the system, we utilized a solar panel which was connected to a voltage regulator 
      to step down the voltage, then to a rechargeable battery supply. The rechargeable battery was then 
      connected to the ESP32 microcontroller.  
      </Text>
      <Text style={styles.paragraph}>
      In order to send this data to our spreadsheet/database, we utilized Google Apps Scripts. We developed 
      a script and deployed it as a web application to receive data from the ESP32 and append the new data 
      to our spreadsheet. To do this, we initialized an HTTP client on our ESP32 and began a HTTP request, 
      that request being the link to our script web app, which then executes a function to append new data. 
      </Text>
      <Text style={styles.heading}>Databases</Text>
      <Text style={styles.paragraph}>
      We realized that our Google Sheet was a makeshift database and that it would be ideal if we used an 
      official database. Using Hostinger (a hosting provider), we created a domain name and hosted a MySQL 
      database. Once again, we used Google Apps Scripts to create a data pipeline that exports the new data 
      in the Google sheet to our MySQL database. We also set up an automatic trigger that executes this 
      process every midnight. 
      </Text>
      <Text style={styles.heading}>Frontend / UI</Text>
      <Text style={styles.paragraph}>
      We developed this full-stack cross platform application using Javascript + React Native, along with 
      Expo Go / Expo CLI. The reason why we chose React Native is because with one codebase we were able 
      to deploy the application to iOS, Android, and the web. This is important because we could reach more 
      users, regardless of the devices they own. 
      </Text>
      <Text style={styles.paragraph}>
      The goal of the application was to provide users with real-time parking lot capacity data, as well as 
      predictive data and traffic flow trends based on certain times and days of the week using machine 
      learning. In order to display the real-time parking lot data in our application, we used a GCP Sheets 
      API. We added a page refresh functionality to both the parking lot data page and the machine learning 
      page. When users refresh each page, a new call to the API is made and the appropriate data is displayed. 
      </Text>
      <Text style={styles.heading}>Machine Learning</Text>
      <Text style={styles.paragraph}>
      Our dataset consists of time-series data and the dataset contains both daily and weekly seasonality. 
      The dataset was initially converted to a .CSV file for ML purposes. We developed the ML program using 
      Python. Libraries included pandas for data preprocessing, numpy, scikit-learn (splitting data into 
      train and test sets, as well as scaling the data), keras (models, layers, callbacks), and matplotlib 
      (graphing/visualization of data). We used a Keras Sequential model, layers included LSTM, Dense, and 
      Dropout, and callbacks included early stopping. Dense(1) refers to the structure of the layers, 
      meaning every input is connected to a single output neuron. Dropout(0.2) means that during each epoch, 
      20% of the neurons are randomly removed. This process prevents neuron dependency and coadaptation. 
      Since each neuron depends on others for output, by removing some during training, you can force 
      remaining neurons to learn more efficiently. The callback early stopping was added to the model to 
      prevent overfitting. Early stopping works by immediately terminating training once the model plateaus 
      or stops improving.
      </Text>
      <Text style={styles.paragraph}>
      We began the program by preprocessing the dataset and converting the dataset into a dataframe. 
      We decided to run the ML program on just the current day of the week. To do this, we extracted 
      all data from the current day of the week to run the ML on. We then split the data into training 
      and testing sets (80% training & 20% testing). Next, we normalized the data which prevents dominance 
      of some features, improves accuracy, allows for faster convergence (model reaches a level of 
      efficiency/accuracy faster), and helps with regularization (another technique to prevent overfitting). 
      Then, we scaled the data using MinMaxScaler() which converts each value into a number from 0-1, which 
      is necessary for input into a ML model. We then built, trained, compiled, fit, and evaluated the model 
      (Train and Test MSE, lower the better). We had to inverse transform the data back to their original 
      scale in order to graph and visualize the data. We graphed the data using matplotlib and displayed 
      the real vs. predicted values for testing purposes. Next, we resampled the resulting dataframe into 
      30 minute time intervals. This basically allows us to average the prediction results within these 30 
      minute time intervals using all of the data from that data of the week. This was necessary for 
      condensing and displaying the ML predictions in this application. The prediction results were then 
      exported to our databases and then fetched from our frontend using a Google Sheets API. Finally, the 
      prediction values were inserted into a React Native Chart Kit component and displayed to the user.
      </Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
});
