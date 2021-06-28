import React from 'react';
import PropTypes from 'prop-types';

import Create from './Views/Create';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const BranchOfficeSettings = ({ mode }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                mode === "create" && (<Create />)
            }
        </div>
    )
}

BranchOfficeSettings.propTypes = {
    mode: PropTypes.string.isRequired
}

export default BranchOfficeSettings;