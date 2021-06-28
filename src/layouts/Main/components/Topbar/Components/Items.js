// Import React
import React from 'react';

// Route management is imported
import { NavLink } from 'react-router-dom';

// Import material styles
import { makeStyles } from '@material-ui/styles';

// Route imports
import { Pages } from 'config/Pages';

// Styles are created
const useStyles = makeStyles(() => ({
    itemsToolbar: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    items: {
        textDecoration: 'none',
        outline: 'none',
        color: 'gray',
        fontSize: '18px',
        maxWidth: '200px',
        flex: 1,
        height: '50px',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    itemSelected: {
        color: 'black',
        borderBottom: '4px solid #D0FF63'
    }
}));

/**
 * @function
 * @name Items
 * @returns component
 */
const Items = () => {

    //Styles are initialized
    const classes = useStyles();

    // Get type user
    let userRole = JSON.parse(localStorage.getItem('spazer_user'));

    return (
        <div className={classes.itemsToolbar}>
            {
                Pages
                    .filter(({ role }) => role.includes(userRole.role))
                    .map(({ title, href }, i) =>
                        <NavLink
                            to={href}
                            className={classes.items}
                            activeClassName={classes.itemSelected}
                            key={`TopBar_${title}_${i}`}
                        >
                            {title}
                        </NavLink>
                    )
            }
        </div>
    )
}

export default Items;