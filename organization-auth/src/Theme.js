import {createMuiTheme} from '@material-ui/core'
import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

const theme = createMuiTheme({
    palette: {
      primary: {
        contrastText: white,
        main: "#00aee5",
        light: colors.indigo[100]
      },
      main: '#00aee5',
      sec: "#576574"
    },
    typography: {
      fontFamily: 'Roboto',
      logoFont: "GochiHand"
    }
  });

  export default theme