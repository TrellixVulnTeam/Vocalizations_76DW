import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Button, CircularProgress } from '@material-ui/core';
import { singleFileUpload, getSingleFiles } from '../../data/api';
import useStyles from './styles';

const Upload = () => {
  const classes = useStyles();
  const [singleFile, setSingleFile] = useState('');
  const [singleFiles, setSingleFiles] = useState([]);
  const [singleProgress, setSingleProgress] = useState(0);

  useEffect(() => {
    getSingleFileslist();
  }, []);

  const getSingleFileslist = async () => {
    try {
        const fileslist = await getSingleFiles();
        setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }

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

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append('file', singleFile);
    await singleFileUpload(formData, singleFileOptions);
    // getSingleFileslist();
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