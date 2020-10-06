export default function getStyles(theme)
{
    const cardHeight = '75vh'
    const bottomBarHeight = 50

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
        contentSpacer: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be above/below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        bottomAppBar: {
            minHeight: `${bottomBarHeight}px`,
            top: `calc(100vh - ${bottomBarHeight}px)`,
            position: "fixed",
        },
    })
}