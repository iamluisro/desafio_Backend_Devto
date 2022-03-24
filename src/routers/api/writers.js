const express = require('express');
const router = express.Router();
const {
  getAllWriters,
  createNewWriter,
  getWriter,
  signUp,
  login,
  getWriterByUsername
} = require('../../useCases/writers');
const { getPost } = require('../../useCases/posts')
const auth = require('../../middlewares/auth');

router.get('/', async (request, response) => {
  try {
    const allWriters = await getAllWriters();

    response.json({
      success: true,
      message: 'All Writers',
      data: allWriters,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: 'Error at get all writers',
      error: error.message,
    });
  }
});

router.post('/signup', async (request, response) => {
  try {
    const writerData = request.body;
    const writerCreated = await signUp(writerData);

    response.json({
      success: true,
      message: 'Writer created',
      data: writerCreated,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: ' could not register',
      error: error.message,
    });
  }
});

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await login(email, password);

    response.json({
      success: true,
      message: ' writer logged in',
      data: {
        token,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: ' could not register',
      error: error.message,
    });
  }
});

router.use(auth);

router.get('/:username', async (request, response) => {
  try {
    const writerId = request.params.username;
    const writer = await getWriterByUsername(writerId);
    if (writer) {
      response.json({
        success: true,
        message: 'Writer found',
        data: writer,
      });
    } else {
      response.status(404).end(
        response.json({
          success: true,
          message: 'Writer not found',
        })
      );
    }
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: 'Error getting writer',
      error: error.message,
    });
  }
});

router.get('/:username/:postId', async (request, response) => {
  try {
    const writerId = request.params.username;
    const postId = request.params.postId;
    const writer = await getWriterByUsername(writerId);
    const post = await getPost(postId)
    if (writer) {
      response.json({
        success: true,
        message: 'Post found',
        data: post,
      });
    } else {
      response.status(404).end(
        response.json({
          success: true,
          message: 'Writer not found',
        })
      );
    }
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: 'Error getting writer',
      error: error.message,
    });
  }
});

router.post('/', async (request, response) => {
  try {
    const writer = request.body;
    const resp = await createNewWriter(writer).save();

    response.json({
      success: true,
      message: 'New writer saved',
      data: resp,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: 'Error saving new writer',
      error: error.message,
    });
  }
});

module.exports = router;
