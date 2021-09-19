import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    label: "",
    tags: "",
    confidence: "",
    linkages: "",
    selectedFile: "",
    comments: "",
    startTime: "",
    endTime: "",
    minFreq: "",
    maxFreq: "", 
  });

  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: ""
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } Annotation Form</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
         <TextField
          name="label"
          variant="outlined"
          label="Label"
          fullWidth
          value={postData.label}
          onChange={(e) =>
            setPostData({ ...postData, label: e.target.value })
          }
        />
         <TextField
          name="confidence"
          variant="outlined"
          label="Confidence Level"
          fullWidth
          value={postData.confidence}
          onChange={(e) =>
            setPostData({ ...postData, confidence: e.target.value })
          }
        />
        <TextField
          name="linkages"
          variant="outlined"
          label="Linkages"
          fullWidth
          value={postData.linkages}
          onChange={(e) => setPostData({ ...postData, linkages: e.target.value.split(',') })}
        />
        <TextField
          name="comments"
          variant="outlined"
          label="Comments"
          fullWidth
          value={postData.comments}
          onChange={(e) =>
            setPostData({ ...postData, comments: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <TextField
          name="startTime"
          variant="outlined"
          label="StartTime"
          fullWidth
          value={postData.startTime}
          onChange={(e) =>
            setPostData({ ...postData, startTime: e.target.value })
          }
        />
        <TextField
          name="endTime"
          variant="outlined"
          label="EndTime"
          fullWidth
          value={postData.endTime}
          onChange={(e) =>
            setPostData({ ...postData, endTime: e.target.value })
          }
        />
        <TextField
          name="minFreq"
          variant="outlined"
          label="MinFreq"
          fullWidth
          value={postData.minFreq}
          onChange={(e) =>
            setPostData({ ...postData, minFreq: e.target.value })
          }
        />
        <TextField
          name="maxFreq"
          variant="outlined"
          label="MaxFreq"
          fullWidth
          value={postData.maxFreq}
          onChange={(e) =>
            setPostData({ ...postData, maxFreq: e.target.value })
          }
        />
        <Button
          className={classes.buttonSubbmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
