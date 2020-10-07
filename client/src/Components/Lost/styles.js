export default function getStyles(theme)
{
    const cardHeight = '75vh'

    return ({
        root: {
            minHeight: cardHeight,
            width: '30vw',
            flexDirection: "column",
            justifyContent: "center",
            display: 'flex',
            flexGrow: 1,
        },
        media: {
            height: `calc(0.8 * ${cardHeight})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
        },
        card: {
            minHeight: {cardHeight},
        },
        item: {
            flexDirection: "column",
            justifyContent: "center",
            display: 'flex',
            flexGrow: 1,
        }
    })
}