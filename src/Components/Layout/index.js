import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import getStyles from './styles'
import { withRouter } from 'react-router';
// import { List, Drawer, Divider, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ListItem from '@material-ui/core/ListItem';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
// import { Link } from 'react-router-dom';

const useStyles = (theme) => getStyles(theme);

function tabNameToIndex(name)
{
    switch (name) {
        default: //defaults to Main
            return 0;
        
        case 'Draftsim':
            return 1;
    
        case 'Collection':
            return 2;
    }
}

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {...props}

        this.handleClick = (event, url) => {
            this.setState({
                currentTab: url,
            })
            return this.props.history.push('/' + url)
        }
    }

    componentDidUpdate(oldProps)
    {
        if (oldProps.currentTab !== this.props.currentTab)
            this.setState({
                ...this.props
            })
    }

    // const theme = useTheme();
    // const [open, setOpen] = useState(false);

    // const handleDrawerToggle = () =>
    // {
    //     setOpen(!open);
    // };

    render()
    {
        const {classes} = this.props;
        let items = [
            {
                label: 'Main',
                url: '',
            },
            {
                label: 'Draftsim',
                url: 'draftsim',
            },
            {
                label: 'Collection',
                url: 'collection',
            },
        ]

        return (
            <div className={classes.root}>
                <AppBar
                    position = "absolute"
                    className = {classes.appBar}
                >
                    <Tabs value={tabNameToIndex(this.state.currentTab)}>
                        {items.map((item, i) => (
                            <Tab
                                key = { i }
                                label = { item.label }
                                onClick = { (event) => (this.handleClick(event, item.url)) }
                            />
                        ))}
                    </Tabs>
                </AppBar>
                <main className={classes.content} >
                    <div className={classes.contentSpacer} /> {/*top spacer*/}
                    { this.props.children }
                    <div className={classes.contentSpacer} /> {/*bottom spacer*/}
                </main>
                <AppBar
                    position = "fixed"
                    className = {classes.bottomAppBar}
                >
                    <Toolbar variant="dense">
                        {/* bottom bar */}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Layout))
