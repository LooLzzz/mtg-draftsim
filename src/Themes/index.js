import { createMuiTheme as createTheme } from '@material-ui/core/styles';

const lightTheme = createTheme({
    palette: {
        type: 'light',
    }
})

const darkTheme = createTheme({
    palette: {
        type: 'dark',
    }
})

export {
    lightTheme,
    darkTheme,
}