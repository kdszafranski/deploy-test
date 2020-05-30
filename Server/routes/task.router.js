const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool.js')

// DB CONNECTION



// GET
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks";'

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log("error making query", err);
            res.sendStatus(500);
        })
});

// POST
taskRouter.post('/', (req, res) => {
    console.log('req.body', req.body);
    let task = req.body.task;
    let date = req.body.date;
    let status = req.body.status;


    let queryText = `
    INSERT INTO "tasks" ("task", "date", "status")
    VALUES ($1, $2, $3);`

    console.log("query is", queryText);

    pool.query(queryText, [task, date, status])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('error making post request', err);
            res.sendStatus(500);
        })
});

// PUT
taskRouter.put('/complete/:id', (req, res) => {
    console.log('PUT REQUEST req.params.id:', req.params.id);
    let queryText = `UPDATE "tasks" SET "status" = 'Complete' WHERE id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('SUCCESSFUL put:', result);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('ERROR put:', err);
            res.sendStatus(500);
        })
});

taskRouter.put('/incomplete/:id', (req, res) => {
    console.log('PUT REQUEST req.params.id:', req.params.id);
    let queryText = `UPDATE "tasks" SET "status" = 'Complete' WHERE id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('SUCCESSFUL put:', result);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('ERROR put:', err);
            res.sendStatus(500);
        })
});

// DELETE

taskRouter.delete('/incomplete/:id', (req, res) => {
    console.log('DELETE REQUEST req.params.id:', req.params.id);
    let queryText = `DELETE "tasks" WHERE id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('SUCCESSFUL put:', result);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('ERROR put:', err);
            res.sendStatus(500);
        })
});

module.exports = taskRouter;