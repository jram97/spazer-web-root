import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    card: {
        width: '100%',
        padding: 20,
        height: 'auto',
        marginTop: 30
    }
}));

const Container = ({ children }) => {

    const classes = useStyles();

    return (
        <Grid container>
            <Card
                className={classes.card}
            >
                {children}
            </Card>
        </Grid>
    )
}

export default Container;