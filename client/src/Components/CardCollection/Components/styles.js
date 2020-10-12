export default function getStyles(theme)
{
    const bottomBarHeight = theme.spacing(6) + 'px'
    const topSpacerHeight = theme.spacing(8) + 'px'
    const cardPreviewSize = {
        minWidth: '0',
        maxHeight: `311px`,
    }

    return ({

        masonryGrid: {
            display: 'flex',
            // marginLeft: '-30px', /* gutter size offset */
            flexGrow: 1,
        },
        masonryGridColumn: {
            '@global': {
                table: {
                    width: '100%',
                    borderCollapse: 'collapse',
                    borderSpacing: '2px',
                    textAlign: 'center',
                    // marginBottom: '30px',
                },
                thead: {
                    '& tr': {
                        textAlign: 'left',
                        // borderBottom: `solid #525252 2px`,
                        // borderBottom: `solid ${theme.palette.background.paper} 2px`,
                        borderBottom: `solid ${theme.palette.table.divider} 2px`,
                    },
                },
                tbody: {
                    color: theme.palette.text.secondary,
                    '& tr': {
                        // borderTop:'solid #525252 1px'
                        // borderTop: `solid ${theme.palette.background.paper} 1px`,
                        borderTop: `solid ${theme.palette.table.divider} 1px`,
                        display: 'flex',
                        alignItems: 'baseline',
                    },
                    '& .MuiTypography-root': {
                        ...theme.typography.body2,
                        // color: theme.palette.text.secondary,
                    },
                    '& .MuiIconButton-colorSecondary': {
                        color: theme.palette.table.divider,
                        // color: theme.palette.background.paper,
                        // color: theme.palette.text.secondary,
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.15rem',
                    },
                    '& .MuiInputBase-root': {
                        fontSize: "0.875rem",
                        height: '1rem',
                        color: theme.palette.text.secondary,
                        width: '1.6rem',
                    },
                    '& input': {
                        cursor: 'pointer',
                        textAlign: 'center',
                    },
                },
            },
            paddingLeft: '30px', /* gutter size */
            backgroundClip: 'padding-box',
        },
        foil: {
            minWidth: '0.5rem',
        },
        cardName: {
            flexGrow: 6,
            color: theme.palette.text.primary,
        },
        cmc: {
            paddingRight: '0.3em',
        },
        root: {
            display: 'flex',
            minHeight: `calc(100vh - ${topSpacerHeight} - ${bottomBarHeight})`,
        },
        leftPanelContainer: {
            paddingTop: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        cardPreviewContainer: {
            position: 'sticky',
            top: theme.spacing(2),
        },
        cardPreview: {
            objectFit: 'scale-down',
            objectPosition: 'top',
            borderRadius: '4.75% / 3.5%',
            ...cardPreviewSize,
        },
        rightPanelContainer: {
            display: 'flex',
            flexGrow: 1,
            
            // border: 'solid red 1px', //DEBUG
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