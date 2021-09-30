const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const labsRouter = require('./src/routes/Laboratories');
const examsRouter = require('./src/routes/Exams');

// eslint-disable-next-line import/extensions
const { PORT, APP_URL } = require('./src/bin/www');

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Management of laboratories and exams',
      version: '1.0.0',
      description: 'API for maintenane of laboratories and exams',
    },
    servers: [
      {
        url: `${APP_URL}:${PORT}`,
      },
    ],
    host: 'https://api-maintenance-lab-exam.herokuapp.com',
    basePath: '/v1',
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/labs', labsRouter);
app.use('/exams', examsRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server run in ${PORT}...`);
});
