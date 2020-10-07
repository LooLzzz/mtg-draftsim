import { createMuiTheme as createTheme } from '@material-ui/core/styles';

const sharedOverrides = {
    MuiTextField: {
        root: {
            width: '100%'
        },
    },
}

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: '#D5D5D5',
            paper: '#F0F0F0',
        },
    },
    overrides: {
        ...sharedOverrides
    },
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
        MuiCircularProgress: {
            circle: {
                color: 'white'
            },
        },
        ...sharedOverrides,
    },
})

export {
    lightTheme,
    darkTheme,
}