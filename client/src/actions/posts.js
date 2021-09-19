import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes';
import * as api from "../api";

// Action Creators are functions that return an action; an action has a type and a payload
// async (dispatch) uses the thunk middleware
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); // response from api goes in "data"
    dispatch({ type: FETCH_ALL, payload: data }); // dispatch the action so that the current state can be updated
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
  try {
      await api.singleFileUpload(data, options);
  } catch (error) {
      throw error;
  }
}
