// Import React
import React from 'react';

// Prototypes are imported
import PropTypes from 'prop-types';

// Route management is imported
import { useHistory } from 'react-router-dom';

// Import material styles
import { makeStyles } from '@material-ui/styles';

// Import material component 
import { Badge, IconButton } from '@material-ui/core';

// Import icons
import { IconsMaterial } from 'assets/icons/IconsMaterial';

// Styles are created
const useStyles = makeStyles(() => ({
    IconButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: '40px'
    },
    Span: {
        marginLeft: 10,
        fontSize: 18,
        alignSelf: 'center',
        color: '#000000'
    }
}))

/**
 * @function
 * @name Logout
 * @param {numberOfNotificacions} param0 number of notificacions
 * @returns component
 */
const Logout = ({ numberOfNotificacions }) => {

    const history = useHistory();

    //Styles are initialized
    const classes = useStyles();

    /**
     * @function
     * @name closeSession
     * @description logs out and user is redirected to login
     */
    const closeSession = () => {
        localStorage.removeItem('spazer_token');
        localStorage.removeItem('spazer_user');
        history.replace('Login');
    };

    return (
        <IconButton
            className={classes.IconButton}
            onClick={closeSession}
        >
            <Badge
                badgeContent={numberOfNotificacions}
            >
                {IconsMaterial.ExitToApp}
                <span className={classes.Span}>
                    Salir
                </span>
            </Badge>
        </IconButton>
    )
}

// Prototypes are created for the component.
Logout.propTypes = {
    numberOfNotificacions: PropTypes.number.isRequired // It will be of numeric type and it will be required
};

export default Logout;