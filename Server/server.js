// importing modules
const express = require('./node_modules/express');
const app = express();
const bodyParser = require('./node_modules/body-parser');
const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/task.router.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// diverting traffic to taskRouter as defined above
app.use('/tasks', taskRouter)

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
