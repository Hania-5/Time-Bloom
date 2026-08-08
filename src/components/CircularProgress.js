import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

// A circular progress ring. `progress` is a value from 0 to 1.
// Sits behind whatever you render as its child (pass the timer text
// as children and it'll be centered on top of the ring).
export default function CircularProgress({ progress, size = 260, strokeWidth = 10, children }) {
  const { theme } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const strokeDashoffset = circumference * (1 - clampedProgress);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {/* Track (background ring) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.surface}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          // Rotate so progress starts from the top (12 o'clock) instead of the right (3 o'clock)
          origin={`${size / 2}, ${size / 2}`}
          rotation={-90}
        />
      </Svg>
      {children}
    </View>
  );
}
