import {Colors, TextFieldProps, ThemeManager} from 'react-native-ui-lib';

Colors.setScheme('dark');

ThemeManager.setComponentTheme('TextField', (props: TextFieldProps) => ({
  fieldStyle: [
    {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15,
      backgroundColor: Colors.$backgroundNeutralLight,
    },
    props.fieldStyle,
  ],
  validationMessageStyle: [{marginTop: 5}, props.validationMessageStyle],
}));

ThemeManager.setComponentTheme('Button', {
  'bg-$backgroundInverted': true,
});
