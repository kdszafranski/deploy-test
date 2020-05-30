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
    let name = req.body.name;
    let age = req.body.age;
    let gender = req.body.gender;
    let readyForTransfer = req.body.readyForTransfer;
    let notes = req.body.notes;


    let queryText = `
    INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);`

    console.log("query is", queryText);

    pool.query(queryText, [name, gender, age, readyForTransfer, notes])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('error making post request', err);
            res.sendStatus(500);
        })
});

// PUT
taskRouter.put('/:id', (req, res) => {
    console.log('PUT REQUEST req.params.id:', req.params.id);
    let queryText = `UPDATE "koalas" SET "ready_to_transfer" = 'Y' WHERE id=$1;`;
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

module.exports = koalaRouter;