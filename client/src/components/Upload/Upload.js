import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Button, CircularProgress } from '@material-ui/core';
import { singleFileUpload, getSingleFiles } from '../../data/api';
import Modal from 'react-modal';

import useStyles from './styles';

Modal.setAppElement('#root');

const Upload = () => {
  const classes = useStyles();
  const [singleFile, setSingleFile] = useState('');
  const [singleFiles, setSingleFiles] = useState([]);
  const [singleProgress, setSingleProgress] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    const response = await singleFileUpload(formData, singleFileOptions);
    console.log(response);
    if (response.status === 201) {
      setModalIsOpen(true);
    } else {
      alert(response.data);
    }
  }

  const processFile = async () => {
    console.log('server process file ', singleFile);
    setModalIsOpen(false);
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'grey'
          },
          content: {
            position: 'absolute',
            width: '20%',
            height: '20%',
            top: '40%',
            left: '40%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
          >
          <h2>Do you want to process your data now?</h2>
          <div>
            <button onClick={() => processFile()}>Yes</button>
            <button onClick={() => setModalIsOpen(false)}>No</button>
          </div>
        </Modal>
        <CircularProgress variant="determinate" value={singleProgress} />
    </AppBar>
  );
};

export default Upload;