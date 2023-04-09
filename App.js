import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { MyTabs } from './Tabs.js'
import {useState} from "react"
import AnimatedSplash from "react-native-animated-splash-screen";


export default function App() {
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(true);
  }, 2000);
  
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loading}
      logoImage={require("./assets/mcsp.png")}
      backgroundColor={"#228647"}
      logoHeight={400}
      logoWidth={400}
    >
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </AnimatedSplash>
    
  );
}