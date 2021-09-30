const { create, getAll } = require('../repository/LaboratoriesRepository');

const createLaboratoy = exam => create(exam);
const listLabs = async () => getAll();

module.exports = {
  createLaboratoy,
  listLabs,
};
