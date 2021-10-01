const { Router } = require('express');

const { createExam, listExams, getExam, linkingExamLab, updateExam, deleteExam } = require('../controllers/ExamsController');

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
 *   summary: Returns the list of all the exams and link laboratories actives
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
 *      400:
 *        description: Bad Request error
 *      500:
 *        description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const exam = await createExam(req.body);
    if (typeof exam === 'object') {
      res.status(200).json(exam);
    } else if (typeof exam === 'string' && exam.includes('error')) {
      res.status(400).json(exam);
    }
  } catch (err) {
    res.status(500).send(err);
  }
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
  if (!exam) return res.status(404).json({ message: 'Not Found' });
  return res.status(200).json(exam);
});
/**
 * @swagger
 * /exams/{name}:
 *  put:
 *    summary: This put makes the link between exam and laboratory and the reverse too
 *    tags: [Exam]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: Enter exam name to make the link
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The Laboratory name
 *            required: true
 *      description: Enter laboratory name to make the link
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
  if (!exam) return res.status(404).json({ message: 'Not Found' });
  return res.status(200).json(exam);
});
/**
 * @swagger
 * /exams/{name}:
 *  patch:
 *    summary: This patch update exam fields
 *    tags: [Exam]
 *    parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: Enter exam name to make the link
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              typeExam:
 *                type: string
 *                description: The exam type
 *              examStatus:
 *                type: string
 *                description: The exam status
 *            required: true
 *      description: Enter data to update
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
router.patch('/:name', async (req, res) => {
  const { params, body } = req;
  const exam = await updateExam(params, body);
  if (!exam) return res.status(404).json({ message: 'Not Found' });
  return res.status(200).json(exam);
});
/**
 * @swagger
 * /exams/{name}:
 *  delete:
 *    summary: The logical delete exam by name, just update examStatusby inactive
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
 *        description: The exam was successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Exam'
 *      404:
 *        description: The exam was not found
 *
 */
router.delete('/:name', async (req, res) => {
  const exam = await deleteExam(req.params.name);
  if (!exam) return res.status(404).json({ message: 'Not Found' });
  return res.status(200).json(exam);
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
 *        name: urina
 *        typeExam: analise clinica ou imagem
 *        examStatus: ativo ou inativo
 */

module.exports = router;
