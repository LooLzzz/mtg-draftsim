import { colors } from '@material-ui/core';
import { createMuiTheme as createTheme } from '@material-ui/core/styles';

const shared = {
    palette:
    {
        colors,
    },

    overrides:
    {
        MuiCssBaseline: {
            '@global': {
                '.alignLeft': {
                    textAlign: 'left',
                },
                '.alignRight': {
                    textAlign: 'right',
                }
            },
        },
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
        table: {
            divider: 'rgba(150, 150, 150, 0.75)',
        },
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
        table: {
            divider: '#424242',
        },
        primary: {
            // main: '#2D4583',
            main: '#2D5295',
            // main: '#404664',
        },
        secondary: {
            main: '#DA7B08',
            // main: '#F3533B',
            // main: '#FA9F42',
            // main: '#F56C40',
            // main: colors.orange['900'],
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