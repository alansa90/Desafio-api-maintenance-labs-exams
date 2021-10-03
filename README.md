# api-maintenance-of-laboratories-and-exams


## Introduction
- Api for maintenance of laboratories and exams performed.
- This api was created as a technical skills test for the back-end developer position.

## Usage

 - For local use start with `npm run start` command
 - For online access via heroku go to the link [api-maintenance-labs-exams](https://api-maintenance-lab-exam.herokuapp.com/)

## Tech
- [Node v14.13+](http://nodejs.org/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Prettier](https://www.npmjs.com/package/prettier)
- [EditorConfig](https://www.npmjs.com/package/editorconfig-tools)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)
- [Heroku](https://www.heroku.com/)

## Important informations

- The patch route is used to update the fields, the update route to make the link

- For to link a laboratory to an exam and on the contrary, it is necessary to inform the name of both and that both are previously registered.

- The api's structured in two blocks exams and laboratory, both have create, get, update, patch and delete operations.

- It's possible to link the laboratory to the exam and the other way around too.

- It's possible to list the laboratories and exams, only those with active status are returned.

- It's possible to reactivate an exam or laboratory, just use the patch route and include the new status to perform the update

- The delete option only changes the status to inactive, keeping the data in the database.
