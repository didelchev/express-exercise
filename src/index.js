import express from 'express';
import mongoose from 'mongoose';


const app = express();

const port = 3000;

const dbUrl = "mongodb://localhost:27017";

mongoose
    .connect(dbUrl, {dbName: 'practice'})
    .then(() => console.log('DB connected successfully !'))
    .catch((err) => console.log(`DB Failed to connect ${err}`))


app.get('/', (req,res) => {
    res.send('Works')
})

app.listen(port, ()=> {
    console.log(`Server is listening on http://localhost:${port} ...`)
})