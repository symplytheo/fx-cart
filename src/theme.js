import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0096c8',
    },
    secondary: {
      main: '#00c896',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f1f5f8',
    },
    text: {
      primary: '#212121',
      secondary: '#525454'
    }
  },
});

export default theme;
