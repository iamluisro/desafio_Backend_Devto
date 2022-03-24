const Writer = require('../models/writers');
const bcrypt = require('../lib/bcrypt');
const jwt = require('../lib/jwt');

function getAllWriters() {
  return Writer.find({});
}

function getWriter(writerId) {
  return Writer.findById(writerId).exec();
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
  } = dataWriter;
  console.log(
    '🚀 ~ file: writers.js ~ line 26 ~ signUp ~ dataWriter',
    dataWriter
  );
  const writerFound = await Writer.findOne({ email });
  console.log(
    '🚀 ~ file: writers.js ~ line 28 ~ signUp ~ writerFound',
    writerFound
  );

  if (writerFound) throw new Error('Writer already exists');
  const passwordEncrypted = await bcrypt.hash(password);

  return Writer.create({
    name,
    email,
    password: passwordEncrypted,
    lastName,
    biography,
    nationality,
    dateCreated,
  });
}

async function login(email, password) {
  const writerFound = await Writer.findOne({ email });
  // console.log("🚀 ~ file: writers.js ~ line 46 ~ login ~ writerFound", writerFound)
  if (!writerFound) throw new Error('Invalid credentials');

  const isValidPassword = await bcrypt.compare(password, writerFound.password);
  // console.log("🚀 ~ file: writers.js ~ line 50 ~ login ~ isValidPassword", isValidPassword)
  if (!isValidPassword) throw new Error('Invalid credentials');

  // regresar
  const token = jwt.sign({
    _id: '623c06c614612c5ebdc7ad1f',
    name: 'Luis Fco',
    lastName: 'Rodriguez',
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
};
