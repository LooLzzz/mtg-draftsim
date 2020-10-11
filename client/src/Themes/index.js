import { colors } from '@material-ui/core';
import { createMuiTheme as createTheme } from '@material-ui/core/styles';

const shared = {
    palette:
    {
        colors,
    },

    overrides:
    {
        // MuiCssBaseline: {
        //     '@global': {
        //         '.cardlistTable': {
        //             backgroundColor: 'red',
        //         }
        //     },
        // },
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
    },
}

const lightTheme = createTheme({
    palette:
    {
        ...shared.palette,
        type: 'light',
        background: {
            default: '#D5D5D5',
            paper: '#F0F0F0',
        },
    },

    overrides:
    {
        ...shared.overrides,
    }
})

const darkTheme = createTheme({
    palette:
    {
        ...shared.palette,
        type: 'dark',
        secondary: {
            main: colors.orange['900'],
        },
        // secondary: deepOrange,
    },

    overrides:
    {
        ...shared.overrides,
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
    },
})

export {
    lightTheme,
    darkTheme,
}