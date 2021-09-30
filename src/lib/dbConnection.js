const mongoose = require('mongoose');

// eslint-disable-next-line import/extensions
const { MONGOURI } = require('../bin/www');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};

mongoose.connection.on('open', () => {});

// eslint-disable-next-line no-console
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports = mongoose.connect(MONGOURI, options);
