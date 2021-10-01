require('../lib/dbConnection');

const Exams = require('../models/ExamsModel');
const Laboratories = require('../models/LaboratoriesModel');

const create = async data => {
  const res = await Exams.create(data).catch(err => {
    return err.message;
  });
  return res;
};
const getAll = async () => {
  const items = await Exams.find({ examStatus: 'ativo' })
    .populate({
      path: 'labs',
      match: { labStatus: { $eq: 'ativo' } },
      select: ['name', 'labStatus'],
    })
    .exec();
  return items;
};

const getByName = async name => {
  const exam = await Exams.findOne({ name })
    .populate({
      path: 'labs',
      match: { labStatus: { $eq: 'ativo' } },
      select: ['name', 'labStatus'],
    })
    .exec();
  return exam;
};

const linkExamLab = async (exam, lab) => {
  let res;
  const laboratory = await Laboratories.findOne({ ...lab });
  if (laboratory) {
    const updated = await Exams.findOneAndUpdate({ name: exam }, { $addToSet: { labs: laboratory.id } });
    if (updated) {
      res = await Exams.findOne({ name: exam })
        .populate({
          path: 'labs',
          match: { labStatus: { $eq: 'ativo' } },
          select: ['- _id', 'name', 'labStatus'],
        })
        .exec();
      await Laboratories.updateOne({ ...lab }, { $addToSet: { exams: res.id } });
    }
  }

  return res;
};

const updateByName = async (name, exam) => {
  const res = await Exams.findOneAndUpdate({ name }, { $set: { exam } });
  return res;
};
const deleteByName = async name => {
  const res = await Exams.findOneAndUpdate({ name }, { $set: { examStatus: 'inativo' } });
  return res;
};

module.exports = {
  create,
  getAll,
  getByName,
  linkExamLab,
  updateByName,
  deleteByName,
};
