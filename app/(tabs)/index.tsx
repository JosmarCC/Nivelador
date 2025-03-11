import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function HomeScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const rotationX = useRef(new Animated.Value(0)).current;
  const rotationY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);

      Animated.spring(rotationX, {
        toValue: accelerometerData.x * 45,
        useNativeDriver: true,
      }).start();

      Animated.spring(rotationY, {
        toValue: accelerometerData.y * -45, 
        useNativeDriver: true,
      }).start();
    });

    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Josmar Company</Text>
      </View>

      <View style={styles.levelContainer}>
        <Animated.View
          style={[
            styles.level,
            {
              transform: [
                { rotateX: rotationY.interpolate({
                  inputRange:[-45, 45],
                  outputRange:['-45deg', '45deg']
                }) },
                { rotateY: rotationX.interpolate({
                  inputRange:[-45, 45],
                  outputRange:['-45deg', '45deg']
                }) },
              ],
            },
          ]}
        />
      </View>

      <View style={styles.information}>
        <Text style={styles.text}>Inclinación horizontal, Eje X: {data.x.toFixed(2)}</Text>
        <Text style={styles.text}>Inclinación vertical, Eje Y: {data.y.toFixed(2)}</Text>
        <Text style={styles.text}>Profundidad, Eje Z: {data.z.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    alignItems: 'center',
  },
  information: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  levelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  level: {
    width: 150,
    height: 150,
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
});