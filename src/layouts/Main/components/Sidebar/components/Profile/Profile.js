import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    color: 'white'
  }
}));

const Profile = props => {
  const { className, ...rest } = props;
  const userInfo = JSON.parse(localStorage.getItem('spazer_user'));

  const classes = useStyles();

  const user = {
    name: userInfo.name,
    avatar: 'assets/images/avatars/image_4.jpeg',
    bio: 'Brain Director'
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt={userInfo.name}
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      {/* <Typography variant="body2">{user.bio}</Typography> */}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
