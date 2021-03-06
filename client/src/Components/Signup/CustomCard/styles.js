export default function getStyles(theme)
{
    const iconSize = '4.5em'

    return ({
        root: {
            padding: theme.spacing(3),
            paddingBottom: '0',
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center',
            flexDirection: "column",
        },
        header: {
            alignSelf: 'flex-end',
        },
        icon: {
            fontSize: iconSize,
            alignSelf: 'flex-start',
            position: 'relative',
        },
        divider: {
            bottom: `calc(${iconSize} - 0.55em)`,
            marginBottom: theme.spacing(3),
            width: `calc(100% + 2*${theme.spacing(3)}px)`,
            position: 'relative',
        },
        bot: {
            position: 'relative',
            bottom: '2em',
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center',
            flexDirection: "column",
        },
        content: {
            paddingBottom: theme.spacing(2),
        },
        action: {
            alignSelf: 'flex-end',
        },
    })
}