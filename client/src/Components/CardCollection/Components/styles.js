export default function getStyles(theme)
{
    const bottomBarHeight = theme.spacing(6) + 'px'
    const topSpacerHeight = theme.spacing(8) + 'px'
    const cardPreviewSize = {
        minWidth: '0',
        maxHeight: `311px`,
    }

    return ({
        root: {
            display: 'flex',
            minHeight: `calc(100vh - ${topSpacerHeight} - ${bottomBarHeight})`,
            // flexDirection: 'row',
            // justifyContent: "space-evenly",
            // alignItems: "flex-start",
            // flexGrow: 1,

            // border: 'solid orange 1px', //DEBUG
        },
        leftPanelContainer: {
            // flexGrow: 1,
            // paddingLeft: theme.spacing(5),
            paddingTop: theme.spacing(2),
            paddingRight: theme.spacing(1),

            // border: 'solid blue 1px', //DEBUG
        },
        cardPreviewContainer: {
            position: 'sticky',
            top: theme.spacing(2),
        },
        cardPreview: {
            // position: 'sticky',
            // top: theme.spacing(2),
            objectFit: 'scale-down',
            objectPosition: 'top',
            borderRadius: '4.75% / 3.5%',
            ...cardPreviewSize,
        },
        rightPanelContainer: {
            display: 'flex',
            // alignSelf: 'flex-start',
            flexGrow: 1,
            paddingLeft: theme.spacing(1),
            
            // border: 'solid red 1px', //DEBUG
        },
        cardlistContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            // flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            flexGrow: 1,
        },
        item: {
            margin: theme.spacing(0.5),
            flexGrow: 1,
        },
        contentSpacer: {
            display: 'block',
            minHeight: theme.spacing(6),
            // necessary for content to be above/below app bar
        },
        bottomAppBar: {
            minHeight: bottomBarHeight,
            top: `calc(100vh - ${bottomBarHeight})`,
            position: "fixed",
        },
    })
}