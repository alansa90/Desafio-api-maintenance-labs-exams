const { Router } = require('express');

const { createLaboratoy, listLabs } = require('../controllers/LaboratoriesController');

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
 *        _id: sd32dsa3d0asdasc0
 *        name: Lab test
 *        address:
 *          publicPlace: Praca Floriano
 *          number: 51
 *          complement: Sala 1004
 *          cep: 20031-050
 *          neighborhood: Centro
 *          city: Rio de Janeiro
 *          state: RJ
 *        labStatus: active
 *        exams:
 *          2a1da23s2d3a2sd1dasd
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
 *      500:
 *        description: Some server error
 */
router.post('/', async (req, res) => {
  res.json(await createLaboratoy(req.body));
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
router.get('/:name', (req, res) => {
  res.json({ foo: req.params.name });
});

router.put('/:name', (req, res) => {
  const { params, body } = req;

  res.json({ ...params, body });
});

router.delete('/:id', (req, res) => {
  res.json({ ...req.params, action: 'deleted' });
});

module.exports = router;
