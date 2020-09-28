import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import getStyles from './styles'
// import { List, Drawer, Divider, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ListItem from '@material-ui/core/ListItem';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => getStyles(theme));

export default function Layout(props)
{
    const classes = useStyles();
    const theme = useTheme();
    // const [open, setOpen] = useState(false);

    // const handleDrawerToggle = () =>
    // {
    //     setOpen(!open);
    // };

    return (
        <div className={classes.root}>
            <AppBar
                position="absolute"
                className={clsx(
                    {
                        [classes.appBar]: true, //always
                        // [classes.appBarShift]: open, //only when (open===true)
                    }
                )}
            >
                <Toolbar>
                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        className={clsx(
                            {
                                [classes.menuButton]: true,
                                [classes.hide]: open
                            }
                        )}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography noWrap variant="h6">
                        {props.text}
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer> */}
            <main
                className={clsx(
                    {
                        // [classes.contentShift]: open,
                        [classes.content]: true,
                    })}
            >
                <div className={classes.contentSpacer} /> {/*top spacer*/}
                { props.children }
                <div className={classes.contentSpacer} /> {/*bottom spacer*/}
            </main>
            <AppBar
                position="fixed"
                className={clsx({[classes.bottomAppBar]: true})}
            >
                <Toolbar variant="dense">
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}