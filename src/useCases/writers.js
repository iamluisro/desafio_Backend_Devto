const Writer = require("../models/writers");

function getAllWriters() {
  return Writer.find({});
}

function getWriter(writerId) {
  return Writer.findById(writerId).exec();
}

function createNewWriter(newWriter) {
  return new Writer(newWriter);
}

module.exports = { getAllWriters, createNewWriter, getWriter };
