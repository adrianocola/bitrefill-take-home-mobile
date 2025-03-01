import {Colors, TextFieldProps, ThemeManager} from 'react-native-ui-lib';

Colors.setScheme('dark');

ThemeManager.setComponentTheme('TextField', (props: TextFieldProps) => ({
  style: [
    {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      padding: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    props.style,
  ],
  validationMessageStyle: [{marginTop: 5}, props.validationMessageStyle],
}));
