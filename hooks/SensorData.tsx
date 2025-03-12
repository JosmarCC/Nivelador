import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function SensorData() {
  const [data, setData] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let subscription = Accelerometer.addListener(({ x, y }) => {
      setData({ x, y });
    });

    return () => subscription && subscription.remove();
  }, []);

  return data;
}
