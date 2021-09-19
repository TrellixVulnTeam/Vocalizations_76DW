import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';

import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} src={"no image selected"} title={post.fileName} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.title}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}> 
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.comments}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" />
           Delete
        </Button>
      </CardActions>
    </Card>
  )
};

export default Post;
