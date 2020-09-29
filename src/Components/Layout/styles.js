const drawerWidth = 240;
const bottomBarHeight = 50

export default function getStyles(theme)
{
    return ({
        root: {
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(35deg, #D5D5D5 10%, #F0F0F0 50%)',
        },
        appBar: {
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
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
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