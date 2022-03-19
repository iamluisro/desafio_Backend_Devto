const express = require("express");

//Fata el router
const postRouter = require("./routers/posts");
const writerRouter = require("./routers/writers");

const server = express();
//middlewares
server.use(express.json())

//rourters
server.use("/posts", postRouter);
server.use("/writers", writerRouter);

module.exports = server;
