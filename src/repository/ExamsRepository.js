require('../lib/dbConnection');

const Exams = require('../models/ExamsModel');
const Laboratories = require('../models/LaboratoriesModel');

const create = async data => {
  try {
    const exam = await Exams.create(data);
    return exam;
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async () => {
  const items = await Exams.find({ examStatus: 'active' }).populate('labs').exec();
  return items;
};

const getByName = async name => {
  const exam = await Exams.findOne({ name }).populate('labs').exec();
  return exam;
};

const linkExamLab = async (exam, lab) => {
  let res;
  const laboratory = await Laboratories.findOne({ lab });
  const updated = await Exams.findOneAndUpdate({ name: exam }, { $addToSet: { labs: laboratory.id } });
  if (updated) {
    res = await Exams.findOne({ name: exam });
    await Laboratories.updateOne({ lab }, { $addToSet: { exams: res.id } });
  }

  return res;
};

module.exports = {
  create,
  getAll,
  getByName,
  linkExamLab,
};
