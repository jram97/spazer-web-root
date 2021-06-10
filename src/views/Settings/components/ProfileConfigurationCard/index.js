import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography, Avatar } from '@material-ui/core';
import './profile-configuration.css';

const useStyles = makeStyles(theme => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    alignItems: 'center',
    position: 'relative'
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 30,
    zIndex: 10
  },
  userLabels: {
    marginBottom: 10
  }
}));

const ProfileConfigurationCard = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  let userInfo = JSON.parse(localStorage.getItem('spazer_user'));
  return (
    <Card {...rest}>
      <CardContent className={classes.contentContainer}>
        <Avatar
          alt={userInfo.name}
          src={userInfo.avatar}
          className={classes.avatar}
        />
        <Typography variant="h3" className={classes.userLabels}>
          {userInfo.name}
        </Typography>
        <Typography variant="h4" className={classes.userLabels}>
          {userInfo.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileConfigurationCard;
