const { create, getAll, getByName, linkExamLab, updateByName, deleteByName } = require('../repository/ExamsRepository');

const createExam = async exam => {
  try {
    const { name, examStatus, typeExam } = exam;
    const mapped = {};
    mapped.name = name.toLowerCase();
    mapped.typeExam = typeExam.toLowerCase();
    mapped.examStatus = examStatus.toLowerCase();
    return create(mapped);
  } catch (err) {
    throw err.message;
  }
};
const listExams = async () => getAll();
const getExam = async name => getByName(name.toLowerCase());
const linkingExamLab = async (exam, lab) => {
  const mapped = {};
  const { name } = lab;

  mapped.lab = { name: name.toLowerCase() };
  mapped.exam = exam.toLowerCase();
  await linkExamLab(mapped.exam, mapped.lab);
  return getExam(mapped.exam);
};

const updateExam = async (param, exam) => {
  const { typeExam, examStatus } = exam;
  const mapped = {};
  mapped.typeExam = typeExam.toLowerCase();
  mapped.examStatus = examStatus.toLowerCase();

  return updateByName(param.name.toLowerCase(), mapped);
};

const deleteExam = async name => deleteByName(name.toLowerCase());

module.exports = {
  createExam,
  listExams,
  getExam,
  linkingExamLab,
  updateExam,
  deleteExam,
};
