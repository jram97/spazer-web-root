import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, Grid } from '@material-ui/core';
import { IconsMaterial } from 'assets/icons/IconsMaterial';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    card: {
        padding: 10,
        display: 'flex',
        position: 'relative'
    },
    margin: {
        margin: 10
    },
    delete: {
        color: 'gray',
        position: 'absolute',
        right: '0px',
        marginTop: '-10px',
        background: '#fff',
        height: 'min-content',
        borderRadius: '50px',
        display: 'flex',
        '&:hover': {
            color: 'black',
            cursor: 'pointer'
        }
    }
}))

const Image = ({ url, onRemove }) => {

    const classes = useStyles();

    return (
        <Grid item sm={2} xs={12} className={classes.margin}>
            <Card
                className={classes.card}
            >
                <img
                    alt="complexes-slot"
                    src={url}
                    className={classes.image}
                />
                <div className={classes.delete} onClick={onRemove}>
                    {IconsMaterial.Cancel}
                </div>
            </Card>
        </Grid>
    )
}

Image.propTypes = {
    url: PropTypes.string.isRequired,
    onRemove: PropTypes.func
}

Image.defaultProps = {
    onRemove: () => {}
}

export default Image;