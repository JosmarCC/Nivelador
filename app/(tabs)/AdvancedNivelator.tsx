import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import SensorData from '@/hooks/SensorData';

export default function AdvancedNivelator() {
  const data = SensorData();
  const distance = Math.sqrt(data.x ** 2 + data.y ** 2);

  const getColor = () => {
    if (distance < 0.02) return 'green';
    if (distance < 0.3) return 'orange';
    return 'red';
  };

  // Ejemplo de datos para el gráfico de línea
  const chartData = {
    labels: ['Eje X', 'Eje Y'],
    datasets: [
      {
        data: [data.x, data.y],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Advanced Nivelator</Text>
      </View>

      <View style={styles.information}>
        <Text style={[styles.text, {color: getColor()}]}>
          Inclinación horizontal, Eje X: {data.x.toFixed(2)}
        </Text>
        <Text style={[styles.text, {color: getColor()}]}>
          Inclinación vertical, Eje Y: {data.y.toFixed(2)}
        </Text>
      </View>
      <View style={styles.graphic}>
        <LineChart
          data={chartData}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: '#000',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
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
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  graphic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
