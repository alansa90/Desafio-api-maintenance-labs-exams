require('../lib/dbConnection');

const Laboratories = require('../models/LaboratoriesModel');

const create = async data => {
  try {
    const lab = await Laboratories.create(data);
    return lab;
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async () => {
  const items = await Laboratories.find({ labStatus: 'active' }).populate('exams').exec();
  return items;
};

module.exports = {
  create,
  getAll,
};
