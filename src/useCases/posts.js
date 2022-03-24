const { default: mongoose } = require("mongoose");
const Post = require("../models/posts");
const Writer = require("../models/writers")
function getAllPost() {
  return Post.find({});
}

function patchPostById(idPost, dataToUpdate) {
  return Post.findByIdAndUpdate(idPost, dataToUpdate, { new: true });
}
function deletePostById(idPost) {
  return Post.findByIdAndDelete(idPost);
}

function createNewPost(post) {
  const newPost =  new Post(post)
  Writer.findOneAndUpdate(
    { _id: post.writer },
    { $push: { posts: newPost._id } },
  ).exec();
  return newPost;
}

function getPost(postId) {
  return Post.findById(postId).exec();
}

function getPostsByUsername(postId) {
  return Post.find({id: postId});
}

module.exports = { getAllPost, createNewPost, getPost, patchPostById, getPostsByUsername };
