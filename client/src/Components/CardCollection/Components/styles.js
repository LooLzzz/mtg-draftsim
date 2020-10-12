export default function getStyles(theme)
{
    const bottomBarHeight = theme.spacing(6) + 'px'
    const topSpacerHeight = theme.spacing(8) + 'px'
    const cardPreviewSize = {
        minWidth: '0',
        maxHeight: `311px`,
    }

    return ({
        '@global': {
            table: {
                borderCollapse: 'collapse',
                borderSpacing: '2px',
                flexGrow: 1,
                textAlign: 'center',
                maxWidth: '22%',
                minWidth: '22%',
                width: '2%',
                marginRight: '1%',
                marginLeft: '1%',

                // border: '1px orange solid', //DEBUG
            },
            thead: {
                '& tr': {
                    textAlign: 'left',
                    // borderBottom: `solid #525252 2px`
                    borderBottom: `solid ${theme.palette.background.paper} 2px`
                },
            },
            tbody: {
                // color: theme.palette.text.secondary,
                '& tr': {
                    // borderTop:'solid #525252 1px'
                    borderTop: `solid ${theme.palette.background.paper} 1px`
                },
                '& .MuiTypography-root': {
                    ...theme.typography.body2,
                    color: theme.palette.text.secondary,
                },
            },
        },
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
            gap: '10px',
            paddingLeft: theme.spacing(1),
            
            // border: 'solid red 1px', //DEBUG
        },
        cardlistContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            // flexDirection: 'column',
            justifyContent: 'left',
            alignContent: 'space-around',
            alignItems: 'start',
            flexGrow: 1,
        },
        cardRow: {
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
            textAlign: 'center',
            // alignItems: 'center',
            // color: theme.palette.text.primary,
          
            border: 'solid orange 1px', //DEBUG
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