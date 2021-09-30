const { Router } = require('express');

const { createExam, listExams, getExam, linkingExamLab } = require('../controllers/ExamsController');

const router = Router();

/**
 * @swagger
 *  tags:
 *    name: Exam
 *    description: The exams maintenance API
 */

/**
 * @swagger
 * /exams:
 *  get:
 *   summary: Returns the list of all the exams
 *   tags: [Exam]
 *   responses:
 *    200:
 *      description: The list of all the exams
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Exam'
 */
router.get('/', async (req, res) => {
  res.json(await listExams());
});
/**
 * @swagger
 *  /exams:
 *   post:
 *    summary: Create a new exam
 *    tags: [Exam]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Exam'
 *    responses:
 *      200:
 *        description: The exam was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Exam'
 *      500:
 *        description: Some server error
 */
router.post('/', async (req, res) => {
  res.json(await createExam(req.body));
});

/**
 * @swagger
 * /exams/{name}:
 *  get:
 *    summary: Get the exam by name
 *    tags: [Exam]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: The exam name
 *    responses:
 *      200:
 *        description: The exam description by name
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Exam'
 *      404:
 *        description: The exam was not found
 *
 */
router.get('/:name', async (req, res) => {
  const exam = await getExam(req.params.name);
  if (!exam) res.sendStatus(404);
  res.json(exam);
});
/**
 * @swagger
 * /exams/{name}:
 *  put:
 *    summary: Put for link exam with laboratory by name
 *    tags: [Exam]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: The exam name
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            name: name
 *            type: string
 *            required: true
 *            description: The Laboratory name
 *    responses:
 *      200:
 *        description: The exam description by name
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Exam'
 *      404:
 *        description: The exam was not found
 */
router.put('/:name', async (req, res) => {
  const exam = await linkingExamLab(req.params.name, req.body);
  if (!exam) res.sendStatus(404);
  res.json(exam);
});

router.put('/:name', (req, res) => {
  const { params, body } = req;

  res.json({ ...params, body });
});
/**
 * @swagger
 * /exams/{name}:
 *  delete:
 *    summary: Delete the exam by name
 *    tags: [Exam]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: The exam name
 *    responses:
 *      200:
 *        description: The laboratory was successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Exam'
 *      404:
 *        description: The exam was not found
 *
 */
router.delete('/:id', (req, res) => {
  res.json({ ...req.params, action: 'deleted' });
});

/**
 * @swagger
 * components:
 *  schemas:
 *    Exam:
 *      type: object
 *      required:
 *        - name
 *        - typeExam
 *        - examStatus
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the exam
 *        name:
 *          type: string
 *          description: The name of the exam
 *        typeExam:
 *          type: string
 *          description: The type of the exam
 *        examStatus:
 *            type: string
 *            description: The status of exam
 *        labs:
 *            type: array
 *            description: The array of referencies labs
 *            items:
 *                type: string
 *                description: The reference of lab _id
 *      example:
 *        _id: 2a1da23s2d3a2sd1dasd
 *        name: Urine analysis
 *        typeExam: clinical analysis
 *        examStatus: active
 *        labs: [sd32dsa3d0asdasc0]
 */

module.exports = router;
