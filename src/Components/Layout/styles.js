// import { darkTheme as theme } from 'Themes'

export default function getStyles(theme)
{
    const drawerWidth = 240
    const bottomBarHeight = 50
    const mainLeftRightPadding = theme.spacing(19)

    // console.log('theme palette:', theme.palette) //DEBUG

    return ({
        root: {
            display: 'flex',
            minHeight: '100vh',
            // background: theme.palette.grey['400'],
            background: theme.palette.background.default,
            // background: `linear-gradient(35deg, ${theme.palette.background} 10%, #F0F0F0 50%)`,
            // background: 'linear-gradient(35deg, #D5D5D5 10%, #F0F0F0 50%)',
        },
        appBar: {
            paddingLeft: mainLeftRightPadding,
            paddingRight: mainLeftRightPadding,
            position: "absolute",
            backgroundColor: 'rgba(0,0,0,0.25)',
            // color: 'black',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        bottomAppBar: {
            minHeight: `${bottomBarHeight}px`,
            top: `calc(100vh - ${bottomBarHeight}px)`,
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        contentSpacer: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            // paddingTop: theme.spacing(0.5),
            // paddingBottom: theme.spacing(0.5),
            paddingLeft: mainLeftRightPadding,
            paddingRight: mainLeftRightPadding,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            // marginLeft: -drawerWidth,
            // marginLeft: '1vmin',
            // marginRight: '1vmin',
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    })
};