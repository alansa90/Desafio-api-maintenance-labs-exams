const { create, getAll, getByName, linkLabExam, updateByName, deleteByName } = require('../repository/LaboratoriesRepository');

const createLaboratoy = async lab => {
  const { name, labStatus, address } = lab;
  const mapped = {};
  mapped.name = name.toLowerCase();
  mapped.address = address;
  mapped.labStatus = labStatus.toLowerCase();
  return create(mapped);
};
const listLabs = async () => getAll();
const getLab = async name => getByName(name.toLowerCase());
const linkingLabExam = async (lab, exam) => {
  const mapped = {};
  const { name } = exam;

  mapped.exam = { name: name.toLowerCase() };
  mapped.lab = lab.toLowerCase();
  linkLabExam(mapped.lab, mapped.exam);
  return getLab(mapped.lab);
};

const updateLab = async (name, lab) => {
  const { address, labStatus } = lab;
  const mapped = {};
  mapped.labStatus = labStatus.toLowerCase();
  mapped.address = address;

  return updateByName(name.toLowerCase(), mapped);
};

const deleteLab = async name => deleteByName(name.toLowerCase());

module.exports = {
  createLaboratoy,
  listLabs,
  getLab,
  linkingLabExam,
  updateLab,
  deleteLab,
};
