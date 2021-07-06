import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
}))


const Loading = () => {

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <CircularProgress color="secondary" />
        </div>
    )
}

export default Loading;