import { Card, Grid, Typography } from '@material-ui/core'
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    noImageContainer: {
        width: '100%',
        padding: 20,
        height: 'auto',
        minHeight: 120,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    name: {
        marginTop: theme.spacing(1),
        color: 'black'
    },
    icon: {
        fontSize: '40px'
    }
}));

const EmptySection = ({ title }) => {

    const classes = useStyles();

    return (
        <Grid item md={12} xs={12}>
            <Card
                className={classes.noImageContainer}
            >
                <AccountBoxIcon className={classes.icon} />

                <Typography className={classes.name} variant="h4">
                    {title}
                </Typography>
            </Card>
        </Grid>
    )
}

EmptySection.propTypes = {
    title: PropTypes.string
}

export default EmptySection;