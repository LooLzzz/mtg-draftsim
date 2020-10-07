import { createMuiTheme as createTheme } from '@material-ui/core/styles';

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: '#D5D5D5',
            paper: '#F0F0F0',
        },
    },
    overrides: {

    }
})

const darkTheme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiTypography: {
            root: {
                color: 'white',
            },
        },
    }
})

export {
    lightTheme,
    darkTheme,
}