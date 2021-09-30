const mongoose = require('mongoose');

const TYPES = ['clinical analysis', 'diagnostic imaging'];
const STAT = ['active', 'inactive'];

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

Exams.createIndexes();

module.exports = Exams;
