const mongoose = require('mongoose');

const TYPES = ['analise clinica', 'imagem'];
const STAT = ['ativo', 'inativo'];

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  typeExam: {
    type: String,
    enum: TYPES,
    required: true,
  },
  examStatus: {
    type: String,
    enum: STAT,
    required: true,
  },
  labs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'laboratories',
    },
  ],
});

const Exams = mongoose.model('exams', schema, 'Exams');

module.exports = Exams;
