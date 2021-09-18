import { CREATE, UPDATE, DELETE, FETCH_ALL, UPLOAD } from '../constants/actionTypes';
import * as api from "../api";

// Actions and Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id});
  } catch (error) {
    console.log(error);
  }
}

export const singleFileUpload = (data, options) => async (dispatch) => {
  console.log('here');
  try {
      await api.singleFileUpload(data, options);
      dispatch({ type: UPLOAD, payload: data, options});
  } catch (error) {
      throw error;
  }
}
