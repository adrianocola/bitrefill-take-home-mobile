import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

export const Screen = ({style, ...props}: ViewProps) => {
  return <View {...props} style={[styles.screen, style]} />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
