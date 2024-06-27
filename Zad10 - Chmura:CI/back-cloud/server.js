const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');
const routes = require('./routes');
const sequelize = require('./database');

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync().then(() => console.log('Database is ready'))

app.use(routes);

app.listen(3003, () => {
    console.log('server is running');
})
