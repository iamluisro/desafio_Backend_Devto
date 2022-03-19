const Post = require("../models/posts");

function getAllPost() {
  return Post.find({});
}

function createNewPost(newPost) {
  return new Post(newPost);
}

function getPost(postId) {
  return Post.findById(postId).exec();
}

module.exports = { getAllPost, createNewPost, getPost };
