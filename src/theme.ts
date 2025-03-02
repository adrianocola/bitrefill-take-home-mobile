import {Colors, TextFieldProps, ThemeManager} from 'react-native-ui-lib';

Colors.setScheme('dark');

ThemeManager.setComponentTheme('TextField', (props: TextFieldProps) => ({
  style: [
    {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15,
    },
    props.style,
  ],
  validationMessageStyle: [{marginTop: 5}, props.validationMessageStyle],
}));
