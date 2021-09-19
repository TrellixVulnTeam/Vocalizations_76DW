import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';

import DynamicFormIcon from '@mui/icons-material/DynamicForm';

import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts()); // dispatch the getPosts action to the store
  }, [currentId, dispatch]);

  const handleState = () => {
    console.log('show form');
    setShowForm(showForm => !showForm);
  }

  const renderForm = () => {
    return (
      <Grid item xs={12} sm={4}>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </Grid>
    )
  }

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Button style={{color: 'white'}} size="large" startIcon={<DynamicFormIcon />} onClick={() => handleState()}>Create Annotation Form
          
          </Button>
          {/* We want to show the form if the state is true */}
          {showForm ? renderForm() : null}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;