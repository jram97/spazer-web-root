import React, { useState } from 'react';
import {
  Card,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Badge
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  branchInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(5),
    position: 'relative'
  },
  branchAvatar: {
    height: theme.spacing(30),
    width: theme.spacing(30),
    marginBottom: theme.spacing(5)
  },
  marginBottomLabel: {
    marginBottom: theme.spacing(3)
  },
  editionIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  editionAvatarIcon: {
    backgroundColor: theme.palette.primary.main
  }
}));

const GeneralInfo = () => {
  const classes = useStyles();
  let [editionMode, setEditionMode] = useState(false);
  let [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('spazer_user'))
  );
  let [userInfoAux, setUserInfoAux] = useState(
    JSON.parse(localStorage.getItem('spazer_user'))
  );
  let [imageToUpdate, setImageToUpdate] = useState('');
  const inputAvatarRef = React.useRef(null);

  const handleEditionMode = () => {
    setEditionMode(!editionMode);
  };

  const handleImageToUpdate = () => {
    inputAvatarRef.current.click();
  };

  const handleImageSelected = event => {
    let userInfoToUpdate = { ...userInfoAux };
    userInfoToUpdate.avatar = URL.createObjectURL(event.target.files[0]);
    setImageToUpdate(event.target.files[0]);
    setUserInfoAux(userInfoToUpdate);
  };

  const renderAvatar = () => {
    if (editionMode) {
      return (
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          badgeContent={
            <IconButton
              onClick={handleImageToUpdate}
              className={classes.editionAvatarIcon}>
              <EditIcon />
            </IconButton>
          }>
          <Avatar
            alt={userInfoAux.name}
            src={userInfoAux.avatar}
            className={classes.branchAvatar}
          />
          <input
            ref={inputAvatarRef}
            onChange={handleImageSelected}
            type="file"
            hidden
          />
        </Badge>
      );
    } else {
      return (
        <Avatar
          alt={userInfo.name}
          src={userInfo.avatar}
          className={classes.branchAvatar}
        />
      );
    }
  };

  return (
    <Card fullWidth className={classes.branchInfoContainer}>
      <IconButton className={classes.editionIcon} onClick={handleEditionMode}>
        {editionMode ? <CloseIcon /> : <EditIcon />}
      </IconButton>
      {renderAvatar()}

      <Typography variant={'h4'}>{userInfo.name}</Typography>
      <Typography variant={'h6'} className={classes.marginBottomLabel}>
        {userInfo.email}
      </Typography>
      <Divider />
      <Typography variant={'h4'}>Gambeta los Próceres</Typography>
      <Typography variant={'h6'} className={classes.marginBottomLabel}>
        gambeta@spazer.com
      </Typography>
      <Typography>
        Col. San Francisco, Calle #1, 200metros arriba de Gevesa
      </Typography>
    </Card>
  );
};

export default GeneralInfo;
