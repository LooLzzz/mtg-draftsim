export default function getStyles(theme)
{
    return ({
        root: {
            minHeight: '80vh',
            // width: '30vw',
            // flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(3),
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center',
            // flexDirection: "column",
            // flexGrow: 0.1,
        },
    })
}