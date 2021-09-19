import React, { useState } from 'react';
import { AppBar, Typography, CircularProgress } from '@material-ui/core';
import { Toolbar, Button, Menu, MenuItem } from '@mui/material';
import { singleFileUpload } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

import useStyles from './styles';

Modal.setAppElement('#root');

const Navbar = () => {
  const classes = useStyles();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
    handleClose();
  }
  
  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

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
      <Toolbar className={classes.toolbar}>

        <Button  id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>MENU
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => handleCloseModal}
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
          <div>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
        </Modal>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleOpenModal}>Upload Vocalization</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>


        <Typography className={classes.heading} variant="h2" align="center" >Vocalizations</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;