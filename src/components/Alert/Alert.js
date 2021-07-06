import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
    alert: {
        fontSize: 16
    }
}))

const Notify = (props) => {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const Alert = ({ open, handleClose, title, type, time }) => {

    const classes = useStyles();

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={time} 
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Notify onClose={handleClose} severity={type} className={classes.alert}>
                {title}
            </Notify>
        </Snackbar>
    )
}

Alert.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string,
    time: PropTypes.number
}

Alert.defaultProps = {
    handleClose: () => {},
    title: '',
    type: 'success',
    time: 6000
}

export default Alert;