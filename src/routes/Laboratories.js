const { Router } = require('express');

const { createLaboratoy, listLabs, getLab, linkingLabExam, updateLab, deleteLab } = require('../controllers/LaboratoriesController');

const router = Router();
/**
 * @swagger
 *  tags:
 *    name: Laboratory
 *    description: The labs maintenance API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Laboratory:
 *      type: object
 *      required:
 *        - name
 *        - address
 *        - labStatus
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the lab
 *        name:
 *          type: string
 *          description: The name of the lab
 *        address:
 *          type: object
 *          required:
 *              - publicPlace
 *              - number
 *              - cep
 *              - neighborhood
 *              - city
 *              - state
 *          properties:
 *              publicPlace:
 *                type: string
 *                description: The publicPlace of address lab
 *              number:
 *                type: string
 *                description: The number of address lab
 *              complement:
 *                type: string
 *                description: The complement of address lab
 *              cep:
 *                type: string
 *                description: The cep of address lab
 *              neighborhood:
 *                type: string
 *                description: The neighborhood of address lab
 *              city:
 *                type: string
 *                description: The city of address lab
 *              state:
 *                type: string
 *                description: The state of address lab
 *        labStatus:
 *            type: string
 *            description: The status of lab
 *        exams:
 *            type: array
 *            description: The array of referencies exams
 *            items:
 *                type: string
 *                description: The reference of exam _id
 *      example:
 *        name: Lab test
 *        address:
 *          publicPlace: Praca Floriano
 *          number: 51
 *          complement: Sala 1004
 *          cep: 20031-050
 *          neighborhood: Centro
 *          city: Rio de Janeiro
 *          state: RJ
 *        labStatus: ativo
 */

/**
 * @swagger
 * /labs:
 *  get:
 *    summary: Returns the list of all the laboratories
 *    tags: [Laboratory]
 *    responses:
 *      200:
 *        description: The list of all the laboratories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Laboratory'
 */
router.get('/', async (req, res) => {
  const labs = await listLabs();
  res.json(labs);
});
/**
 * @swagger
 *  /labs:
 *   post:
 *    summary: Create a new lab
 *    tags: [Laboratory]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Laboratory'
 *    responses:
 *      200:
 *        description: The laboratory was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Laboratory'
 *      400:
 *        description: Bad Request error
 *      500:
 *        description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const lab = await createLaboratoy(req.body);
    if (typeof lab === 'object') {
      res.json(lab);
    } else if (typeof lab === 'string' && lab.includes('error')) {
      res.status(400).json(lab);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /labs/{name}:
 *  get:
 *    summary: Get the laboratory by name
 *    tags: [Laboratory]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: The laboratory name
 *    responses:
 *      200:
 *        description: The laboratory description by name
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Laboratory'
 *      404:
 *        description: The laboratory was not found
 *
 */
router.get('/:name', async (req, res) => {
  const lab = await getLab(req.params.name);
  if (!lab) return res.status(404).json({ message: 'Not Found' });
  return res.status(200).json(lab);
});
/**
 * @swagger
 * /labs/{name}:
 *  patch:
 *    summary: This put update lab fields
 *    tags: [Laboratory]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: Enter lab name to make the link
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              address:
 *                type: object
 *                description: The lab address
 *                properties:
 *                  publicPlace:
 *                    type: string
 *                    description: The publicPlace of address lab
 *                  number:
 *                    type: string
 *                    description: The number of address lab
 *                  complement:
 *                    type: string
 *                    description: The complement of address lab
 *                  cep:
 *                    type: string
 *                    description: The cep of address lab
 *                  neighborhood:
 *                    type: string
 *                    description: The neighborhood of address lab
 *                  city:
 *                    type: string
 *                    description: The city of address lab
 *                  state:
 *                    type: string
 *                    description: The state of address lab
 *              labStatus:
 *                type: string
 *                description: The lab status
 *            required: true
 *      description: Enter data to update
 *    responses:
 *      200:
 *        description: The lab description by name
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Laboratory'
 *      404:
 *        description: The lab was not found
 */
router.patch('/:name', (req, res) => {
  const { params, body } = req;
  linkingLabExam;
  updateLab;
  res.json({ ...params, body });
});
/**
 * @swagger
 * /labs/{name}:
 *  delete:
 *    summary: Delete the lab by name
 *    tags: [Laboratory]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: The lab name
 *    responses:
 *      200:
 *        description: The laboratory was successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Laboratory'
 *      404:
 *        description: The laboratory was not found
 *
 */
router.delete('/:id', async (req, res) => {
  const lab = await deleteLab(req.params.name);
  if (!lab) return res.status(404).json({ message: 'Not Found' });
  return res.status(200).json(lab);
});

module.exports = router;
