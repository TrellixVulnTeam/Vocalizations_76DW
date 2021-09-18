import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes';

/* eslint-disable import/no-anonymous-default-export */
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; // the actual posts
    case CREATE:
      return [...posts, action.payload]; // make copy of posts object and only update the payload
    case UPDATE:
      return posts.map((post) => post._id === action.payload._id ? action.payload : post);
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
