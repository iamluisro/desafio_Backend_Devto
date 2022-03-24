const express = require('express');
const { getAllPost, createNewPost, getPost } = require('../../useCases/posts');
const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const allPosts = await getAllPost();

    response.json({
      success: true,
      message: 'All Post',
      data: allPosts,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: 'Error at get all posts',
      error: error.message,
    });
  }
});

router.get('/:_id', async (request, response) => {
  try {
    const postId = request.params._id;
    const post = await getPost(postId);
    if (post) {
      response.json({
        success: true,
        message: 'Post',
        data: post,
      });
    } else {
      response.status(404).end(
        response.json({
          success: true,
          message: 'Post not found',
        })
      );
    }
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: 'Error getting post',
      error: error.message,
    });
  }
});

router.post('/', async (request, response) => {
  try {
    const post = request.body;
    const resp = await createNewPost(post).save();

    response.json({
      success: true,
      message: 'New post saved',
      data: resp,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: 'Error saving new post',
      error: error.message,
    });
  }
});

module.exports = router;
