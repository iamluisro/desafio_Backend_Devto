const Writer = require("../models/writers");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

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
  const { email, password, name, lastName, biography, nationality } =
    dataWriter;
  const writerFound = await Writer.findOne({ email });

  if (writerFound) throw new Error("Writer already exists");
  const passwordEncrypted = await bcrypt.hash(password);

  return Writer.create({
    name,
    email,
    password: passwordEncrypted,
    lastName,
    biography,
    nationality,
  });
}

async function login(email, password) {
  const writerFound = await Writer.findOne({ email });
  if (!writerFound) throw new Error("Invalid credentials");

  const isValidPassword = await bcrypt.compare(password, writerFound.password);
  if (!isValidPassword) throw new Error("Invalid credentials");

  // regresar
  return jwt.sign({ id: writerFound._id });
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
