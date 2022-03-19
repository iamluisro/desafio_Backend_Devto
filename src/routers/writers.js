const express = require('express');
const router = express.Router();
const { getAllWriters, createNewWriter, getWriter } = require('../useCases/writers');

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

router.get('/:_id', async (request, response) => {
  try {
    const writerId = request.params._id
    const writer = await getWriter(writerId)
      if (writer) {
          response.json({
            success: true,
            message: 'Writer found',
            data: writer,
          });
      } else {
        response.status(404).end(  response.json({
          success: true,
          message: 'Writer not found',
        }))
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
    const resp = await createNewWriter(writer).save()

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
