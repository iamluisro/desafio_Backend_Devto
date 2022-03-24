const { default: mongoose } = require("mongoose");
const Post = require("../models/posts");

function getAllPost() {
  return Post.find({});
}

function patchPostById(idPost, dataToUpdate) {
  return Post.findByIdAndUpdate(idPost, dataToUpdate, { new: true });
}
function deletePostById(idPost) {
  return Post.findByIdAndDelete(idPost);
}

function createNewPost(newPost) {
  return new Post(newPost);
}

function getPost(postId) {
  return Post.findById(postId).exec();
}

module.exports = { getAllPost, createNewPost, getPost, patchPostById };
