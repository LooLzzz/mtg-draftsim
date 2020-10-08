import { colors } from '@material-ui/core';
import { createMuiTheme as createTheme } from '@material-ui/core/styles';
// import { deepOrange } from '@material-ui/core/colors';

const sharedOverrides = {
    MuiTextField: {
        root: {
            width: '100%',
            margin: '0.4em',
        },
    },
    MuiPaper: {
        rounded: {
            borderRadius: '12.5px',
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
        // secondary: deepOrange,
    },
    overrides: {
        MuiTypography: {
            root: {
                color: 'white',
            },
        },
        // MuiFormLabel: {
        //     root: {
        //         '&$focused': {
        //             color: colors.red['A400'],
        //         },
        //     }
        // },
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