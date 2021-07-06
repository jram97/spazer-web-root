import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Create, Edit } from './Views';

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

            {
                mode === "edit" && (<Edit />)
            }
        </div>
    )
}

BranchOfficeSettings.propTypes = {
    mode: PropTypes.string.isRequired
}

export default BranchOfficeSettings;