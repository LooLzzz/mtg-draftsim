export default function getStyles(theme)
{
    const cardHeight = '75vh'

    return ({
        root: {
            minHeight: cardHeight,
            display: 'flex',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
            flexGrow: 1,
        },
        card: {
            minWidth: '35vw',
            // minHeight: cardHeight,
        },
        media: {
            // height: `calc(0.8 * ${cardHeight})`,
            height: cardHeight,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
        },
        item: {
            flexDirection: "column",
            justifyContent: "center",
            display: 'flex',
            flexGrow: 1,
        }
    })
}