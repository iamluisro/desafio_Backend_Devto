const express = require("express");

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allPosts = await useCasesPost.getAllPost();

    response.json({
      success: true,
      message: "All Post",
      data: {
        koders: allPosts,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Error at get all posts",
      error: error.message,
    });
  }
});

module.exports = router;
