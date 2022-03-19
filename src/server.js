const express = require("express");
const cors = require('cors');

//Fata el router
const postRouter = require("./routers/api/posts");
const writerRouter = require("./routers/api/writers");


const server = express();
//middlewares
server.use(cors())
server.use(express.json())

//rourters
server.use("/api/posts", postRouter);
server.use("/api/writers", writerRouter);

module.exports = server;
