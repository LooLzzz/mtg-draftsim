// import { darkTheme as theme } from 'Themes'

export default function getStyles(theme)
{
    const bottomBarHeight = '50px'
    const mainSidesPadding = theme.spacing(15)

    // console.log('theme palette: (from \'layout/styles\')', theme.palette) //DEBUG

    return ({
        root: {
            display: 'flex',
            minHeight: '100vh',
            minWidth: '100wh',
            maxWidth: '100wh',
            // background: theme.palette.background.default,
            background: `linear-gradient(35deg, ${theme.palette.background.default} 10%, ${theme.palette.background.paper} 50%)`,
            // background: `linear-gradient(35deg, ${theme.palette.background.paper} 10%, ${theme.palette.background.default} 50%)`,
            // background: 'linear-gradient(35deg, #D5D5D5 10%, #F0F0F0 50%)',
        },
        'box-shadow': {
            position: 'absolute',
            marginLeft: mainSidesPadding,
            marginRight: mainSidesPadding,
        },
        appBar: {
            paddingLeft: mainSidesPadding,
            paddingRight: mainSidesPadding,
            position: "absolute",
            // backgroundColor: theme.palette.type === 'dark' ? 'rgba(0,0,0,0.25)' : theme.palette.primary,
            // backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary : theme.palette.primary,
            // color: theme.palette.text.primary,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarIcon: {
            color: theme.palette.common.white
        },
        bottomAppBar: {
            minHeight: bottomBarHeight,
            top: `calc(100vh - ${bottomBarHeight})`,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        contentSpacer: {
            display: 'flex',
            alignItems: 'center',
            // padding: theme.spacing(0, 1),
            minHeight: theme.spacing(8),
            justifyContent: 'flex-end',
            // ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            // display: 'flex',
            // paddingTop: theme.spacing(0.5),
            // paddingBottom: theme.spacing(0.5),
            paddingLeft: mainSidesPadding,
            paddingRight: mainSidesPadding,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            // boxShadow: theme.shadows[4]
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        listItemText: {
            marginRight: theme.spacing(1),
        },
        ListItemIcon: {
            marginRight: theme.spacing(2.5),
            width: 'auto',
            minWidth: 'auto',
        },
    })
}