const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const rider = require("./routes/riders");
const race = require("./routes/races");
const team = require("./routes/teams");

const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

//connecting to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

//request body validation
app.use(express.json());

app.use('/api/rider', rider);
app.use('/api/race', race);
app.use('/api/team', team);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).json({ error: 'Internal Server ErrorDarlimg' });
});

module.exports = app;