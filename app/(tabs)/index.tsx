import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import SensorData from '@/hooks/SensorData';

export default function BasicNivelator() {
  const data = SensorData();
  const rotationX = useRef(new Animated.Value(0)).current;
  const rotationY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(rotationX, {
      toValue: data.x * 45,
      useNativeDriver: true,
    }).start();

    Animated.spring(rotationY, {
      toValue: data.y * -45,
      useNativeDriver: true,
    }).start();
  }, [data]);

  // Calcula la distancia al centro (0,0) en 2D
  const distance = Math.sqrt(data.x ** 2 + data.y ** 2);

  // Determina el color basado en la distancia
  const getColor = () => {
    if (distance < 0.02) return 'green';
    if (distance < 0.3) return 'orange';
    return 'red';
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Nivelator</Text>
      </View>

      <View style={styles.levelContainer}>
        <Animated.View
          style={[
            styles.level,
            {
              backgroundColor: getColor(),
              transform: [
                {
                  rotateX: rotationY.interpolate({
                    inputRange: [-45, 45],
                    outputRange: ['-45deg', '45deg'],
                  }),
                },
                {
                  rotateY: rotationX.interpolate({
                    inputRange: [-45, 45],
                    outputRange: ['-45deg', '45deg'],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  information: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  levelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  level: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
