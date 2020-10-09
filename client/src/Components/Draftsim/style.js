export default function getStyles(theme)
{
    return ({
        'container-main': {
            display: 'flex',
            margin: 0,
        },
        'container-cards': {
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            margin: 0,
        },
        'container-side': {
            display: 'flex',
            justifyContent: 'center',
            width: '14%',
            margin: 0,
        },
        'container-hover': {
            position: 'fixed',
            width: '318px',
            height: '444px',
            marginTop: '20px',
            /* borderWidth: '1px', */
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            borderRadius: '5%',
        },
    })
}