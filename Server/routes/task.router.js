const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool.js')


taskRouter.get('/', (req, res) => {

    let queryText = 'SELECT * FROM "tasks";'

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log("Error making query", err);
            res.sendStatus(500);
        })
});


taskRouter.post('/', (req, res) => {
    
    let task = req.body.task;
    let date = req.body.date;
    let status = req.body.status;


    let queryText = `
    INSERT INTO "tasks" ("task", "date", "status")
    VALUES ($1, $2, $3);`

    pool.query(queryText, [task, date, status])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error handling post request', err);
            res.sendStatus(500);
        })
});


taskRouter.put('/complete/:id', (req, res) => {
    
    let queryText = `UPDATE "tasks" SET "status" = 'Complete' WHERE id=$1;`;

    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('Successful PUT handling', result);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('PUT request handling failed', err);
            res.sendStatus(500);
        })
});

taskRouter.put('/incomplete/:id', (req, res) => {
    
    let queryText = `UPDATE "tasks" SET "status" = 'Incomplete' WHERE id=$1;`;

    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('Successful PUT request handling', result);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('PUT request handling failed.', err);
            res.sendStatus(500);
        })
});


taskRouter.delete('/:id', (req, res) => {
    
    let queryText = `DELETE FROM "tasks" WHERE id=$1;`;

    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('Successful DELETE request handling:', result);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('DELETE request handling failed', err);
            res.sendStatus(500);
        })
});

module.exports = taskRouter;