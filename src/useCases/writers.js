const Writer = require('../models/writers');
const bcrypt = require('../lib/bcrypt');
const jwt = require('../lib/jwt');
const ObjectId = require("mongoose").Types.ObjectId;

function getAllWriters() {
  return Writer.find({});
}

function getWriter(writerId) {
  return Writer.findById(writerId).exec();
}

function getWriterByUsername(writerUsername) {
  return Writer.aggregate([
    {
      $match: {
        username: writerUsername
      }
    },
    {
      $lookup: {
        from: "posts",        //must be collection name for posts
        localField: "posts",
        foreignField: "_id",
        as: "posts"
      }
    }
  ]);
  // return Writer.findOne({ username: writerUsername });
}

function createNewWriter(newWriter) {
  return new Writer(newWriter);
}
function patchById(idWriter, dataToUpdate) {
  return Writer.findByIdAndUpdate(idWriter, dataToUpdate, { new: true });
}
function deleteById(idWriter) {
  return Writer.findByIdAndDelete(idWriter);
}

async function signUp(dataWriter) {
  const {
    email,
    password,
    name,
    lastName,
    biography,
    nationality,
    dateCreated,
    username
  } = dataWriter;
  const writerFoundByEmail = await Writer.findOne({ email });
  const writerFoundByUsername = await Writer.findOne({ username });

  if (writerFoundByEmail || writerFoundByUsername) throw new Error('Writer already exists');
  const passwordEncrypted = await bcrypt.hash(password);

  return Writer.create({
    name,
    email,
    password: passwordEncrypted,
    lastName,
    biography,
    nationality,
    dateCreated,
    username
  });
}

async function login(email, password) {
  const writerFound = await Writer.findOne({ email });
  if (!writerFound) throw new Error('Invalid credentials');

  const isValidPassword = await bcrypt.compare(password, writerFound.password);
  if (!isValidPassword) throw new Error('Invalid credentials');

  // regresar
  const token = jwt.sign({
    _id: writerFound._id,
    name: writerFound.name,
    lastName: writerFound.lastName,
    role: 'writer',
  });
  return token;
}

module.exports = {
  getAllWriters,
  getWriter,
  createNewWriter,
  patchById,
  deleteById,
  signUp,
  login,
  getWriterByUsername
};
