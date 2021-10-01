require('../lib/dbConnection');

const Exams = require('../models/ExamsModel');
const Laboratories = require('../models/LaboratoriesModel');

const create = async data => {
  const res = await Laboratories.create(data).catch(err => {
    return err.message;
  });
  return res;
};

const getAll = async () => {
  const items = await Laboratories.find({ labStatus: 'ativo' })
    .populate({
      path: 'exams',
      match: { examStatus: { $eq: 'ativo' } },
      select: ['name', 'examStatus'],
    })
    .exec();
  return items;
};

const getByName = async name => {
  const lab = await Laboratories.findOne({ name })
    .populate({
      path: 'exams',
      match: { examStatus: { $eq: 'ativo' } },
      select: ['name', 'examStatus'],
    })
    .exec();
  return lab;
};

const linkExamLab = async (lab, exam) => {
  let res;
  const exams = await Exams.findOne({ ...exam });
  const updated = await Laboratories.findOneAndUpdate({ name: lab }, { $addToSet: { exams: exams.id } });
  if (updated) {
    res = await Laboratories.findOne({ name: lab })
      .populate({
        path: 'exams',
        match: { examStatus: { $eq: 'ativo' } },
        select: ['name', 'examStatus'],
      })
      .exec();
    await Exams.updateOne({ exam }, { $addToSet: { lab: res.id } });
  }

  return res;
};

const updateByName = async (name, lab) => {
  const res = await Laboratories.findByIdAndUpdate({ name }, { ...lab });
  return res;
};
const deleteByName = async name => {
  const res = await Laboratories.findByIdAndUpdate({ name }, { $set: { examStatus: 'inativo' } });
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
