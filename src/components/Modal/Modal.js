import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Backdrop, Fade, Modal, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        outline: 'none'

    },
    header: {
        color: 'black',
        marginTop: 15
    },
    boldText: {
        fontWeight: 'bold'
    }
}))

const Modals = ({ onClose, open, title, children }) => {

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}>
            <Fade in={open}>
                <div className={classes.modalContainer}>
                    <Typography
                        className={classes.header}
                        variant="h4"
                    >
                        <span className={classes.boldText}>{title}</span>
                    </Typography>
                    {children}
                </div>
            </Fade>
        </Modal>
    )
}

Modals.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string
}

Modals.defaultProps = {
    title: ''
}

export default Modals;