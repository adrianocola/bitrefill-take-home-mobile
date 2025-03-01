import React from 'react';
import {Text} from 'react-native-ui-lib';

interface FormLabelProps {
  label: string;
}

export const FormLabel = ({label}: FormLabelProps) => {
  return (
    <Text text60BO marginB-5>
      {label}
    </Text>
  );
};
