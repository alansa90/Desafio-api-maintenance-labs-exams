const mongoose = require('mongoose');

const STAT = ['active', 'inactive'];

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    publicPlace: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String },
    cep: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  labStatus: {
    type: String,
    enum: STAT,
    required: true,
  },
  exams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exams',
    },
  ],
});

const Laboratories = mongoose.model('laboratories', schema, 'Laboratories');

Laboratories.createIndexes();

module.exports = Laboratories;
