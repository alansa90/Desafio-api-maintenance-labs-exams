const { create, getAll, getByName, linkExamLab } = require('../repository/ExamsRepository');

const createExam = exam => create(exam);
const listExams = async () => getAll();
const getExam = async param => getByName(param);
const linkingExamLab = async (exam, lab) => linkExamLab(exam, lab);

module.exports = {
  createExam,
  listExams,
  getExam,
  linkingExamLab,
};
