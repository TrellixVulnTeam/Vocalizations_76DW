import React, { useState } from 'react';
import { AppBar, Typography, Button, CircularProgress } from '@material-ui/core';
import { singleFileUpload } from '../../actions/posts';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const Upload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [singleFile, setSingleFile] = useState('');
  const [singleProgress, setSingleProgress] = useState(0);

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
    setSingleProgress(0);
  }

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
        setSingleProgress(percentage);
    }
  }

  const uploadSingleFile = () => {
    const formData = new FormData(); // uses same format a form would use if the encoding type were set to "multipart/form-data"
    formData.append('file', singleFile);
    dispatch(singleFileUpload(formData, singleFileOptions));
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h6" align="center">Upload Vocalization File</Typography>
        <div className={classes.fileInput}>
          <div className="form-group">
              <input type="file" className="form-control" onChange={(e) => SingleFileChange(e)} />
          </div>
        </div>
        <Button
          className={classes.buttonSubbmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          onClick={() => uploadSingleFile()}
        >
          Upload
        </Button>
        
        <CircularProgress variant="determinate" value={singleProgress} />
    </AppBar>
  );
};

export default Upload;