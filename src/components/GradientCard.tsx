import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardProps} from 'react-native-ui-lib';

interface LaminatedCardProps extends CardProps {
  color: string;
}

export const GradientCard = ({color, children, ...props}: LaminatedCardProps) => {
  return (
    <Card {...props}>
      <LinearGradient colors={[color, 'transparent']} style={styles.background} />
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
  },
});
