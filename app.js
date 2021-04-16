require("dotenv").config;
let express = require('express');
let app = express();
let sequelize = require('./db');

let lesson = require('./controllers/lesson-controller');
let user = require('./controllers/user-controller');


sequelize.sync();
// sequelize.sync({force: true});

app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/user', user);
app.use("/lesson", lesson);


app.listen(3000, function(){

    console.log(`App is listening on port 3000`);
});