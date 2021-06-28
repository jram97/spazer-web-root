import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { IconsMaterial } from 'assets/icons/IconsMaterial';

const useStyles = makeStyles(() => ({
    Button: {
        width: 'max-content',
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    Title: {
        fontSize: 20
    },
    Subtitle: {
        marginLeft: 10
    }
}))

const Buttons = ({title, subtitle, icon, type, onClick}) => {
    
    const classes = useStyles();

    return (
        <Button
            size="large"
            variant="contained"
            color={type}
            className={classes.Button}
            onClick={onClick}
        >
            {
                icon && IconsMaterial[icon]
            }
            {
                title && <span className={classes.Title}>{title}</span>
            }
            {
                subtitle && <span className={title && classes.Subtitle}>{subtitle}</span>
            }
        </Button>
    )
}

Buttons.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    icon: PropTypes.string
}

Buttons.defaultProps = {
    onClick: () => {},
    title: '',
    subtitle: '',
    icon: ''
}

export default Buttons;