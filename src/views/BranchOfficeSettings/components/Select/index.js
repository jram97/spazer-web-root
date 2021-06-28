import React, { useState } from 'react'
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));

const Selects = ({ title, onChange, values, name, value }) => {

    const classes = useStyles();

    const [openSelect, setOpenSelect] = useState(false);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={openSelect}
                onClose={() => setOpenSelect(false)}
                onOpen={() => setOpenSelect(true)}
                value={value}
                onChange={onChange}
                name={name}
            >
                {
                    values.map(({ label, value }, index) => (
                        <MenuItem value={value} key={`select_item_${value}_${index}`}>{label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

Selects.propTypes = {
    title: PropTypes.string,
    onChange: PropTypes.func,
    values: PropTypes.array.isRequired,
    name: PropTypes.string,
    value: PropTypes.string
}

Selects.defaultProps = {
    onChange: () => {},
    name: '',
    value: '',
    title: ''
}

export default Selects