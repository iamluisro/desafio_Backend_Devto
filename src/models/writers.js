const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  nationality: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  biography: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 300,
    trim: true,
  },
  // post: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'posts',
  // },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  // _id: {
  //   type: mongoose.ObjectId,
  // },
});

const model = mongoose.model('writers', writerSchema);
module.exports = model;
