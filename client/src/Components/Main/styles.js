export default function getStyles(theme)
{
    const cardHeight = '75vh'

    return ({
        root: {
            minHeight: '75vh',
            flexDirection: "column",
            justifyContent: "center",
            display: 'flex',
            flexGrow: 1,
        },
        media: {
            height: `calc(0.8 * ${cardHeight})`,
        },
        card: {
            minHeight: {cardHeight},
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        divider: {
            marginBottom: theme.spacing(4),
        },
    })
};