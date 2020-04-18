import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import getStyles from './styles'
const useStyles = makeStyles((theme) => getStyles(theme));

export default function Layout(props)
{
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () =>
    {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position = "fixed"
                className = { clsx(
                    {
                        [classes.appBar]: true, //always
                        [classes.appBarShift]: open, //only when (open===true)
                    }
                )}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        className = { clsx(
                            {
                                [classes.menuButton]: true,
                                [classes.hide]: open
                            }
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className = { classes.drawer }
                variant = "persistent"
                anchor = "left"
                open = { open }
                classes = {{ paper: classes.drawerPaper }}
            >
                <div className = { classes.drawerHeader }>
                    <IconButton onClick = { handleDrawerToggle }>
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
            </Drawer>
            <main
                className = { clsx(
                {
                    [classes.content]: true,
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                { props.children }
            </main>
        </div>
    );
}