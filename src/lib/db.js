const mongoose = require("mongoose");

const DB_USER = "db_user_devto";
const DB_PASSWORD = "pj9V1L0Li10wxtEm";
const DB_HOST = "cluster0.cjrff.mongodb.net";
const DB_NAME = "devto";
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

function connect() {
  return mongoose.connect(URL); // regresa una promesa
}

module.exports = connect;
