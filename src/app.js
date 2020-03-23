const express = require('express');
const corsConfig = require("./cors");
require('./db/mongoose');
const registerRoute = require('./routes/users/RegisterRoute');
const loginRoute = require('./routes/users/LoginRoute');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", corsConfig.origins);
    res.header("Access-Control-Allow-Headers", corsConfig.headers);
    if (req.method === "OPTIONS") {
        //preflight request
        res.header("Access-Control-Allow-Methods", corsConfig.methods);
        return res.status(200).json({});
    }
    next();
});

app.use(registerRoute);
app.use(loginRoute);

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
});