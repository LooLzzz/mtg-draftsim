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
            // background: theme.palette.background.default,
            background: `linear-gradient(35deg, ${theme.palette.background.default} 10%, ${theme.palette.background.paper} 50%)`,
            // background: `linear-gradient(35deg, ${theme.palette.background.paper} 10%, ${theme.palette.background.default} 50%)`,
            // background: 'linear-gradient(35deg, #D5D5D5 10%, #F0F0F0 50%)',
        },
        appBar: {
            paddingLeft: mainLeftRightPadding,
            paddingRight: mainLeftRightPadding,
            position: "absolute",
            backgroundColor: theme.palette.type === 'dark' ? 'rgba(0,0,0,0.25)' : theme.palette.primary,
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
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        listItemText: {
            marginRight: theme.spacing(2),
        },
        ListItemIcon: {
            marginRight: theme.spacing(1),
            width: 'auto',
            minWidth: 'auto',
        },
    })
};