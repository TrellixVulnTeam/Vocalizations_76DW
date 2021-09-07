import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item>
            {/* <Posts setCurrentId={setCurrentId} /> */}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;