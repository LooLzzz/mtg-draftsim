const cardHeight = '75vh'

export default function getStyles(theme)
{
    console.log('theme obj:', theme)

    return ({
        root: {
            minHeight: '75vh',
            flexDirection: "column",
            justifyContent: "center",
            display: 'flex',
            flexGrow: 1,
        },
        item: {
            minHeight: '100%',
            minWidth: '100%',
        },
        media: {
            height: `calc(0.8 * ${cardHeight})`,
        },
        card: {
            minHeight: {cardHeight},
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
    })
};

// export default this.getStyles