import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import FeaturesCard from './cards/featuresCard';
import GeneralInfoCard from './cards/generalInfoCard';
import { getBranchById } from 'services/branchesService';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const BranchSettings = () => {
  const classes = useStyles();
  const [branchOffice, setBranchOffice] = useState({});

  useEffect(() => {
    getBranchInfo();
  }, []);

  const getBranchInfo = async () => {
    try {
      const branchInfo = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice;
      let { data } = await getBranchById(branchInfo._id);
      setBranchOffice(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className={classes.root}>
      <FeaturesCard branchInfo={branchOffice} />
      <GeneralInfoCard branchInfo={branchOffice} />
    </div>
  );
};

export default BranchSettings;
