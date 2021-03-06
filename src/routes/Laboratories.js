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
  if (!lab) return res.status(404).json({ message: `The laboratory ${req.params.name} was not found!` });
  return res.status(200).json(lab);
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
      res.status(400).json({ message: lab });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /labs/{name}:
 *  put:
 *    summary: This put makes the link between laboratory and exam and and the other way around too
 *    tags: [Laboratory]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: Enter laboratory name to make the link
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The exam name
 *            required: true
 *      description: Enter exam name to make the link
 *    responses:
 *      200:
 *        description: The laboratory description by name
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Laboratory'
 *      404:
 *        description: The Laboratory was not found
 */
router.put('/:name', async (req, res) => {
  const exam = await linkingLabExam(req.params.name, req.body);
  if (!exam) return res.status(404).json({ message: `The laboratory ${req.params.name} was not found!` });
  return res.status(200).json(exam);
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
router.patch('/:name', async (req, res) => {
  const { params, body } = req;
  const lab = await updateLab(params, body);
  if (!lab) return res.status(404).json({ message: `The laboratory ${params.name} was not found!` });
  return res.status(200).json(lab);
});

/**
 * @swagger
 * /labs/{name}:
 *  delete:
 *    summary: The logical delete lab by name, just update labStatus by inactive
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
router.delete('/:name', async (req, res) => {
  const lab = await deleteLab(req.params.name);
  if (!lab) return res.status(404).json({ message: `The laboratory ${req.params.name} was not found!` });
  return res.status(200).json(lab);
});

module.exports = router;

/**
 * @swagger
 * components:
 *  responses:
 *   UnauthorizedError:
 *    description: Authentication information is missing or invalid
 *    headers:
 *      WWW_Authenticate:
 *        schema:
 *          type: string
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
 *        name: test
 *        address:
 *          publicPlace: Praca teste
 *          number: '51'
 *          complement: Sala 1004
 *          cep: 20031-050
 *          neighborhood: Centro
 *          city: Rio de Janeiro
 *          state: RJ
 *        labStatus: ativo
 */
