import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { Button } from 'components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    name: {
        marginTop: theme.spacing(1),
        color: 'black'
    },
    createBranchContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    marginLabel: {
        marginTop: 30
    }
}));

const Header = ({sectionName, onClickButton, buttonText, isActiveMargin}) => {

    const classes = useStyles()

    return (
        <Grid container className={isActiveMargin ? classes.marginLabel : ''}>
            <Grid item md={6} sm={6} xs={12}>
                <Typography className={classes.name} variant="h4">
                    {sectionName}
                </Typography>
            </Grid>
            <Grid
                item
                md={6}
                sm={6}
                xs={12}
                className={classes.createBranchContainer}
            >
                <Button
                    subtitle={buttonText}
                    onClick={onClickButton}
                    type="primary"
                />
            </Grid>
        </Grid>
    )
}

Header.propTypes = {
    sectionName: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onClickButton: PropTypes.func,
    isActiveMargin: PropTypes.bool
}

Header.defaultProps = {
    onClickButton: () => {},
    isActiveMargin: false
}

export default Header;